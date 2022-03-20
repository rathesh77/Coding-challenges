function SQLEngine(database) {

  this.execute = function (query) {
    query = query.replace('from', 'FROM')
    query = query.replace('select', 'SELECT')
    query = query.replace(/join/g, 'JOIN')
    query = query.replace(/on/g, 'ON')
    query = query.replace('where', 'WHERE')

    query = query.replace(/\n/g, '')
    query = query.replace(/ {2,}/g, ' ')

    const parts = query.split(/SELECT|FROM|WHERE/)

    let select = this.parseSelect(parts[1])
    let from = this.parseFrom(parts[2])
    let where = parts[3]

    const firstTable = from.shift().table

    let resultSet = this.transformPropertiesOfTable(firstTable)

    // ------------ FROM TABLES
    for (let i = 0; i < from.length; i++) {
      const entry = from[i]
      if (entry.type == 'join') {
        resultSet = this.filterJoinType(resultSet, this.transformPropertiesOfTable(entry.table), entry.condition)
      } else if (entry.type == 'simple') {
        resultSet = this.cartesianProduct(resultSet, entry.table)
      }
    }

    if (where != null) {
      // ------------ WHERE CONDITION
      where = this.parseWhere(where)
      let updatedSet = []
      for (let i = 0; i < resultSet.length; i++) {
        const eval = this.evalWhere(where, resultSet[i])
        if (eval == true) {
          updatedSet.push(resultSet[i])
        }
      }
      resultSet = updatedSet
    }

    // ------------ SELECT COLUMNS
    resultSet.map(el => {
      Object.keys(el).forEach(key => {
        if (select.indexOf(key) == -1) {
          delete el[key]
        }
      })
    })

    return resultSet
  }

  this.cartesianProduct = function (resultSet, tablename) {
    const updatedSet = []
    const dest = this.transformPropertiesOfTable(tablename)
    for (let i = 0; i < resultSet.length; i++) {
      const left = resultSet[i]
      for (let j = 0; j < dest.length; j++) {
        const right = dest[j]
        updatedSet.push({ ...left, ...right })
      }
    }
    return updatedSet
  }

  this.transformPropertiesOfTable = function (tablename) {
    return database[tablename].map((el) => {
      let keys = Object.keys(el)
      let newObj = {}
      keys.forEach(k => {
        newObj[`${tablename}.${k}`] = el[k]
      })
      return newObj
    })
  }

  this.filterJoinType = function (resultSet, destTable, condition) {
    let updatedSet = []
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
    if (leftIsColumnId.length == 2 && !left.includes(' ')) {
      left = row[left]
    }
    if (rightIsColumnId.length == 2 && !right.includes(' ')) {
      right = row[right]
    }
    return this.comparison(left, operator, right)

  }

  this.evalCondition = function (condition, sourceRow, destRow) {
    let { left, operator, right } = condition
    const leftIsColumnId = left.split('.')
    const rightIsColumnId = right.split('.')

    if (leftIsColumnId.length == 2) {
      const temp = left
      left = sourceRow[left]
      if (left == null)
        left = destRow[temp]
    }
    if (rightIsColumnId.length == 2) {
      const temp = right
      right = destRow[right]
      if (right == null)
        right = sourceRow[temp]
    }
    return this.comparison(left, operator, right)
  }

  this.comparison = function (left, operator, right) {
    if (typeof left == 'string')
      left = left.toLowerCase().replace(/\'/g, '')
    if (typeof right == 'string')
      right = right.toLowerCase().replace(/\'/g, '')
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
    const joins = []
    tables = tables.split(',')
    for (let part of tables) {
      part = part.trim()
      if (!part.includes('JOIN')) {
        joins.push({ type: 'simple', table: part })
        continue
      }
      const firstTable = part.substr(0, part.indexOf(' '))
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
    const regex = /([a-zA-Z\._]+) (\<\>|\>\=|\<\=|\=|\<|\>) \'{0,1}(.+)\'{0,1}/
    const groups = statement.match(regex)
    const condition = {
      'left': groups[1],
      'operator': groups[2],
      'right': groups[3]
    }
    return condition
  }
}

module.exports = SQLEngine