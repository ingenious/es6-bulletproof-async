let soap = require('strong-soap').soap,
  am = require('async-methods')

module.exports = function(wsdl, options) {
  let self = this
  return am(soap.createClient, wsdl, options).next(client => {
    self.description = client.describe()

    console.log()
    return this.description
  })
}
