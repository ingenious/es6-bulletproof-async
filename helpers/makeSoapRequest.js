let am = require('async-methods')

module.exports = function(method, requestParams) {
  let self = this
  if (!this.soapClient) {
    throw 'create soapClient before making request'
  }

  return new Promise((resolve, reject) => {
    self.soapClient[method](requestParams, {}, function(err) {
      try {
        if (err) {
          reject(err)
        } else {
          resolve(arguments[2])
        }
      } catch (e) {
        reject(e)
      }
    })
  })
}
