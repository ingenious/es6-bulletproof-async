# ES6 async features in node

> Using ES6 features in NodeJS ver 7.6 and above to create bulletproof asynchronous processes
>

### 1. Brief history of asynchronous processes in node

### 1.0 The birth of callbacks
To handle io processes which require the main javscript thread to wait, NodeJS was built around [**libuv**](https://nikhilm.github.io/uvbook/basics.html).  When any request for resource is made, it is placed in a queue of callbacks.  So many node functions use callbacks and as a result many packages also use callback functions to handle asynchronous processes.

As typical asynchronous code got more complex problems arose.  Callbacks lead to many levels of idented steps which is difficult to read/understand/debug and if the err argument isn't handled properly it can easy lead to the asynchronous process landing in 'limbo' which only becomes apparant once an unususual error off the 'sweet path' occurs.  These issues of indeting and limbo errors apply even if packages such as **async** are used to create waterfall patterns etc

#### 1.2 Advent of Promises
Since Sept 2015 native Promises were added to nodeJS.  Since then there has been a shift to prefering promises to functions with callbacks.  Directionally all nodejs functions will migrate to returning promises as well or instead of providing callbacks

#####1.2.1 Convert function-with-callback to a Promise

This basic pattern converts a function with callback to a promise:

```javscript
                                                                  
   new Promise((resolve, reject) => {
      fs.readFile(
         './test.txt',  function(err, result) {
        
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    }).then(result=>{
    	console.log(result)
    }){
    }.catch(err=>{
    	console.log(err)
    })
    

```
Similarly generators, success-fail functions, iterables etc can be converted to Promises.

Note:  In above example there is a risk of not all errors being trapped see this section:[Have each step return a Promise]()

#####1.2.2 Promise static methods

1. **Promise.resolve***( 49 ).then( console.log )*
         // 49
 
2. **Promise.reject***( {message:'Problem'} ).then(console.log)* 
        // {message:'Problem'}
 
3. **Promise.all***( [Promise.resolve(49), Promise.resolve(49) ]).then( console.log )*
        // [49,50]

4. **Promise.race***([Promise.resolve(49),Promise.resolve(49)]).then(console.log)*
         // 49 (first to resolve)
#### 1.2.3 Issues with Promises

Even though Promises help to create more consistent and more reliable asynchronous patterns the issue of indented steps or strages remains and the repeate duse of layered *new Promise((resolve,reject)=>{ .. })* patterns can lead to cumbersome constructs.  A Promise also only passes a single argument to the .then(fn) function so if multiple resolved values need to be retained they have to be handled outside the chain.

###1.3 ES6 Classes and async/await get added to the mix

In Feb 2017 (version 7.6 of Node) **'async' methods** were added to to the supported ES6 class specification.  This guide describes how to use these and other ES6 features to create more elegant and mainatinable asynchronous patterns

1.  Using class structiures data can be passed or cumulated through Promise chains in the **this** of  the newed class
2.  Promises, functions, generators and static method can be mixed in the same structure
3.  **await** keyword allows linear sequences of async processes without need for indenting
4.  Code has enhanced readability
5. 
## 2. Creating ES6 'Bulletproof' asynchronous processes
### 2.1 Overview of pattern

1.  Have each step return a promise  (facilitates unit testing and sharing)
2.  Wrap legacy callback handlers in Promise bodies in **try { .. } catch(e){ resolve(e) }**
3.  Add each step as an **async** method of a 'steps' class
4.  Add a final method which has the sequence logic laid out with **await** statements 
5.  Return a Promise in **.then()** or **catch()** steps of a chain to ensure errors are passed down the chain 
