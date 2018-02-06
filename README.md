# es6-bulletproof-async 

> * A set of model code and examples that illustrates the **es6-bulletproof** pattern
> * A set of tips and techniques for coding asynchronous processes in ES6 Javascript so that
> * Indenting is eliminated and 
> * error handling always conducts errors to the final **.catch()** in a Promise chain


Some code samples are available here [es6 async tips examples](https://github.com/ingenious/es6-bulletproof-async/blob/master/es6AsyncTipsExamples.js)

Fully working code example is available: [Accounts List demo](https://github.com/ingenious/es6-bulletproof-async) described here: [Install and run](https://github.com/ingenious/es6-bulletproof-async/blob/master/README.md)

## Install model code


### Download zip or use npm

[Download es6-bulletproof-async sample code](https://github.com/ingenious/es6-bulletproof-async/archive/master.zip)

```javascript 
                                                                             
   $ npm install ingenious/es6-bulletproof-async


```

```
                                                                     
	// in root of folder
	$ npm install
	$ node accountsServer
	
```
should see


```
                                                                               
   SOAP service available on  http://127.0.0.1:5089/accountsList


```

Open another terminal window

```
                                                                     
	// in root of folder
	
	// accountId parameter can be varied
	$  node accountsClient  83684826432
	
```

Response

```
                                                                                     
{ accountId: '83684826432',
  accountsList:
   [ { sortCode: '44-44-44', accountNo: '2225927392' },
     { sortCode: '40-44-67', accountNo: '2224546392' } ] }

Request:
 <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Body>
    <ns1:AccountsRequest xmlns:ns1="http://example.com/accounts.xsd">
      <customerId>83684826432</customerId>
    </ns1:AccountsRequest>
  </soap:Body>
</soap:Envelope>

Response:
 <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Body>
    <AccountsList>
      <sortCode>44-44-44</sortCode>
      <accountNo>2225927392</accountNo>
    </AccountsList>
    <AccountsList>
      <sortCode>40-44-67</sortCode>
      <accountNo>2224546392</accountNo>
    </AccountsList>
  </soap:Body>
</soap:Envelope>




```

##  Creating ES6 'Bulletproof' asynchronous processes
###  Overview of pattern

1.  Have each step of the return a promise  (facilitates unit testing and sharing)

2.  Wrap legacy callback handlers in Promise bodies in **try { .. } catch(e){ resolve(e) }**

3.  Add each step as an **async** method of a 'steps' class

4.  Add a final method which has the sequence logic laid out with **await** statements 

5.  Return a Promise in **.then()** or **catch()** steps of a chain to ensure errors are passed down the chain 

### Benefits of pattern

1.  Syntax or processing errors are passed down the chain to be handled at the end of the chain

2.  By using class structures, data can be passed or cumulated through Promise chains in the **this** of  the newed class

2.  Promises, functions, generators and static method can be mixed in the same structure

3.  **await** keyword allows linear sequences of async processes without need for indenting

4.  Code has enhanced readability

The pattern is fully explained in this document:   [ES6 async features in Node](https://github.com/ingenious/es6-bulletproof-async/blob/master/ES6%20async%20features%20in%20node.md)

