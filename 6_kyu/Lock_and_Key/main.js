class Key {
  constructor(id) {
    this.id = id
  }
}

class Lock {
  constructor() {
    this.keys = new Map()
  }
  createKey() {
    let uniqueId = this.keys.size + 1
    const key = new Key(uniqueId)
    this.keys.set(uniqueId, key)
    return key
  }
  check(key) {
    if (!this.keys.has(key.id) || key instanceof Key === false)
      return false

    return true
  }
  expire(key) {
    if (this.check(key)) {
      this.keys.delete(key.id)
    }
    else {
      throw new Error('Invalid key')
    }
  }
}

var lock1 = new Lock();
var key1 = lock1.createKey();
console.log
console.log(lock1.check(key1)); // true
lock1.expire(key1);
console.log(lock1.check(key1)); // false

