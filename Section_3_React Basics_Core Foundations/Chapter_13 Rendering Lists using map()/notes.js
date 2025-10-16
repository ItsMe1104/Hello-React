//?? 1) map() in JS :-

// --> map() creates a new array from calling a function for each array element & transforming them.


// e.g :-
const arr = [1, 2, 3, 4, 5];
const newArr = arr.map((ele, idx) => {
  return ele * 5;
})

console.log(newArr);    // [5,10,15,20,25]



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 2) map() in React :-

// --> In JS, map() returns an array that can comprise of any data type in JS including arrays and objects


//? React :-
//? a) In React, map() can return an array that can comprise of jsx elements as well

//? b) React inside a component can either render individual jsx elements

// e.g :-
const notes = () => {
  return (
    <div>
      <h1>Hi</h1>
      <div className="">
        <p>Hello</p>
      </div>
    </div>
  )
}



//? c) React inside a component can also render the JSX elements from inside an array directly

// --> React extracts & renders the JSX elements from an array automatically
// --> We don't have to extract & render them manually.

// e.g :-
const notes2 = () => {
  return [
    <h1>H1</h1>,
    <h2>H2</h2>,
    <h3>H3</h3>,
    <p>P</p>,
    <div>Div</div>
  ]
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 3) Using data from array & rendering as list items :-

// --> Use the map() to loop on the array elements & transform them into <li> items containing those elements


// --> Inside the <ul> or <ol> perform this operation
// --> Since it is a JS operation, enclose it in curly braces

//? NOTE :-
// --> While returning <li> from map() which is a JSX, we will fill array elements which belongs to JS
// --> Hence, we have to wrap the array elements inside {}

const notes3 = () => {
  const arr = [1, 2, 3, "apple", "orange", false]

  return (
    <div>
      <ul>
        {
          arr.map((ele) => {
            return <li>{ele}</li>
          })
        }
      </ul>
    </div>
  )
}




//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 4) key attributes in <li> items

// --> Whenever we are rendering <li> items, we should always provide unique keys to them using "key" attribute.


//?? Why keys?
// --> Keys allow React to keep track of elements.

// --> This way, if an item is updated or removed, only that item will be re-rendered.

// --> Else React will render all the <li> items even if only one of them is updated

//?? NOTE :- Keys must be unique among siblings, but they don't have to be unique across the entire application.


//?? What values for keys?
// --> The key should be a unique ID assigned to each item.
// --> As a last resort, we can use the array index as a key.
// --> Since, we need to assign keys dynamically using variables which is JS inside JSX
// --> Hence, we need to enclose the JS variables inside {}


const notes4 = () => {
  const arr = [1, 2, 3, "apple", "orange", false]

  return (
    <ul>
      {
        arr.map((ele, idx) => {
          return <li key={idx}>{ele}</li>
        })
      }
    </ul>
  )
}