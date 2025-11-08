//?? 1) What is Memoization :-

//--> Memoization is a performance optimization technique
//--> Here we store the result of expensive fn() calls &
//--> Return the cached result when same input occurs again


//?? Why use Memoization?
//--> Speeds up performance by avoiding redundant calculations
//--> Useful in heavy computation, recursion, React components (useMemo())


//?? Example :-
// --> Let's say we create a f() "slowAdd" which will accept two inputs
// --> After a loop of 100M iterations, it will return the sum of the two inputs

function slowAdd(a, b) {
  for (let i = 0; i < 1e8; i++) { }   //1e8 -> 1 * 10^8
  return a + b;
}

// Exponential notation in JS
// --> 1en = n zeros behind 1

// e.g :-
1e8 = 100000000
1e3 = 1000
1e5 = 100000


// ************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************


//?? 2) Calculating time taken for our slowAdd() :-

// --> We need to use console.time()
// --> It is used to start a timer that can track the  block of code


//**************** */


// ?? How to log time using console.time() :-
// a) Start the timer :-
// --> Call console.time() & provide a unique string label as an argument.

console.time("myOperation");


// b) Execute the block of code or f() call:-
// --> Place the code immediately after the console.time()

console.time("myOperation");
slowAdd(3, 4);


// c) Stop the timer :-
//--> Call console.timeEnd() with the same label used to start the timer
//--> It will stop the timer & log the time in milliseconds

console.time("myOperation");
slowAdd(3, 4);
console.timeEnd("myOperation");



//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 3) Applying memoization to our function :-

// --> First we will create another parent function
// --> Inside our parent f() we will return our function to be memoized as an anonymous function
// --> Inside the parent f() we will create an object for caching

function memoizedAdd() {
  const cached = {}

  return function (a, b) {
    for (let i = 0; i < 1e8; i++) { }   //1e8 -> 1 * 10^8
    return a + b;
  }

}


//?? Inside internal function :-
// --> We will create a unique key based on the inputs
// --> If that key is already present in the cached object
// --> Return its value from the object itself

// --> If not, then execute the expensive operations
// --> Just before returning the final value, store it in the cache as a value to the unique key we created
// --> Then return the answer 


function memoizedAdd() {
  const cached = {}

  return function (a, b) {
    const key = `${a}_${b}`        // 5_7 or 1_2, etc

    if (key in cached) {
      return cached[key];
    }

    // key not found in cache
    for (let i = 0; i < 1e8; i++) { }
    const result = a + b;

    // Storing new key value in cache before returning
    cached[key] = result;
    return result
  }

}


const add = memoizedAdd(); // will create the cache object & return the internal function inside 'add' variable

console.log(add(5, 10));
console.log(add(3, 2));
console.log(add(7, 1));
console.log(add(5, 10));


//***************************** */


//?? NOTE (using => key in cached) :-
// --> Instead of using 
if (cached[key]) { }

// --> Use 
if (key in cached) { }

// --> Why?
// --> Because if the input is 0,0
// --> Result will be 0 which is a falsy value
// --> While checking if(cached[key]) ===  if(0)
// --> Which will always return false




//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Checking the time consumed by our memoized f() :-

const add1 = memoizedAdd();


console.time("Memoized");
console.log(add1(5, 10));
console.timeEnd("Memoized");


console.time("Memoized Again");
console.log(add1(5, 10));
console.timeEnd("Memoized Again");


//Result :-
// --> The time consumed is much less than what was consumed when the f() was not memoized


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 5) How closure is used here?

// --> A closure allows the inner function to remember & access variables from its parent function
// --> Even after the parent function has finished executing.


//?? Note :-
// --> Only those parent's variables that the inner f() uses, will form a closure


//?? Here :-
// --> The inner function (returned function) keeps accessing cached object
// --> Even though memoizedAdd() has already finished running and stored the result in the variable


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//? 6) Why created cached object in parent f() :-

// --> Why we created cached object in parent fn()
// --> Why we returned the inner f() from parent fn()
// --> We could have directly ommitted the parent fn() and created the cached object in internal fn() only


//?? Solution :-
// --> Because we want the cached object to persist between every f() call of the returned function.
// --> If we create it inside the internal f()
// --> Then every fn() call will create its own cached object and nothing is stored
// --> And the same cached object cannot be used or manipulated by every other f() call


//?? Here :-
// a) The cached object is created one time when memoizedAdd() is called

// b) Every future call to the inner function can access & update the same cached object
