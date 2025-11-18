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

//?? 5) Nullish coalescing operator (??) :-

// --> It is used to provide a default value only when the left side is null or undefined
// --> It can be used as a shortcut in place of ternary operator

// e.g :-
a ?? b

// --> a if a is NOT null or undefined
// --> b otherwise