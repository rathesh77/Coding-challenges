const database = require('./database')
function SQLEngine(database) {
  this.keywords = [
    'SELECT',
    'FROM',
    'WHERE',
  ];
  this.execute = function (query) {

    let tree = {
      'SELECT': null,
      'FROM': null,
      'WHERE': null
    }
    console.log(query)
    let offset = 0
    for (let i = 0; i < this.keywords.length; i++) {
      const feature = this.keywords[i]
      const next = this.keywords[i + 1]
      offset += feature.length + 1
      let j = 0

      if (!query.includes(next)) {
        tree[feature] = query.substr(offset).trim()
        break
      }
      while (!query.substr(offset, j).includes(next)) {
        j++
      }
      tree[feature] = query.substr(offset, j - next.length).trim()
      offset += j - next.length
    }

    tree['SELECT'] = this.parseSelect(tree['SELECT'])
    tree['FROM'] = this.parseFrom(tree['FROM'])
    if (tree['WHERE'] != null)
      tree['WHERE'] = this.parseWhere(tree['WHERE'])

    console.log(tree)

    const firstTable = tree['FROM'].shift().table
    console.log(firstTable)

    let resultSet = this.transformPropertiesOfTable(database[firstTable], firstTable)

    // ------------ FROM TABLES
    let from = tree['FROM']
    for (let i = 0; i < from.length; i++) {
      const entry = from[i]
      if (entry.type == 'join') {
        resultSet = this.filterJoinType(resultSet, this.transformPropertiesOfTable(database[entry.table], entry.table), entry.condition)
      } else if (entry.type == 'simple') {
        resultSet = this.cartesianProduct(resultSet, entry.table)
      }
    }

    if (tree['WHERE'] != null) {
      // ------------ WHERE CONDITION
      let updatedSet = []
      for (let i = 0; i < resultSet.length; i++) {
        const eval = this.evalWhere(tree['WHERE'], resultSet[i])
        if (eval == true) {
          updatedSet.push(resultSet[i])
        }
      }
      resultSet = updatedSet
    }
    // ------------ SELECT COLUMNS
    resultSet.map(el => {
      Object.keys(el).forEach(key => {
        if (tree['SELECT'].indexOf(key) == -1) {
          delete el[key]
        }
      })
    })
    return resultSet
  }

  this.cartesianProduct = function (resultSet, tablename) {
    let out = []
    const dest = database[tablename]
    for (let i = 0; i < resultSet.length; i++) {
      const left = resultSet[i]
      for (let j = 0; j < dest.length; j++) {
        const right = dest[i]
        dest.push({ ...left, ...right })
      }
    }
    return out
  }
  this.transformPropertiesOfTable = function (obj, table) {
    console.log(obj)
    return obj.map((el) => {
      let keys = Object.keys(el)
      let newObj = {}
      keys.forEach(k => {
        newObj[`${table}.${k}`] = el[k]
      })
      return newObj
    })
  }
  this.filterJoinType = function (resultSet, destTable, condition) {
    let updatedSet = []
    console.log(condition)
    for (let i = 0; i < resultSet.length; i++) {
      const leftRow = resultSet[i]
      for (let j = 0; j < destTable.length; j++) {
        const rightRow = destTable[j]
        const eval = this.evalCondition(condition, leftRow, rightRow)
        if (eval == true) {
          updatedSet.push({ ...leftRow, ...rightRow })
        }
      }
    }
    return updatedSet
  }

  this.evalWhere = function (condition, row) {
    let { left, operator, right } = condition
    let leftIsColumnId = left.split('.')
    let rightIsColumnId = right.split('.')
    if (leftIsColumnId.length == 2) {
      left = row[left]
    }
    if (rightIsColumnId.length == 2) {
      right = row[right]
    }
    return this.comparison(left, operator, right)

  }

  this.evalCondition = function (condition, sourceRow, destRow) {
    let { left, operator, right } = condition
    let leftIsColumnId = left.split('.')
    let rightIsColumnId = right.split('.')


    if (leftIsColumnId.length == 2) {
      const temp = left
      left = sourceRow[left]
      if (left == null)
        left = destRow[temp]
    }
    if (rightIsColumnId.length == 2) {
      const temp = right

      right = destRow[right]
      if (right== null)
        right = sourceRow[temp]
    }

   // console.log(left, right, sourceRow, destRow)

    return this.comparison(left, operator, right)
  }

  this.comparison = function (left, operator, right) {
    if (operator == '=') {
      return left == right
    }
    if (operator == '>') {
      return left > right
    }
    if (operator == '<') {
      return left < right
    }
    if (operator == '<=') {
      return left <= right
    }
    if (operator == '>=') {
      return left >= right
    }
    if (operator == '<>') {
      return left != right
    }
  }
  this.parseSelect = function (fields) {
    return fields.split(',').map(el => el.trim())
  }
  this.parseFrom = function (tables) {
    let joins = []
    tables = tables.split(',')
    for (let part of tables) {
      if (!part.includes('JOIN')) {
        joins.push({ type: 'simple', table: part })
        continue
      }
      let firstTable = part.substr(0, part.indexOf(' '))
      joins.push({ type: 'simple', table: firstTable })
      part = part.substr(firstTable.length + 1)

      while (part != '') {
        const regex = /JOIN ([a-zA-Z\._]+) ON ([a-zA-Z\._]+ \= [a-zA-Z\._-]+)/
        const groups = part.match(regex)
        part = part.substr(groups[0].length + 1)
        joins.push({ 'type': 'join', 'table': groups[1], 'condition': this.parseCondition(groups[2]) })
      }
    }
    return joins
  }
  this.parseWhere = function (statement) {
    return this.parseCondition(statement)
  }
  this.parseCondition = function (statement) {
    const regex = /([a-zA-Z\._]+) (\<\>|\>\=|\<\=|\=|\<|\>) \'{0,1}([a-zA-Z\._0-9 ]+)\'{0,1}/
    const groups = statement.match(regex)
    const condition = {
      'left': groups[1],
      'operator': groups[2],
      'right': groups[3]
    }
    return condition
  }
}

//const request = `SELECT movie.name, actor.name FROM movie JOIN actor_to_movie ON actor_to_movie.movieID = movie.id JOIN actor ON actor_to_movie.actorID = actor.id WHERE actor.name <> 'Daniel Craig'`
//const request = `SELECT movie.name FROM movie`
//const request = `SELECT movie.name, director.name FROM movie JOIN director ON director.id = movie.directorID`
const request = `select director.name from movie join actor_to_movie ON actor_to_movie.movieID = movie.id JOIN director on director.id = movie.directorID join actor on actor.id = actor_to_movie.actorID where movie.year <> 1994`
const engine = new SQLEngine(database)
console.log(engine.execute(request))