let soap = require('strong-soap').soap;
module.exports = function () {
  let self = this;
  return new Promise((resolve, reject) => {
    self.soapServer = soap.listen(self.server, self.path, self.service, self.wsdl);
    self.baseUrl = 'http://' + self.server.address().address + ':' + self.server.address().port;

    // windows return 0.0.0.0 as address and that is not valid to use in a request
    if (self.server.address().address === '0.0.0.0' || self.server.address().address === '::') {
      self.baseUrl = 'http://127.0.0.1:' + self.server.address().port;
    }
    console.log('SOAP service available on ', self.baseUrl + '/accountsList');
  });
};
