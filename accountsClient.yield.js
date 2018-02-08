'use strict'

let customerId = process.argv[2] || '23456789'

// soap client
let am = require('async-methods')
let makeSoapRequest = require('./helpers/makeSoapRequest')
let convertXMLToJSON = require('./helpers/convertXMLToJSON')
let createSOAPClient = require('./helpers/createSOAPClient')
let trimAccountsList = require('./requestHelpers/AccountsList/trimAccountsList')

// class holding asynchronous steps
let SoapRequestSteps = class {
  constructor (wsdl, options) {
    this.clientReady = this.createSOAPClient(wsdl, options)
  }
  createSOAPClient (wsdl, options) {
    return createSOAPClient.apply(this, arguments)
  }
  makeSoapRequest (method, params) {
    let self = this
    let args = arguments
      /*
       make sure the client has been created  */
    return am(function * () {
      self.soapClient = yield self.clientReady
      return makeSoapRequest.apply(self, args)
    })
  }

    /* Using async allows a sequence of asynchronous steps to be followed
       without indenting */
  getAccountsList (customerId) {
    let self = this
    return am(function * () {

      //  async step
      let xml = yield self.makeSoapRequest('GetAccountsList', {
        AccountsRequest: { customerId: customerId }
      })
      self.responseBody = xml

      // async step
      let json = yield convertXMLToJSON(xml)

      // sync step
      return trimAccountsList(customerId, json)
    })
  }
  logExchange () {
    console.log('Request:\n', this.requestBody, '\n\nResponse:\n', this.responseBody)
  }
  }

let soapClient = new SoapRequestSteps('http://127.0.0.1:5089/accountsList?WSDL', {
  // SOAP options
})

soapClient
  .getAccountsList(customerId)
  .then(result => {
    console.log()
    console.log(result)
    console.log()
  })
  .then(() => {
    soapClient.logExchange()
  })
  .catch(err => {
    console.log(62, err)
  })
