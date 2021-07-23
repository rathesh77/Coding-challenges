class Car {
    constructor(speed, reactionTime, deceleration) {
        this.speed = speed
        this.reactionTime = reactionTime
        this.deceleration = deceleration
    }
}

function emergencyStop(deer, anna) {
    // Oh deer...
    const { speed, reactionTime, deceleration } = anna
    const distanceBetweenAnnaAndDeer = deer - (speed * reactionTime)
    const rf = (speed * (speed / deceleration)) + (0.5 * -deceleration * (speed / deceleration) ** 2)
    const delta = distanceBetweenAnnaAndDeer - rf
    if (delta >= 10) {
      return 'What was all the fuzz about?'
    }
    if (delta > 0 && delta < 10)
      return 'Phew, that was close...'
  
    const vf = Math.sqrt((speed ** 2) - (2 * deceleration * distanceBetweenAnnaAndDeer))
  
    if (vf >= 10)
      return 'An accident was unavoidable...'
  
    return 'The deer jumps away in the nick of time!'
  }

console.log(emergencyStop(89, new Car(37.10357423149861, 1.4161274237638357, 16.94479790018812)))


