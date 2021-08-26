const countPatternsFrom = require('./main')

console.log(countPatternsFrom('E', 8))

Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))