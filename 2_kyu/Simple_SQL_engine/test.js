const expect = require('chai').expect
const SQLEngine = require('./main')
const movieDatabase = {
  movie: [{ id:1, title:'The A-Team', year: 2010, directorID: 1 }, 
      { id:2, title:'Avatar', year: 2009, directorID: 2 }, 
      { id:3, title:'Titanic', year: 1997, directorID: 2 }, 
      { id:4, title:'The Avengers', year: 2012, directorID: 3 }, 
      { id:5, title:'Iron Man 3', year: 2013, directorID: 4 }, 
      { id:6, title:'Iron Man', year: 2008, directorID: 5 }, 
      { id:7, title:'The Lord of the Rings: The Return of the King', year: 2003, directorID: 6 }, 
      { id:8, title:'The Lord of the Rings: The Fellowship of the Ring', year: 2001, directorID: 6 }, 
      { id:9, title:'The Lord of the Rings: The Two Towers', year: 2002, directorID: 6 }, 
      { id:10, title:'Skyfall', year: 2012, directorID: 7 }, 
      { id:11, title:'The Dark Knight Rises', year: 2012, directorID: 8 }, 
      { id:12, title:'The Dark Knight', year: 2008, directorID: 8 }, 
      { id:13, title:'Pirates of the Caribbean: Dead Man\'s Chest', year: 2006, directorID: 9 }, 
      { id:14, title:'Toy Story 3', year: 2010, directorID: 10 }, 
      { id:15, title:'E.T. the Extra-Terrestrial', year: 1982, directorID: 11 }, 
      { id:16, title:'Toy Story', year: 1995, directorID: 12 }, 
      { id:17, title:'Pirates of the Caribbean: On Stranger Tides', year: 2011, directorID: 13 }, 
      { id:18, title:'Jurassic Park', year: 1993, directorID: 11 }],
  director: [{ id: 1, name: "Joe Carnahan" },  
        { id: 2, name: "James Cameron" },  
        { id: 3, name: "Joss Whedon" },  
        { id: 4, name: "Shane Black" },  
        { id: 5, name: "Jon Favreau" },  
        { id: 6, name: "Peter Jackson" },  
        { id: 7, name: "Sam Mendes" },  
        { id: 8, name: "Christopher Nolan" },  
        { id: 9, name: "Gore Verbinski" },  
        { id: 10, name: "Lee Unkrich" },  
        { id: 11, name: "Steven Spielberg" },  
        { id: 12, name: "John Lasseter" },  
        { id: 13, name: "Rob Marshall" }],
  actor: [{ id: 1, name: "Liam Neeson" },  
      { id: 2, name: "Bradley Cooper" },  
      { id: 3, name: "Jessica Biel" },  
      { id: 4, name: "Quinton 'Rampage' Jackson" },  
      { id: 5, name: "Sam Worthington" },  
      { id: 6, name: "Zoe Saldana" },  
      { id: 7, name: "Sigourney Weaver" },  
      { id: 8, name: "Stephen Lang" },  
      { id: 9, name: "Leonardo DiCaprio" },  
      { id: 10, name: "Kate Winslet" },  
      { id: 11, name: "Billy Zane" },  
      { id: 12, name: "Kathy Bates" },  
      { id: 13, name: "Robert Downey Jr." },  
      { id: 14, name: "Chris Evans" },  
      { id: 15, name: "Mark Ruffalo" },  
      { id: 16, name: "Chris Hemsworth" },  
      { id: 17, name: "Gwyneth Paltrow" },  
      { id: 18, name: "Don Cheadle" },  
      { id: 19, name: "Guy Pearce" },  
      { id: 20, name: "Terrence Howard" },  
      { id: 21, name: "Jeff Bridges" },  
      { id: 22, name: "Noel Appleby" },  
      { id: 23, name: "Alexandra Astin" },  
      { id: 24, name: "Sean Astin" },  
      { id: 25, name: "David Aston" },  
      { id: 26, name: "Alan Howard" },  
      { id: 27, name: "Elijah Wood" },  
      { id: 28, name: "Bruce Allpress" },  
      { id: 29, name: "John Bach" },  
      { id: 30, name: "Sala Baker" },  
      { id: 31, name: "Daniel Craig" },  
      { id: 32, name: "Judi Dench" },  
      { id: 33, name: "Javier Bardem" },  
      { id: 34, name: "Ralph Fiennes" },  
      { id: 35, name: "Christian Bale" },  
      { id: 36, name: "Gary Oldman" },  
      { id: 37, name: "Tom Hardy" },  
      { id: 38, name: "Joseph Gordon-Levitt" },  
      { id: 39, name: "Heath Ledger" },  
      { id: 40, name: "Aaron Eckhart" },  
      { id: 41, name: "Michael Caine" },  
      { id: 42, name: "Johnny Depp" },  
      { id: 43, name: "Orlando Bloom" },  
      { id: 44, name: "Keira Knightley" },  
      { id: 45, name: "Jack Davenport" },  
      { id: 46, name: "Tom Hanks" },  
      { id: 47, name: "Tim Allen" },  
      { id: 48, name: "Joan Cusack" },  
      { id: 49, name: "Ned Beatty" },  
      { id: 50, name: "Dee Wallace" },  
      { id: 51, name: "Henry Thomas" },  
      { id: 52, name: "Peter Coyote" },  
      { id: 53, name: "Robert MacNaughton" },  
      { id: 54, name: "Don Rickles" },  
      { id: 55, name: "Jim letney" },  
      { id: 56, name: "Penélope Cruz" },  
      { id: 57, name: "Geoffrey Rush" },  
      { id: 58, name: "Ian McShane" },  
      { id: 59, name: "Sam Neill" },  
      { id: 60, name: "Laura Dern" },  
      { id: 61, name: "Jeff Goldblum" },  
      { id: 62, name: "Richard Attenborough" }],
  actor_to_movie: [{ actorID: 1, movieID: 1 }, 
          { actorID: 2, movieID: 1 }, 
          { actorID: 3, movieID: 1 }, 
          { actorID: 4, movieID: 1 }, 
          { actorID: 5, movieID: 2 }, 
          { actorID: 6, movieID: 2 }, 
          { actorID: 7, movieID: 2 }, 
          { actorID: 8, movieID: 2 }, 
          { actorID: 9, movieID: 3 }, 
          { actorID: 10, movieID: 3 }, 
          { actorID: 11, movieID: 3 }, 
          { actorID: 12, movieID: 3 }, 
          { actorID: 13, movieID: 4 }, 
          { actorID: 13, movieID: 5 }, 
          { actorID: 13, movieID: 6 }, 
          { actorID: 14, movieID: 4 }, 
          { actorID: 15, movieID: 4 }, 
          { actorID: 16, movieID: 4 }, 
          { actorID: 17, movieID: 5 }, 
          { actorID: 17, movieID: 6 }, 
          { actorID: 18, movieID: 5 }, 
          { actorID: 19, movieID: 5 }, 
          { actorID: 20, movieID: 6 }, 
          { actorID: 21, movieID: 6 }, 
          { actorID: 22, movieID: 7 }, 
          { actorID: 22, movieID: 8 }, 
          { actorID: 23, movieID: 7 }, 
          { actorID: 24, movieID: 7 }, 
          { actorID: 24, movieID: 8 }, 
          { actorID: 24, movieID: 9 }, 
          { actorID: 25, movieID: 7 }, 
          { actorID: 26, movieID: 8 }, 
          { actorID: 27, movieID: 8 }, 
          { actorID: 28, movieID: 9 }, 
          { actorID: 29, movieID: 9 }, 
          { actorID: 30, movieID: 9 }, 
          { actorID: 31, movieID: 10 }, 
          { actorID: 32, movieID: 10 }, 
          { actorID: 33, movieID: 10 }, 
          { actorID: 34, movieID: 10 }, 
          { actorID: 35, movieID: 11 }, 
          { actorID: 35, movieID: 12 }, 
          { actorID: 36, movieID: 11 }, 
          { actorID: 37, movieID: 11 }, 
          { actorID: 38, movieID: 11 }, 
          { actorID: 39, movieID: 12 }, 
          { actorID: 40, movieID: 12 }, 
          { actorID: 41, movieID: 12 }, 
          { actorID: 42, movieID: 13 }, 
          { actorID: 42, movieID: 17 }, 
          { actorID: 43, movieID: 13 }, 
          { actorID: 44, movieID: 13 }, 
          { actorID: 45, movieID: 13 }, 
          { actorID: 46, movieID: 14 }, 
          { actorID: 46, movieID: 16 }, 
          { actorID: 47, movieID: 14 }, 
          { actorID: 47, movieID: 16 }, 
          { actorID: 48, movieID: 14 }, 
          { actorID: 49, movieID: 14 }, 
          { actorID: 50, movieID: 15 }, 
          { actorID: 51, movieID: 15 }, 
          { actorID: 52, movieID: 15 }, 
          { actorID: 53, movieID: 15 }, 
          { actorID: 54, movieID: 16 }, 
          { actorID: 55, movieID: 16 }, 
          { actorID: 56, movieID: 17 }, 
          { actorID: 57, movieID: 17 }, 
          { actorID: 58, movieID: 17 }, 
          { actorID: 59, movieID: 18 }, 
          { actorID: 60, movieID: 18 }, 
          { actorID: 61, movieID: 18 }, 
          { actorID: 62, movieID: 18 }]
};

