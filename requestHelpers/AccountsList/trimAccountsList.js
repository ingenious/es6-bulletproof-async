module.exports = function(accountId, json) {
  let list = []
  if (
    !json['soap:Envelope'] ||
    !json['soap:Envelope']['soap:Body'] ||
    !json['soap:Envelope']['soap:Body']['AccountsList']
  ) {
    throw ' No xpath soap:Envelope/soap:Body/AccountsList in json response'
  }

  // change object to array
  for (var index in json['soap:Envelope']['soap:Body'].AccountsList) {
    list.push(json['soap:Envelope']['soap:Body'].AccountsList[index])
  }
  return {
    accountId: accountId,
    accountsList: list
  }
}
