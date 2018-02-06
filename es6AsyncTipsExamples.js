/*

Errors thrown in  Promise bodies are generally trapped by the Promise and will appear in the catch method at the end of the promise chain
This isn't the case for some callback funtions occuring in the Promise body (see below)

*/

new Promise((resolve, reject) => {
  throw 'this is rejected'
  resolve(57)
})
  .then(r => {
    console.log(r) // nothing logged
  })
  .catch(err => {
    console.log(err) // logs: this is rejected
  })

/*

Errors thrown in callback functions occuring within Promise bodies may not be trapped by the Promise itself
This is because the error gets thrown in a defferent context (that of the function wrapping the callback)

It is advised to wrap the body of the callback in a try{ .. }catch(e){reject(e)} to ensure that
the error is trapped and passed to the catch at the end of the promise chain

*/
let fs = require('fs')

let writePromiseUnsafe = function() {
    return new Promise((resolve, reject) => {
      fs.writeFile('./test.txt', 'hello world', function(err, result) {
        throw 'problem in processing write'
        // excution stops here
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  },
  writePromiseSafe = function(filename) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, 'hello world', function(err, result) {
        try {
          throw 'problem in processing write'
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        } catch (e) {
          // thrown error lands here, then is rejected
          reject(e)
        }
      })
    })
  }
writePromiseSafe('./test.txt')
  .then(r => {
    console.log(35, 'written ok')
  })
  .catch(err => {
    console.log(err) // ​​ logs:  ​​​problem in processing write​​​​​
  })

writePromiseUnsafe()
  .then(r => {
    console.log(43, 'written ok') // nothing logged, process stalled
  })
  .catch(err => {
    console.log('write issue', err) // nothing logged, process stalled
  })

/*

Errors thrown in  async methods of classes are generally trapped by the method and will appear in the catch method at the end of the promise chain


*/

let test = class {
  async checkThrow() {
    throw 'I am trapped'
    // this isn't executed
    return await Promise.await(57)
  }
  async some() {
    return await 4
  }
}

new test()
  .checkThrow()
  .then()
  .catch(err => {
    console.log(err) // logs I am trapped
  })

/*

  There are 4 keywords that can preceed a method in an ES6 class - '*', 'async', 'constructor' and 'static'
  This sample class illustrates the use of each
  */

test = class {
  constructor(arg) {
    this.input = arg
  }
  *generatorFn(y) {
    yield 4
    return yield this.normal(y)
  }

  async promiseFn(x) {
    return x + 1
  }
  normal(x) {
    return x + 1
  }
  static init() {
    return 6
  }
}

let tester = new test(3),
  gen = tester.generatorFn(4)

console.log(tester.input) // 3
console.log(gen.next().value) // 4
console.log(gen.next().value) // 5
console.log(test.init()) // 6

Promise.resolve(99).then(console.log)
