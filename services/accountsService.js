module.exports = {
  AccountsService: {
    AccountsPort: {
      GetAccountsList: function(args, cb, soapHeader) {
        console.log(args)
        if (soapHeader) return { TradePrice: { price: soapHeader.SomeToken } }
        if (args.tickerSymbol === 'trigger error') {
          throw new Error('triggered server error')
        } else if (args.tickerSymbol === 'Async') {
          return cb({ TradePrice: { price: 19.56 } })
        } else if (args.tickerSymbol === 'SOAP Fault v1.2') {
          throw {
            Fault: {
              Code: {
                Value: 'soap:Sender',
                Subcode: { value: 'rpc:BadArguments' }
              },
              Reason: { Text: 'Processing Error' }
            }
          }
        } else if (args.tickerSymbol === 'SOAP Fault v1.1') {
          throw {
            Fault: {
              faultcode: 'soap:Client.BadArguments',
              faultstring: 'Error while processing arguments'
            }
          }
        } else if (args.customerId === '23456789') {
          var jsonResponse = {
            AccountsList: [
              { sortCode: '34-45-67', accountNo: '6575927392' },
              { sortCode: '40-44-67', accountNo: '6574546392' }
            ]
          }
          return jsonResponse
        } else {
          var jsonResponse = {
            AccountsList: [
              { sortCode: '44-44-44', accountNo: '2225927392' },
              { sortCode: '40-44-67', accountNo: '2224546392' }
            ]
          }
          return jsonResponse
        }
      },

      SetTradePrice: function(args, cb, soapHeader) {},

      IsValidPrice: function(args, cb, soapHeader, req) {
        lastReqAddress = req.connection.remoteAddress

        var validationError = {
          Fault: {
            Code: {
              Value: 'soap:Sender',
              Subcode: { value: 'rpc:BadArguments' }
            },
            Reason: { Text: 'Processing Error' },
            statusCode: 500
          }
        }

        var isValidPrice = function() {
          var price = args.price
          if (isNaN(price) || price === ' ') {
            return cb(validationError)
          }

          price = parseInt(price, 10)
          var validPrice = price > 0 && price < Math.pow(10, 5)
          return cb(null, { valid: validPrice })
        }

        setTimeout(isValidPrice, 10)
      }
    }
  }
}
