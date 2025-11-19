//?? 1) Query Strings :-

// --> part of a URL that come after the ?
// --> store key–value data

//?? e.g :-
// https://example.com/products?page=2&sort=price

// Query String :-
// ?page=2&sort=price

// key :- page, sort
// value :- 2, price


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 2) useSearchParams() Hook :-

// --> This hook is used to
// a) Read query params
// b) Update query params

//-> Hence it helps us to read or update the parameters from the URL itself


//? SYNTAX :-
const [a, b] = useSearchParams();

//==> No Arguments

//==> It returns two values
// --> a = object with get() to read query strings
// --> b = set() to update query parameters

//?? Its syntax is same as useState()


//?? NOTE :-
// --> Whenever we set the query parameters
// --> React re-renders the component

//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 3) Reading query params :-

//?? Steps :-
// a) 
// import "useSearchParams" as named import from "react-router-dom" package

import { useSearchParams } from "react-router-dom"

// b)
// ==> Use the get() of the object returned by useSearchParams()
// ==> Pass the key (as string) from query string inside get(), whose value we want to get

//?? NOTE :-
// --> get() will return the value in string format


//?? e.g :-
const [searchParams] = useSearchParams();

const page_no = searchParams.get("page");
const sorting = searchParams.get("sort");


// e.g :-
const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page_no = searchParams.get("page");
  const sorting = searchParams.get("sort");

  return (
    <>
      <h1>Products</h1>
      <p>Page : {page_no}</p>
      <p>Sort : {sorting}</p>
    </>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 4) Updating query params in the URL :-

// --> Update it on the happening of some event (e.g :- button click)

//?? Steps :-
// --> Use the set() method provided by useSearchParams() hook

// --> Pass an object, and set the key-value pairs inside the object
// --> If we want some key's value to remain the same, just pass the key

setSearchParams({ page: 4, sort: "price" });
// or
setSearchParams({ page: 4, sort });


//?? Note :-
// --> If we don't pass any key of query string that is already present in the URL
// --> Then it will be omitted


// e.g :-
const App2 = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page_no = searchParams.get("page") || 1;
  const category = searchParams.get("category") || "all";

  function handleClick() {
    setSearchParams({
      page: 4, category: "electronics"
    })
  }
  return (
    <>
      <h1>Products</h1>
      <p>Page : {page_no}</p>
      <p>Category : {category ? category : "All"}</p>
      <button onClick={handleClick}> Click Me</button>
    </>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 5) How to preserve other parameters while setting a new one?

//--> While setting the new object in set()
//--> We need to merge it with the old object 
//--> such that only the new key-value pair is added or updated, rest remain the same
//--> Use the spread operator 


//?? About searchParams object returned by useSearchParams():-
// --> React router creates a special built in object called searchParams
// --> It is an instance of URLSearchParams
// --> It internally stores all the key-value pairs in an array but hidden ( cannot see in console.log)
// --> To extract we have to use get() or entries()


//?? entries()
// --> It returns a special Iterator Object with all key-value pairs from array
// --> It can be iterated using for-of loop

// e.g :-
const fruits = ["Banana", "Orange", "Apple"];

for (let x of fruits.entries()) {
  console.log(x)
}

//?? Output
// [0, 'Banana']
// [1, 'Orange']
// [2, 'Apple']

//?? NOTE :-
// --> It also somewhat stores these mini arrays inside an array only


//*************************** */


//?? Object.fromEntries()
// --> creates an object from a list of key/value pairs.

const fruits2 = [
  ["apples", 300],
  ["pears", 900],
  ["bananas", 500]
];

const myObj = Object.fromEntries(fruits2);
console.log(myObj);

// Output :-
// { apples: 300, pears: 900, bananas: 500 }


//?? Hence, the 2D array we received from entries() can be converted to an object of key-value pairs
// --> Using Object.fromEntries()


//To save the old object
const current = Object.entries(searchParams.entries());


//************************ */


//?? Final Solution :-
const current2 = Object.entries(searchParams.entries());
setSearchParams({ ...current2, new_Key: newValue })


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 6) Nullish coalescing operator (??) :-

// --> It is used to provide a default value only when the left side is null or undefined
// --> It can be used as a shortcut in place of ternary operator

// e.g :-
a ?? b

// --> a if a is NOT null or undefined
// --> b otherwise