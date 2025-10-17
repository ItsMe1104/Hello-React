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




// ?? When does useEffect runs?
// --> useEffect() always runs on first render anyhow.
// --> i.e after the commit phase of React, when the DOM is ready.


// --> Rest of the times is decided by :-


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

useEffect(() => {
  console.log("Use Effect");
}, [count, count1, count2])    // multiple State variables


// --> Runs after first render 
// --> On any re-render of component caused whenever that State variable / variables are updated


//?? NOTE :-
// --> If multiple State variables cause only single re-render together
// --> Then useEffect() will also be called once only


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
// --> Hence the component will be rendered only once



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) useEffect() vs useState()

// --> useState() helps us to create and manage State
// --> useEffect() is used to monitor State

//?? How ?
// --> By using the State variable in the dependency array
// --> We can monitor when the State variable is updating.


// --> Moreover it helps us to run some functionality on a specific State update each time


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 5) Clean up function in useEffect :-

//?? Unmounting phase :-
// --> i.e when the component is removed from the UI
// e.g :- component gets deleted or component gets swapped with other component during routing

// --> If we want some function to run after the unmounting phase
// --> We can do that using useEffect


//?? How useEffects execute a function after unmounting?
// --> We can return a function from useEffect()
// --> That function will be called only when our component unmounts
// --> This function is also called cleanup function.

useEffect(() => {

  return () => { }     // cleanup function
}, [])


//?? What are cleanup function?
// --> The function we return from useEffect() are cleanup functions
// --> Basically it is used to remove some function after the component unmounts
// --> like setInterval(), eventListeners, etc


// --> This is because these functions are set in memory
// --> And remain in the memory even after the component is unmounted


//?? Solution:-
// --> Hence, we need to clear them once the component unmounts
// --> clear them inside cleanup function in useEffect()


//? NOTE :-
// --> setInterval() is a timer function(), hence we should call it inside useEffect() 

const notes = () => {

  // useEffect()
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Hi");
    }, 1000);

    // cleanup function
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (<></>
  )
}






