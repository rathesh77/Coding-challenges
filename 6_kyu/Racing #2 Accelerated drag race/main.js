class Car {
    constructor(reactionTime, acceleration, topSpeed) {
        this.reactionTime = reactionTime
        this.acceleration = acceleration
        this.topSpeed = topSpeed
    }
}

// solution 1
function dragRace(len, anna, bob) {
    const annaPositionWhenTopSpeedReached = 0.5 * anna.topSpeed * (anna.topSpeed / anna.acceleration)
    const bobPositionWhenTopSpeedReached = 0.5 * bob.topSpeed * (bob.topSpeed / bob.acceleration)

    let annaTotalTime = getTotalTime(anna, len, annaPositionWhenTopSpeedReached)
    let bobTotalTime = getTotalTime(bob, len, bobPositionWhenTopSpeedReached)

    if (annaTotalTime == bobTotalTime)
        return 'It\'s a draw'
    if (annaTotalTime < bobTotalTime)
        return 'Anna is the winner'

    return 'Bob is the winner'
}

function getTotalTime(driver, len, positionWhenTopSpeedReached) {
    if (positionWhenTopSpeedReached > len) {
        const velocityOnRaceEnd = Math.sqrt(2 * driver.acceleration * len)
        return (len / (0.5 * velocityOnRaceEnd)) + driver.reactionTime
    }
    const velocityBeforeTopSpeedReached = Math.sqrt(2 * driver.acceleration * positionWhenTopSpeedReached)
    const timeElapsedBeforeTopSpeedReached = ((positionWhenTopSpeedReached) / (0.5 * velocityBeforeTopSpeedReached))
    const RemainingTiming = (len - positionWhenTopSpeedReached) / driver.topSpeed
    return timeElapsedBeforeTopSpeedReached + RemainingTiming + driver.reactionTime
}

// solution 2 (less readable)
function dragRace(len, anna, bob) {
    const annaPositionWhenTopSpeedReached = 0.5 * anna.topSpeed * (anna.topSpeed / anna.acceleration)
    const bobPositionWhenTopSpeedReached = 0.5 * bob.topSpeed * (bob.topSpeed / bob.acceleration)

    let annaTotalTime = getTotalTime(anna, len, annaPositionWhenTopSpeedReached)
    let bobTotalTime = getTotalTime(bob, len, bobPositionWhenTopSpeedReached)

    return annaTotalTime == bobTotalTime ? 'It\'s a draw' : annaTotalTime < bobTotalTime ? 'Anna is the winner' : 'Bob is the winner'
}

const getTotalTime = (driver, len, positionWhenTopSpeedReached) => positionWhenTopSpeedReached > len ? (len / (0.5 * Math.sqrt(2 * driver.acceleration * len))) + driver.reactionTime : ((positionWhenTopSpeedReached) / (0.5 * Math.sqrt(2 * driver.acceleration * positionWhenTopSpeedReached))) + (len - positionWhenTopSpeedReached) / driver.topSpeed + driver.reactionTime
