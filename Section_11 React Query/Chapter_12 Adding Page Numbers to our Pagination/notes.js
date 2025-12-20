//?? 1) Adding Page Numbers to our Pagination :-

//! Step 1 (Creating equal no. of buttons as pages) :- 
//  --> Total buttons = Total pages = Total records / limit
//  --> Total no. of records come from "total" State variable
//? --> Math.ceil(total/limit)


//?? Why Math.ceil() ?
// --> So that it gives one page extra if leftover remainder products are left


//? How to create those many buttons?

// --> We can create buttons by looping using a map
// --> We just need an array with no. of element = total pages
// --> To return those many buttons


//! Option 1 (Using Array()):-
// Array(a)   a is always an integer
// Array(5)  --> Makes 5 elements with empty slots (but cannot be used)
// [...Array(5)] --> fills those empty spaces with "undefined"

[undefined, undefined, undefined, undefined, undefined]

{
  [...Array(Math.ceil(total / 10))].map((item, idx) => {
    return <button key={idx + 1}>{idx + 1}</button>
  })
}

// --> Remember to use Math.ceil() as it gives an integer



//! Option 2 (Array.from())
// --> Array.from() is a static property of the JavaScript Array object
// --> Use it with Array only, with normal array it returns undefined


//?? What is Array.from() ?
// --> It creates a real array from something that is array-like or iterable.
// e.g :-
// arguments,NodeList (from querySelectorAll), Set, Map, Strings



//?? How to create dummy array?
// --> Pass an object with length property & specify the length value

Array.from({ length: 4 }) // [undefined, undefined, undefined, undefined]


//?? Syntax :-
// --> Array.from(source, mapFn?, this)
// source = source from which to create array
// mapFn = To map on the elements of the array created
// this = value to use as "this" for map()

// --> Hence, either use the inbuilt map() or normal map()

{
  Array.from({ length: Math.ceil(total / limit) }, (_, idx) => {
    return <button key={idx + 1} > {idx + 1}</button>
  })
}
// OR 
{
  Array.from({ length: Math.ceil(total / limit) }).map((item, idx) => {
    return <button key={idx + 1} > {idx + 1}</button>
  })
}




//! Option 3 (Using Normal array and for loop ):-
// --> Initialize an empty array
// --> With the help of for-loop, enter dump elements
// --> Use map() to loop over the array and create the buttons


//**************************** */


//! Step 2 (Add the onClick Handlers to every button):-
// --> Add the onClick handlers to every generated button
// --> Such that when clicked, we will change the page State to that button's no.   (index+1)

//? NOTE:-
// --> Make sure that the page is updated only when the button we are clicking != current page
// --> Hence, there is no point of fetching & rendering again

if (page !== idx + 1)
  setPage(idx + 1);


// E.g :-
{
  [...Array(Math.ceil(total / 10))].map((item, idx) => {
    return <button onClick={() => {
      if (page !== idx + 1)
        setPage(idx + 1)
    }}>{idx + 1}</button>
  })
}

// --> Once the page is updated, again the API call will be made and products will be updated





//! Step 3 (Highlight the current page button):-
// --> The user should get a glimpse of the current page through the no. buttons
// --> Whichever button no. matches the current page, highlight it


//?? Option 1 :-
// While creating the buttons, give an inline style for font-weight
// --> Inside that give a condition such that if button no. is matching the current page
// --> If YES, then , else make the font as bold else normal

{
  [...Array(Math.ceil(total / 10))].map((item, idx) => {
    return <button style={{ fontWeight: page === idx + 1 ? "bold" : "normal" }} onClick={() => {
      if (page !== idx + 1)
        setPage(idx + 1)
    }}>{idx + 1}</button>
  })
}


//?? Option 2 :-
// --> While creating the buttons, check if their no. is matching the current page inside the className
// --> If YES, then add a class "current", else don't add
// --> Style the elements with class "current" with a different background color.

{
  [...Array(Math.ceil(total / 10)).map((_, idx) => {
    return <button className={idx + 1 == currentPage ? "current" : ""} onClick={() => {
      setCurrentPage(idx + 1)
    }} key={idx}>{idx + 1}</button>
  })]
}


//CSS file :-
// .current{
//   background-color: rgb(220,220,220)
// }



