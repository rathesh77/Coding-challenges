const assert = require('assert')
const {Morse} = require('./clever_version')

describe('Basic Functionality',function(){
    it('HELLO WORLD', function(){
      assert.deepStrictEqual(Morse.encode('HELLO WORLD'), [-1440552402,-1547992901,-1896993141,-1461059584]);
      assert.deepStrictEqual(Morse.decode([-1440552402, -1547992901, -1896993141, -1461059584]), 'HELLO WORLD');
    });
    
    it('Encoding', function(){
      assert.deepStrictEqual(Morse.encode('EEEEEEEIE'), [-2004318070,536870912]);
      assert.deepStrictEqual(Morse.encode('(?:.+)'), [-340120646,-1896961862,-343167346,-1146224640]);
      assert.deepStrictEqual(Morse.encode('CODEWARS'), [-341591154,-1573985566,-391643136]);
    });
    
    it('Decoding', function(){
      assert.deepStrictEqual(Morse.decode([-2004318070,536870912]), 'EEEEEEEIE');
      assert.deepStrictEqual(Morse.decode([-340120646,-1896961862,-343167346,-1146224640]), '(?:.+)');
      assert.deepStrictEqual(Morse.decode([-341591154,-1573985566,-391643136]), 'CODEWARS');
    });
  });
  
  describe('Edge Cases',function(){
    it('Conversion to Int32',function(){
      assert.deepStrictEqual(Morse.decode([2147483648]), 'E', 'Decode input is not guranteed to be Int32. You must convert Numbers into Int32 using bitwise operators.');
      assert.deepStrictEqual(Morse.decode([-2147483648]), 'E', 'Decode input is not guranteed to be Int32. You must convert Numbers into Int32 using bitwise operators.');
      assert.deepStrictEqual(Morse.decode([-298086688]), 'MMM', 'Numbers must be converted into 32-bit integers. Try using a bitwise operator to force the conversion.');
      assert.deepStrictEqual(Morse.decode([3996880608]), 'MMM', 'Numbers must be converted into 32-bit integers. Try using a bitwise operator to force the conversion.');
    });
    it('Leading Zeros',function(){
      assert.deepStrictEqual(Morse.encode('EEEEEEEE E'),  [-2004318072,134217728]);
      assert.deepStrictEqual(Morse.decode( [-2004318072,134217728]), 'EEEEEEEE E');
    });
    it('Trailing Bit',function(){
      assert.deepStrictEqual(Morse.encode('EEEEEEE E'), [-2004318080,-2147483648]);
      assert.deepStrictEqual(Morse.decode([-2004318080,-2147483648]), 'EEEEEEE E');
    });
  });
  
  describe('Full Character Set', function(){
    it('Encoding and Decoding Single Characters', function(){
      assert.deepStrictEqual(Morse.encode('A'),[-1207959552]);
      assert.deepStrictEqual(Morse.decode([-1207959552]),'A');
      assert.deepStrictEqual(Morse.decode([3087007744]),'A');
      assert.deepStrictEqual(Morse.encode('B'),[-360710144]);
      assert.deepStrictEqual(Morse.decode([-360710144]),'B');
      assert.deepStrictEqual(Morse.decode([3934257152]),'B');
      assert.deepStrictEqual(Morse.encode('C'),[-341835776]);
      assert.deepStrictEqual(Morse.decode([-341835776]),'C');
      assert.deepStrictEqual(Morse.decode([3953131520]),'C');
      assert.deepStrictEqual(Morse.encode('D'),[-369098752]);
      assert.deepStrictEqual(Morse.decode([-369098752]),'D');
      assert.deepStrictEqual(Morse.decode([3925868544]),'D');
      assert.deepStrictEqual(Morse.encode('E'),[-2147483648]);
      assert.deepStrictEqual(Morse.decode([-2147483648]),'E');
      assert.deepStrictEqual(Morse.decode([2147483648]),'E');
      assert.deepStrictEqual(Morse.encode('F'),[-1367343104]);
      assert.deepStrictEqual(Morse.decode([-1367343104]),'F');
      assert.deepStrictEqual(Morse.decode([2927624192]),'F');
      assert.deepStrictEqual(Morse.encode('G'),[-293601280]);
      assert.deepStrictEqual(Morse.decode([-293601280]),'G');
      assert.deepStrictEqual(Morse.decode([4001366016]),'G');
      assert.deepStrictEqual(Morse.encode('H'),[-1442840576]);
      assert.deepStrictEqual(Morse.decode([-1442840576]),'H');
      assert.deepStrictEqual(Morse.decode([2852126720]),'H');
      assert.deepStrictEqual(Morse.encode('I'),[-1610612736]);
      assert.deepStrictEqual(Morse.decode([-1610612736]),'I');
      assert.deepStrictEqual(Morse.decode([2684354560]),'I');
      assert.deepStrictEqual(Morse.encode('J'),[-1145569280]);
      assert.deepStrictEqual(Morse.decode([-1145569280]),'J');
      assert.deepStrictEqual(Morse.decode([3149398016]),'J');
      assert.deepStrictEqual(Morse.encode('K'),[-343932928]);
      assert.deepStrictEqual(Morse.decode([-343932928]),'K');
      assert.deepStrictEqual(Morse.decode([3951034368]),'K');
      assert.deepStrictEqual(Morse.encode('L'),[-1166016512]);
      assert.deepStrictEqual(Morse.decode([-1166016512]),'L');
      assert.deepStrictEqual(Morse.decode([3128950784]),'L');
      assert.deepStrictEqual(Morse.encode('M'),[-301989888]);
      assert.deepStrictEqual(Morse.decode([-301989888]),'M');
      assert.deepStrictEqual(Morse.decode([3992977408]),'M');
      assert.deepStrictEqual(Morse.encode('N'),[-402653184]);
      assert.deepStrictEqual(Morse.decode([-402653184]),'N');
      assert.deepStrictEqual(Morse.decode([3892314112]),'N');
      assert.deepStrictEqual(Morse.encode('O'),[-287309824]);
      assert.deepStrictEqual(Morse.decode([-287309824]),'O');
      assert.deepStrictEqual(Morse.decode([4007657472]),'O');
      assert.deepStrictEqual(Morse.encode('P'),[-1147142144]);
      assert.deepStrictEqual(Morse.decode([-1147142144]),'P');
      assert.deepStrictEqual(Morse.decode([3147825152]),'P');
      assert.deepStrictEqual(Morse.encode('Q'),[-289931264]);
      assert.deepStrictEqual(Morse.decode([-289931264]),'Q');
      assert.deepStrictEqual(Morse.decode([4005036032]),'Q');
      assert.deepStrictEqual(Morse.encode('R'),[-1174405120]);
      assert.deepStrictEqual(Morse.decode([-1174405120]),'R');
      assert.deepStrictEqual(Morse.decode([3120562176]),'R');
      assert.deepStrictEqual(Morse.encode('S'),[-1476395008]);
      assert.deepStrictEqual(Morse.decode([-1476395008]),'S');
      assert.deepStrictEqual(Morse.decode([2818572288]),'S');
      assert.deepStrictEqual(Morse.encode('T'),[-536870912]);
      assert.deepStrictEqual(Morse.decode([-536870912]),'T');
      assert.deepStrictEqual(Morse.decode([3758096384]),'T');
      assert.deepStrictEqual(Morse.encode('U'),[-1375731712]);
      assert.deepStrictEqual(Morse.decode([-1375731712]),'U');
      assert.deepStrictEqual(Morse.decode([2919235584]),'U');
      assert.deepStrictEqual(Morse.encode('V'),[-1417674752]);
      assert.deepStrictEqual(Morse.decode([-1417674752]),'V');
      assert.deepStrictEqual(Morse.decode([2877292544]),'V');
      assert.deepStrictEqual(Morse.encode('W'),[-1149239296]);
      assert.deepStrictEqual(Morse.decode([-1149239296]),'W');
      assert.deepStrictEqual(Morse.decode([3145728000]),'W');
      assert.deepStrictEqual(Morse.encode('X'),[-354418688]);
      assert.deepStrictEqual(Morse.decode([-354418688]),'X');
      assert.deepStrictEqual(Morse.decode([3940548608]),'X');
      assert.deepStrictEqual(Morse.encode('Y'),[-340262912]);
      assert.deepStrictEqual(Morse.decode([-340262912]),'Y');
      assert.deepStrictEqual(Morse.decode([3954704384]),'Y');
      assert.deepStrictEqual(Morse.encode('Z'),[-291504128]);
      assert.deepStrictEqual(Morse.decode([-291504128]),'Z');
      assert.deepStrictEqual(Morse.decode([4003463168]),'Z');
      assert.deepStrictEqual(Morse.encode('0'),[-286334976]);
      assert.deepStrictEqual(Morse.decode([-286334976]),'0');
      assert.deepStrictEqual(Morse.decode([4008632320]),'0');
      assert.deepStrictEqual(Morse.encode('1'),[-1145339904]);
      assert.deepStrictEqual(Morse.decode([-1145339904]),'1');
      assert.deepStrictEqual(Morse.decode([3149627392]),'1');
      assert.deepStrictEqual(Morse.encode('2'),[-1360134144]);
      assert.deepStrictEqual(Morse.decode([-1360134144]),'2');
      assert.deepStrictEqual(Morse.decode([2934833152]),'2');
      assert.deepStrictEqual(Morse.encode('3'),[-1414004736]);
      assert.deepStrictEqual(Morse.decode([-1414004736]),'3');
      assert.deepStrictEqual(Morse.decode([2880962560]),'3');
      assert.deepStrictEqual(Morse.encode('4'),[-1428160512]);
      assert.deepStrictEqual(Morse.decode([-1428160512]),'4');
      assert.deepStrictEqual(Morse.decode([2866806784]),'4');
      assert.deepStrictEqual(Morse.encode('5'),[-1434451968]);
      assert.deepStrictEqual(Morse.decode([-1434451968]),'5');
      assert.deepStrictEqual(Morse.decode([2860515328]),'5');
      assert.deepStrictEqual(Morse.encode('6'),[-358612992]);
      assert.deepStrictEqual(Morse.decode([-358612992]),'6');
      assert.deepStrictEqual(Morse.decode([3936354304]),'6');
      assert.deepStrictEqual(Morse.encode('7'),[-290979840]);
      assert.deepStrictEqual(Morse.decode([-290979840]),'7');
      assert.deepStrictEqual(Morse.decode([4003987456]),'7');
      assert.deepStrictEqual(Morse.encode('8'),[-286654464]);
      assert.deepStrictEqual(Morse.decode([-286654464]),'8');
      assert.deepStrictEqual(Morse.decode([4008312832]),'8');
      assert.deepStrictEqual(Morse.encode('9'),[-286359552]);
      assert.deepStrictEqual(Morse.decode([-286359552]),'9');
      assert.deepStrictEqual(Morse.decode([4008607744]),'9');
      assert.deepStrictEqual(Morse.encode('.'),[-1158971392]);
      assert.deepStrictEqual(Morse.decode([-1158971392]),'.');
      assert.deepStrictEqual(Morse.decode([3135995904]),'.');
      assert.deepStrictEqual(Morse.encode(','),[-290529280]);
      assert.deepStrictEqual(Morse.decode([-290529280]),',');
      assert.deepStrictEqual(Morse.decode([4004438016]),',');
      assert.deepStrictEqual(Morse.encode('?'),[-1360396288]);
      assert.deepStrictEqual(Morse.decode([-1360396288]),'?');
      assert.deepStrictEqual(Morse.decode([2934571008]),'?');
      assert.deepStrictEqual(Morse.encode('\''),[-1145331712]);
      assert.deepStrictEqual(Morse.decode([-1145331712]),'\'');
      assert.deepStrictEqual(Morse.decode([3149635584]),'\'');
      assert.deepStrictEqual(Morse.encode('!'),[-340860928]);
      assert.deepStrictEqual(Morse.decode([-340860928]),'!');
      assert.deepStrictEqual(Morse.decode([3954106368]),'!');
      assert.deepStrictEqual(Morse.encode('/'),[-353894400]);
      assert.deepStrictEqual(Morse.decode([-353894400]),'/');
      assert.deepStrictEqual(Morse.decode([3941072896]),'/');
      assert.deepStrictEqual(Morse.encode('('),[-340131840]);
      assert.deepStrictEqual(Morse.decode([-340131840]),'(');
      assert.deepStrictEqual(Morse.decode([3954835456]),'(');
      assert.deepStrictEqual(Morse.encode(')'),[-340074496]);
      assert.deepStrictEqual(Morse.decode([-340074496]),')');
      assert.deepStrictEqual(Morse.decode([3954892800]),')');
      assert.deepStrictEqual(Morse.encode('&'),[-1163919360]);
      assert.deepStrictEqual(Morse.decode([-1163919360]),'&');
      assert.deepStrictEqual(Morse.decode([3131047936]),'&');
      assert.deepStrictEqual(Morse.encode(':'),[-286621696]);
      assert.deepStrictEqual(Morse.decode([-286621696]),':');
      assert.deepStrictEqual(Morse.decode([4008345600]),':');
      assert.deepStrictEqual(Morse.encode(';'),[-340885504]);
      assert.deepStrictEqual(Morse.decode([-340885504]),';');
      assert.deepStrictEqual(Morse.decode([3954081792]),';');
      assert.deepStrictEqual(Morse.encode('='),[-357040128]);
      assert.deepStrictEqual(Morse.decode([-357040128]),'=');
      assert.deepStrictEqual(Morse.decode([3937927168]),'=');
      assert.deepStrictEqual(Morse.encode('+'),[-1159200768]);
      assert.deepStrictEqual(Morse.decode([-1159200768]),'+');
      assert.deepStrictEqual(Morse.decode([3135766528]),'+');
      assert.deepStrictEqual(Morse.encode('='),[-357040128]);
      assert.deepStrictEqual(Morse.decode([-357040128]),'=');
      assert.deepStrictEqual(Morse.decode([3937927168]),'=');
      assert.deepStrictEqual(Morse.encode('_'),[-1360297984]);
      assert.deepStrictEqual(Morse.decode([-1360297984]),'_');
      assert.deepStrictEqual(Morse.decode([2934669312]),'_');
      assert.deepStrictEqual(Morse.encode('"'),[-1162215424]);
      assert.deepStrictEqual(Morse.decode([-1162215424]),'"');
      assert.deepStrictEqual(Morse.decode([3132751872]),'"');
      assert.deepStrictEqual(Morse.encode('$'),[-1414823936]);
      assert.deepStrictEqual(Morse.decode([-1414823936]),'$');
      assert.deepStrictEqual(Morse.decode([2880143360]),'$');
      assert.deepStrictEqual(Morse.encode('@'),[-1146191872]);
      assert.deepStrictEqual(Morse.decode([-1146191872]),'@');
      assert.deepStrictEqual(Morse.decode([3148775424]),'@');
    });
  });
  
  describe('Randomized Encode-->Decode',function(){
    it('Should return the original input value', function(){
      for(let i=0; i<10; ++i){
        let randStr = (Math.random()+1).toString(36).slice(3).toUpperCase() +
              ' $@' + (Math.random()+1).toString(36).slice(3).toUpperCase() +
              ' !"' + (Math.random()+1).toString(36).slice(3).toUpperCase();
        assert.deepStrictEqual(Morse.decode(Morse.encode(randStr)), randStr);
      }
    });
  });
    