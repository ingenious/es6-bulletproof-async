'use strict';

let join = require('path').join;
let fs = require('fs');
let createServerHelper = require('./helpers/createServer');
let createSoapServerHelper = require('./helpers/createSoapServer');
let SoapService = class {
  constructor (service, wsdlFile, path) {
    this.server = null;
    // service description
    this.service = require('./services/' + service);
    // wsdl interface description (xml)
    this.wsdl = fs.readFileSync(join(__dirname, wsdlFile), 'utf8');
    this.path = path || '';
  }
  createServer (port) {
    let self = this;
    return createServerHelper.apply(self, arguments);
  }

  createSoapServer () {
    let self = this;
    return createSoapServerHelper.apply(self, arguments);
  }
  async startServer () {
    let self = this;
    await self.createServer(5089);
    await self.createSoapServer();
  }
};

new SoapService('accountsService', '/wsdl/accounts.wsdl', '/accountsList')
  .startServer()
  .catch(err => {
    // handle errors at end of chain
    console.log(22, err);
  });
