'use strict'

let customerId = process.argv[2] || '23456789'

// soap client
let makeSoapRequest = require('./helpers/makeSoapRequest'),
  convertXMLToJSON = require('./helpers/convertXMLToJSON'),
  createSOAPClient = require('./helpers/createSOAPClient'),
  trimAccountsList = require('./requestHelpers/AccountsList/trimAccountsList'),
  // class holding asynchronous steps
  soapRequestSteps = class {
    constructor(wsdl, options) {
      this.clientReady = this.createSOAPClient(wsdl, options)
    }
    async createSOAPClient(wsdl, options) {
      return createSOAPClient.apply(this, arguments)
    }
    async makeSoapRequest(method, params) {
      /*
       make sure the client has been created  */
      if (!await this.clientReady) {
        throw 'SOAP client not available'
      }
      return makeSoapRequest.apply(this, arguments)
    }

    /* Using async allows a sequence of asynchronous steps to be followed
       without indenting */
    async getAccountsList(customerId) {
      /*
      async step  */
      let xml = await this.makeSoapRequest('GetAccountsList', {
        AccountsRequest: { customerId: customerId }
      })
      this.responseBody = xml

      // async step
      let json = await convertXMLToJSON(xml)

      // sync step
      return trimAccountsList(customerId, json)
    }
    async logExchange() {
      console.log('Request:\n', this.requestBody, '\n\nResponse:\n', this.responseBody)
    }
  }

let soapClient = new soapRequestSteps('http://127.0.0.1:5089/accountsList?WSDL', {
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
