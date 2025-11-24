//?? 1) Right ways to call API inside component :-

// --> We should never call an API directly inside a component

//?? Reason 1 :- 
// --> Because then the API request will be triggered on every render.
// *) state change
// *) prop change
// *) parent-re-renders
// *) context updates


//?? Reason 2 (Infinite API calls) :-
// --> If we are updating state using the data fetched by an API call
// --> The State update will re-render the component and API will be called again
// --> Since API call will return a non-primitive data type with same data but different reference
// --> Hence, state wil again be updated & re-render happens
// --> Again the API call is made & the cycle continues


//?? Correct place :-
// --> Inside useEffect()
// i) either on first render using empty dependency []
// ii) or on the renders created by a specific dependency


// e.g :-

useEffect(() => {
  // API call
}, [])

useEffect(() => {
  // API call
}, [count])


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) API call using fetch() :-

//?? fetch :-
// --> It is a Browser API that makes an HTTP request to web server
// --> It takes a URL i.e endpoint as argument
// --> It returns a Promise, but the resolved value is not actual data but a Response Object

fetch("https://api.example.com/users")


//?? What happens when we call fetch() ?
// --> The Browser creates a network request object including :- URL, HTTP method, headers, credentials, etc

//?? How to extract the Data from fetch() :-
// --> fetch() is asynchronous, it returns a Promise instantly.
// --> Browser starts the HTTP request in a separate background thread
// --> Once the Browser receives HTTP response, it forms a Response object
//?? The Promise returned by fetch() resolves and provides this Response object (it is not actual data)

// Response object contains :-
// i) status(200, 404, 500)
// ii) headers
// iii) ok flag
// iv) URL info
// v) body / body stream (data arriving in chunks)


//?? Step 1 (Extract response object using then()):-

fetch("https://api.example.com/users")
  .then((res) => {
    // res is the response object
  })

// ==> then() takes a callback as argument
// ==> then() always returns a Promise
// ==> even if we return something, it will wrap it inside a Promise & return it



//?? Step 2 (Parse chunks of data into JS object)
// --> Use .json() on the Response object
// --> Because the body is a stream (data arriving in chunks)
// --> .json() reads that stream & parses it into JS object

//?? NOTE :-
// --> json() itself is asynchronous & returns a Promise
// --> & once the JS object is ready, the promise returned is resolved with the JS object
// --> Hence return the returned Promise from .json()
// --> So that we can extract the JS object it using another .then()

fetch("https://api.example.com/users")
  .then((res) => {
    return res.json();    // Parsing stream to JS object
  })



//?? Step 3 (Extract Js object using then()):-
// --> Since .json() also returned a Promise
// --> Extract the JS object from its resolved state using .then()

const answer = ""
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    return res.json();    // Parsing stream to JS object
  })
  .then((data) => {
    answer = data;    // Actual data
  })


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Returning anything from .then() :-

//?? No matter whatever we return from then()
// i) It will always return a Promise with the returned value wrapped inside it.
// ii) If we want the returned value directly, we can access it as argument of next then()

//?? Rule :-
// --> Returning something inside .then() does NOT return it outside
// --> It returns it to the next .then().


//?? e.g :-

const jsonRes = fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    return res.json();
  });

const answer1 = jsonRes.then((data) => {
  return data;
});

// Expectation :- Printing Response object
console.log(jsonRes);       // Promise { <pending> }

// Expectation :- Printing data
console.log(answer1);      // Promise { <pending> }


//************************* */

//?? Why neither of them prints the data?
// --> Any console.log() printing Promise & outside .then() or without await will show <pending>

//? jsonRes got Promise { <pending> }
// --> Because API request is asynchronous
// --> console.log() runs immediately
// --> The API response arrives later

//? answer got Promise { <pending> }
// --> .then() doesn't wait for the earlier Promise (jsonRes) to resolve before returning something.
// --> It immediately returns a NEW Promise — and that Promise is also <pending>

// ==> It depends on jsonRes, and since jsonRes is <pending>, answer is <pending> too


///**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) How to get data instead of Promise from .then() :-

// --> Proper way to use Data :-

// a) Use or print inside .then() only

fetch("ENDPOINT")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });


//********************************** */


// b) Use of async await
// --> To store data in a variable without using .then()

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  console.log(data);
}
getData();

//?? NOTE :-
// --> async fn() is necessary, else the code will freeze due to await, till we get the response


//********************************** */


//?? In React State :-

// --> Directly updating State inside .then()

const [data, setData] = useState(null);

useEffect(() => {
  fetch("ENDPOINT")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setData(data)
    });
}, []);


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 5) Error Handling using fetch() and then()

// --> If we get any error while getting the response
// --> The promise returned from fetch() will be rejected

//?? Catching the error :-
// --> We can catch the error as the argument of .catch()
// --> That Error object received as argument will have a property as "message"
// --> We can display it on UI

//?? Rules of using catch()
// --> There can be multiple then() but only 1 catch() in an optional chaining
// --> Attach the catch() at last of all the then() are in the chain

fetch('/api/users')
  .then(response => response.json()) // parse JSON body
  .then(data => {
    console.log('users', data);
  })
  .catch(error => {
    console.error('network or parsing error', error);
  });


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Rules about throwing Error :-

// --> fetch() rejects only if there is a network failure (no internet, DNS error, CORS blocked, aborted).
// --> Even if server returns 404 / 500, fetch() still resolves.