//?? 1) useEffect() Hook :-

import { useEffect } from "react";

// --> It allow us to perform side effects in your components

//?? sideEffect :-
// --> It is any process that affects something outside the component’s normal rendering process.
// --> Some examples of side effects are:
// a) fetching data
// b) directly updating the DOM
// c) timers
// d) updating the document title
// e) Inserting an Event handler for window object
// f) Store data in localStorage


//***************************** */


//?? Pure function

//? Pure function :-
// a) Takes input -> returns output
// b) Does not modify anything outside itself
// c) Always gives the same result for the same input

function add(a, b) {
  return a + b; // no side effect
}


//?? Need of useEffect() :-
// --> React's rendering process is pure, given the same state and props, the UI should be same
// --> The side effects don't directly belong to rendering process
// --> That’s why React provides the useEffect hook — a safe place to run them after the DOM is rendered.


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 2) useEffect Syntax :-

// --> It is called inside a component

useEffect(a, b)
// a --> callback function
// b --> dependency array 

//--> The callback, will be executed when the useEffect() is called by React.


useEffect(() => {
  console.log("Inside useEffect");
}, [])




// ?? When is the useEffect called?
// --> useEffect() will always be called after the commit phase of React, when the DOM is ready


//************************ */

//? Case 1 :-
// When no dependency array is passed

useEffect(() => {
  console.log("Use Effect");
})

// --> Runs after first render 
// --> And every component re-render


//** ********************** */


//? Case 2 :-
// --> When empty dependency array is passed

useEffect(() => {
  console.log("Use Effect");
}, [])

// --> Runs only after first render 
// --> Not on any re-render


//** ********************** */

//? Case 3 :-
// --> When some State variable is passed inside dependency array 

useEffect(() => {
  console.log("Use Effect");
}, [count])

// --> Runs after first render 
// --> On any re-render caused whenever that State variable is updated


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Multiple useEffects & multiple State variables in dependency array

//--> We can have multiple useEffects in our component
//--> They can be of same or different type

const App = () => {

  useEffect(() => { }, [])
  useEffect(() => { }, [count])
  useEffect(() => { }, [])

  return (<> </>)
}


// --> We can pass multiple State variables in the dependency array
// --> The same useEffect will be called when either of the State variable changes


//?? Note :- if multiple variables update at the same time, still useEffect() will be executed once only
// --> This is because React updates the State variables in batches



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */











