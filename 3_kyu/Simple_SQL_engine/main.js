const database = require('./database')
function SQLEngine(database) {
  this.keywords = [
    'SELECT',
    'FROM',
    'WHERE',
  ];
  this.execute = function (query) {

    let columns = []
    let tables = []
    let joins = []
    let egalities = []

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
    
    tree['WHERE'] = this.parseWhere(tree['WHERE'])
    console.log(tree)
    let resultSet = database[tree['FROM'].shift().table]
    

    return resultSet
  }
  this.parseSelect = function (fields) {
    return fields.split(',').map(el => el.trim())
  }
  this.parseFrom = function (tables) {
    let joins = []
    tables = tables.split(',')
    for (let part of tables) {
      if (!part.includes('JOIN')) {
        joins.push(part)
        continue
      }
      let firstTable  = part.substr(0, part.indexOf(' '))
      joins.push({type:'simple', table: firstTable})     
      part = part.substr(firstTable.length+1)

      while (part != '') {
        const regex = /JOIN ([a-zA-Z\._]+) ON ([a-zA-Z\._]+ \= [a-zA-Z\._-]+)/
        const groups = part.match(regex)
        part = part.substr(groups[0].length+1)
        joins.push({'type': 'join', 'table':groups[1], 'condition': groups[2]})
      }      
    }
    return joins
  }
  this.parseWhere = function(statement) {
    const regex = /([a-zA-Z\._]+) (\<\>|\>\=|\<\=|\=|\<|\>) \'{0,1}([a-zA-Z\._0-9 ]+)\'{0,1}/
    const groups = statement.match(regex)
    const where = {
      'column': groups[1],
      'operator': groups[2],
      'value': groups[3]
    }
    return where
  }
}

const request = `SELECT movie.name, actor.name FROM movie JOIN actor_to_movie ON actor_to_movie.movieID = movie.id JOIN actor ON actor_to_movie.actorID = actor.id WHERE actor.name <> 'Daniel Craig'`
const engine = new SQLEngine(database)
console.log(engine.execute(request))