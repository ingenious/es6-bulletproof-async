let soap = require('strong-soap').soap
module.exports = function(wsdl, options) {
  let self = this
  return new Promise((resolve, reject) => {
    soap.createClient(wsdl, options, function(err, client) {
      if (client)
        client.on('request', function(requestXML) {
          self.requestBody = requestXML
        })
      try {
        if (err) {
          reject(err)
        } else if (client) {
          // enable multiple requests with same client
          self.soapClient = client

          resolve(client)
        }
      } catch (e) {
        console.log(17, e)
        reject(e)
      }
    })
  })
}
