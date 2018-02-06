'use strict'

let toJSON = require('xmljson').to_json,
  am = require('async-methods'),
  fs = require('fs')

let createServerHelper = require('./helpers/createServer'),
  createSoapServerHelper = require('./helpers/createSoapServer'),
  SoapService = class {
    constructor(service, wsdlFile, path) {
      this.server = null
      // service description
      this.service = require('./services/' + service)
      // wsdl interface description (xml)
      this.wsdl = fs.readFileSync(__dirname + wsdlFile, 'utf8')
      this.path = path || ''
    }
    async createServer(port) {
      let self = this
      return createServerHelper.apply(self, arguments)
    }
    async createSoapServer() {
      let self = this
      return createSoapServerHelper.apply(self, arguments)
    }
    async startServer() {
      await this.createServer(5089)
      await this.createSoapServer()
    }
  }

new SoapService('accountsService', '/wsdl/accounts.wsdl', '/accountsList')
  .startServer()
  .catch(err => {
    // handle errors at end of chain
    console.log(22, err)
  })

/* soapService attributes
server
service
wsdl
soapServer
baseUrl

*/