//added by docgunthrop for random testing (2017.05.26)
//wrapper function for author's solution
const funk = (function(database){
  function parse(query){
    let tokens = query.match(/((?:'(?:''|[^'])*')|[^\s,]+)/ig),
        exp = {
          select: [],
          from: [],
          where: null
        },
        current;
   
    function take(){return tokens.shift()}
    
    function accept(rx){
      if(current = new RegExp('^'+rx+'$','i').exec(tokens[0])){
        return take();}}
    
    function have(rx){return new RegExp('^'+rx+'$','i').test(tokens[0]);}
    
    function select(){
      accept('select');
      while(!have('from')){
        exp.select.push(columnId());
      }
    }
    
    function from(){
      accept('from');
      exp.from.push({ table: take() });
      join();
    }
    
    function join(){
      if(accept('join')){
        let j = { table: take() };
        take();
        j.on = valueTest();
        exp.from.push(j);
        join();
      }
    }
    
    function where(){
      if(accept('where')){
        exp.where = valueTest();}}
    
    function valueTest(){
      return {
        left: columnId() || constExp(),
        operator: take().replace('<>','!=').replace(/^=$/,'=='),
        right: columnId() || constExp()
      }
    }
    
    function columnId(){
      if(accept('(\\w+)\\.(\\w+)')){
        let table = current[1], column = current[2];
        return {
          table: table,
          column: column,
          getValue: function(row){ return row[table][column]; } 
        };
      }
    }
    
    function constExp(){
      let value;
      if(accept('\\d+')){
        value = +current[0];
      } else if (accept('\'(.*)\'')){
        value = current[1].replace(/''/g,"'");
      }
      return { getValue: function(){ return value; } };
    }
    
    select();
    from();
    where();
   
    return exp;
  }
  
  function execute(queryExpression){
    let tables = queryExpression.from.reduce(function(m, t){
                    if(t.on) {
                      m.joined.push(t);
                      if(t.on.right.table != t.table){
                        let temp = t.on.left;
                        t.on.left = t.on.right;
                        t.on.right = temp;
                      }
                    }
                    else { m.driver = t; }
                    return m;
                  }, { joined: [] });
                  
    tables.joined.sort(function(a,b){
      if(a.on.left.table == tables.driver.table || b.on.left.table == a.table) {
        return -1;
      } 
      return 1;
    });   
    
    let rows = database[tables.driver.table].map(function(r){
      let row = {};
      row[tables.driver.table] = r;
      return row;
    });
    
    if(tables.joined.length > 0) {
      tables.joined.forEach(function(t){
        let buffer = [];
        database[t.table].forEach(function(rowToJoin){
          let rowToJoinValue = rowToJoin[t.on.right.column];
          rows.forEach(function(row, i){ 
            let rowValue = t.on.left.getValue(row);
            if(evaluateOperator(rowValue, rowToJoinValue, t.on.operator)){
              row = JSON.parse(JSON.stringify(row));
              buffer.push(row);
              row[t.table] = rowToJoin;
            }
          });
        });
        
        rows = buffer;
      });    
    }
        
    let results = rows
                  .filter(function(row){ 
                    if(!queryExpression.where) { return true; }
                    let left = queryExpression.where.left.getValue(row),
                        right = queryExpression.where.right.getValue(row);
                    return evaluateOperator(left, right, queryExpression.where.operator); 
                  })
                  .map(function(row){
                    return queryExpression.select.reduce(function(m,s){
                      m[s.table + '.' + s.column] = s.getValue(row);
                      return m;
                    },{});      
                  });
    
    function evaluateOperator(left, right, operator){
      return eval('"' +left + '"' + operator + '"' +right + '"');
    }
    
    return results;
  }
return {execute:(expr) => execute(parse(expr))}
})(movieDatabase);


describe('execution',function(){
  let engine = new SQLEngine(movieDatabase);
  
  it('should apply WHERE', function(){
    let actual = engine.execute('SELECT movie.title '
                               +'FROM movie '
                               +'WHERE movie.directorID = 11');
    expect(actual).to.have.deep.members([{'movie.title':'E.T. the Extra-Terrestrial'},
                                {'movie.title':'Jurassic Park'}]);
  });
  
  it('should apply WHERE with quoted strings', function(){
    let actual = engine.execute('SELECT movie.title '
                               +'FROM movie '
                               +"WHERE movie.title = 'Pirates of the Caribbean: Dead Man''s Chest'");
    expect(actual).to.have.deep.members( [{'movie.title':"Pirates of the Caribbean: Dead Man's Chest"}]);
  });
  
  it('should perform parent->child JOIN', function(){
    let actual = engine.execute('SELECT movie.title, movie.year '
                               +'FROM movie '
                               +'JOIN director ON director.id = movie.directorID '
                               +"WHERE director.name = 'Christopher Nolan'");
    expect(actual).to.have.deep.members( [{'movie.title':'The Dark Knight Rises','movie.year':2012},
                                {'movie.title':'The Dark Knight','movie.year':2008}]);
  });  
  
  it('should perform child->parent JOIN ', function(){
    let actual = engine.execute('SELECT director.name '
                               +'FROM director '
                               +'JOIN movie ON director.id = movie.directorID '
                               +'WHERE movie.year > 2010');
    expect(actual).to.have.deep.members( [{'director.name':'Joss Whedon'},
                                {'director.name':'Shane Black'},
                                {'director.name':'Sam Mendes'},
                                {'director.name':'Rob Marshall'},
                                {'director.name':'Christopher Nolan'}]);
  });
  
  it('should perform many-to-many JOIN and apply WHERE', function(){
    let actual = engine.execute('SELECT actor.name, movie.title '
                               +'FROM movie '
                               +'JOIN actor_to_movie ON actor_to_movie.movieID = movie.id '
                               +'JOIN actor ON actor_to_movie.actorID = actor.id '
                               +"WHERE movie.directorID = 8");
    expect(actual).to.have.deep.members( [{'movie.title':'The Dark Knight Rises','actor.name':'Christian Bale'},
                                {'movie.title':'The Dark Knight Rises','actor.name':'Gary Oldman'},
                                {'movie.title':'The Dark Knight Rises','actor.name':'Tom Hardy'},
                                {'movie.title':'The Dark Knight Rises','actor.name':'Joseph Gordon-Levitt'},
                                {'movie.title':'The Dark Knight','actor.name':'Christian Bale'},
                                {'movie.title':'The Dark Knight','actor.name':'Heath Ledger'},
                                {'movie.title':'The Dark Knight','actor.name':'Aaron Eckhart'},
                                {'movie.title':'The Dark Knight','actor.name':'Michael Caine'}]);
  });
  
  //randomized tests added by docgunthrop (2017.05.26)
  it('30 Random tests for your enjoyment', function(){
    const randomizer = (n=2) => (Math.random() * n) | 0;
    const randomCase = s => [s.toUpperCase(),s.toLowerCase()][randomizer()];
    const tables = Object.keys(movieDatabase),
        tL = tables.length;
    
    const allComp = ['=','<>','>=','<=','>','<'];
    
    const movieYears = [...new Set(movieDatabase.movie.map(e => e.year))],
        movieTitles = movieDatabase.movie.map(e => e.title),
        directorNames = movieDatabase.director.map(e => e.name),
        actorNames = movieDatabase.actor.map(e => e.name);
    
    const whereOpts = {
      movie:[
        ['title',_ => '=',() => `'${movieTitles[randomizer(movieTitles.length)].replace(/'/g,"''")}'`],
        ['year',_ => allComp[randomizer(allComp.length)],() => randomizer(10)+1993],
        ['year',_ => '=',() => movieYears[randomizer(movieYears.length)]]],
      director:[['name',_ => '=',() => `'${directorNames[randomizer(directorNames.length)].replace(/'/g,"''")}'`]],
      actor:[['name',_ => '=',() => `'${actorNames[randomizer(actorNames.length)].replace(/'/g,"''")}'`]]};
    
    const joinChain = {
      movie:{
        actor_to_movie:['movie.id','actor_to_movie.movieID'],
        director:['movie.directorID','director.id']},
      director:{
        movie:['director.id','movie.directorID']},
      actor:{
        actor_to_movie:['actor.id','actor_to_movie.actorID']},
      actor_to_movie:{
        actor:['actor_to_movie.actorID','actor.id'],
        movie:['actor_to_movie.movieID','movie.id']}};
    
    const forgeJoin = (n,q) => {
      const message = [''],
          tableSet = [q];
      let i = 0;
      while (i++ <= n){
        message.push(randomCase('JOIN'));
        let newtab,
          chainOpt;
        while (true){
          newtab = tables[randomizer(tL)];
          if (tableSet.includes(newtab)){continue}
          chainOpt = Object.keys(joinChain[newtab]).filter(e => tableSet.includes(e));
          if (!chainOpt.length){continue}
          break}
        message.push(newtab,randomCase('ON'));
        tableSet.push(newtab);
        let chainSelect = joinChain[newtab][chainOpt[randomizer(chainOpt.length)]];
        message.push(chainSelect[0],'=',chainSelect[1])}
      return [message.join(' '),tableSet]};
    
    const forgeWhere = x => {
      const message = ['',randomCase('WHERE')];
      let randT = x[randomizer(x.length)];
      let whereVal = whereOpts[randT];
      let rez = whereVal[randomizer(whereVal.length)];
      message.push(`${randT}.${rez[0]}`,rez[1](),rez[2]());
      return [`${randT}.${rez[0]}`,message.join(' ')]};
    
    const forgeSelect = (n,x,wp) => {
      let message = [];
      while (n > 0){
        let rtab = x[randomizer(x.length)],
          prop = Object.keys(movieDatabase[rtab][0]),
          entry = `${rtab}.${prop[randomizer(prop.length)]}`;
        if (entry === wp){continue}
        if (!message.includes(entry)){message.push(entry)}
        n--}
      return message.join(', ')};
    
    let i = 0;
    while (i++ < 30){
      let getFrom = tables.filter(e => e !== 'actor_to_movie')[randomizer(tL-1)],
        groupedTables = [getFrom],
        joinCount = randomizer(3),
        getJoin = '';
      if (joinCount){
        [getJoin,groupedTables] = forgeJoin(joinCount,getFrom)}
      let doWhere = randomizer(),
        [whereProp,getWhere] = doWhere ? forgeWhere(groupedTables.filter(e => e !== 'actor_to_movie')) : ['',''],
        selectCount = randomizer(3) + 1,
        getSelect = forgeSelect(selectCount,groupedTables.filter(e => e !== 'actor_to_movie'),whereProp);
      let decree = `${randomCase('SELECT')} ${getSelect} ${randomCase('FROM')} ${getFrom}${getJoin}${getWhere}`;
      
      let expected = funk.execute(decree);
      let actual = engine.execute(decree);
      
      expect(actual).to.have.deep.members(expected)}
  });//end of submitted randomized testing portion
  
});