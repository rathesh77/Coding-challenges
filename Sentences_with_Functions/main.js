function Adam() {return arguments.length == 0 ? "Adam." : "Adam " + arguments[0]}
function has() {return "has " + arguments[0]}
function a() {return "a " + arguments[0]}
function dog() {return arguments.length == 0 ? "dog." : "dog " + arguments[0]}
function The() {return "The " + arguments[0]}
function name() {return "name " + arguments[0]}
function of () {return "of " + arguments[0]}
function the() {return "the " + arguments[0]}
function is() {return "is " + arguments[0]}
function also() {return "also " + arguments[0]}

console.log(The(name(of(the(dog(is(also(Adam()))))))));