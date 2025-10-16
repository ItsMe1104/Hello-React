//?? 1) useState() Hook in React :-

import { useState } from "react";

// --> It helps us to create State variables in the component
// --> State variables are those which are always tracked by React and on updation lead to component re-render


//?? What is State :-
// --> React inbuilt object which holds data specific to the component and can change over time


//?? Need for State variables :-
// --> React doesn't allow us to touch the DOM like in vanilla JS
// --> Because React uses the concept of virtual DOM
// --> Hence, if we use normal variables
// --> Then on updating them, the UI won't update automatically even if it uses them.

// --> To make the UI get automatically updated when our variables update , we use State variables


//?? e.g (Won't work) :-

const notes = () => {
  let count = 10;
  const handleClick = () => {
    console.log("Clicked");
    count = count + 1;   // won't update the <h1> tag count
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

//***************************************** */

//?? Defining State variables :-
// --> We need to use the useState() hook
// --> It is use to manage the State

//? Step 1 :-
// --> First, import it as a named import from "react" library

import { useState } from "react";

//? Step 2 :-
// --> We need to pass the initial value of our State variable in the argument of useState()

//?? Step 3 :-
// --> It returns an array with two elements
// 1st element = initial value of State variable
// 2nd element = method to update the value of that State variable

const count_State = useState(0);
const count = count_State[0];
const setCount = count_State[1];


// OR
// --> destructure on the go
const [count1, setCount1] = useState(0);


//?? Naming convention :-
// --> The set() method for updating the value of State variables should start with "set"
// --> The name of the State variable to be followed after "set" in PascalCase

// --> The overall set() method name should in CamelCase

// e.g :-
const [count2, setCount2] = useState(0);
const [greet2, setGreet2] = useState("");
const [hello, setHello] = useState("");
const [abcd, setAbcd] = useState("");
const [show, setShow] = useState(true);



//***************************************** */



//?? Rules of defining useState() :-

// a) It should not be defined inside a conditional statement (if-else or ternary)
// --> Very very bad practice and might give errors

if (true)                              // Very bad practice
  useState(0)

a === 10 ? useState(5) : useState(10)  // Very bad practice


// b) Not even inside any function 
function hello() {                     // Very bad practice
  const [count, setCount] = useState(4)
}



//***************************************** */


//?? Updating values of state variables :-

// --> use the set method that we destructured from useState()
// --> In the argument of that method, pass the updated value

// e.g :-
function handleClick() {
  setCount(7);
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Using useState() with string or number values :- 

// --> Just declare a State variable with String or Number value 
// --> Display that number/string value dynamically in any JSX tag
// --> We can update the value on of that State variable on some event

// e.g :-
// --> Updating String and number values of a State variable on button click

const App1 = () => {
  const [greet, setGreet] = useState("Hello");
  const [count, setCount] = useState(0);
  const handleGreet = () => {
    setGreet(greet + " Hello");
  }

  const handleCount = () => {
    setCount(count + 1);
  }
  return (
    <>
      {/* String */}
      <h1>{greet}</h1>
      <button onClick={handleGreet}>Greet Me</button>

      {/* Number */}
      <h1>{count}</h1>
      <button onClick={handleCount}>Increment</button>
    </>
  )
}



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Using useState() with boolean values :-

// --> To hide and show a component, mainly this pattern is used
// --> It can also be used in dark mode / light mode.

//? e.g :-
// --> Declare a boolean State variable
// --> Now use a button to control its value to true or false on click
// --> On click, just fire an event Handler, which will negate the current value of the boolean variable
// --> Render a component or a tag, only when the boolean is true using conditional operator

const App = () => {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(!show);
  }
  return (
    <>
      {show === true ? <h1>Hi I am visible</h1> : <></>}
      <button onClick={handleClick}>Click Me</button>
    </>
  )
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 5) Concept how useState actually works :-

// If we define a State variable using useState()
const [abc, setAbc] = useState(0);

// --> Now when we use set() method to update them
setAbc(5);

//?? Behind the scenes :-
// --> Directly on calling set(), the value of "abc" variable is not updated
// --> JS even won't allow as it is a const variable

// --> the value of "abc" is updated in React's State object for the abc attribute

React.state = {
  abc: 5
}

// --> Now when React re-renders the component, then in the render phase , it compares
// a) the attribute in the state object
// b) initial value we gave for that State variable

// --> If they are unequal, then React will update the value of the State variable from the State object attribute


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) Concept of prevValue in State Variables :-

// --> The state variables are updated in batches and that too asynchronously

//?? Scenario:-

// count = 0
setCount(count + 1)
setCount(count + 1)
setCount(count + 1)
setCount(count + 1)

//?? Question :-
// --> Will the value of count update by 4?

//? Result :-
// count value updates --> 1
// UI still shows --> 1

//?? Why?
// --> This is because the States are updated in batches and asynchronously
// --> Hence, its not happening like synchronous programming that
// 2nd setState() will get the count updated by the 1st setState()
// 3rd setState() will get the count updated by the 2nd setState() and so on.


//?? Actual thing :-
// --> The actual thing that is happening is that all the setState() methods are getting the same count value
// --> Because of asynchronous nature of State updation.

// --> It is also explained in Section 4 above


//********************************** */

//?? NOTE :-
// --> The count value will be updated based on the last set() method in this scenario
// i.e :-

// count = 0
setCount(count + 1)
setCount(count + 1)
setCount(count + 3)
setCount(count + 4)

//? Result :-
// count value updates --> 4
// UI still shows --> 4


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) Solution for above asynchronous behavior :-

// --> Instead of passing some value
// --> We can pass a callback function as an argument of set() method
// --> Whatever the callback returns will be taken as the updated value for the State variable.


//?? prevState :-
// --> The callback we pass in the set(), will have a inbuilt parameter called prevState
// --> It will contain the value of the State variable before updating the current State
// --> We can use that to set our updated value


// e.g :-

// count = 0;

setCount((prevState) => prevState + 1);
setCount((prevState) => prevState + 1);
setCount((prevState) => prevState + 1);
setCount((prevState) => prevState + 1);

//? Result :-
// count value updates --> 4
// UI still shows --> 4


//?? Behind the scenes :-
// --> We are not directly giving React a new value
// --> We are giving React a function to calculate the new value, based on the latest version of the state

//? Step 1 :-
// --> React doesn’t run the function immediately.
// --> It stores these updates in an internal queue, something like this :-

[
  prev => prev + 1,
  prev => prev + 1,
  prev => prev + 1,
  prev => prev + 1
]

// --> Using prevState, it is specified that whenever the RHS is calculated, LHS should be updated

//? Step 2 :-
// --> Later (before rendering again), React goes through the queue in order.
// --> It starts with the current state = 0

// prev = 0  → prev + 1 = 1
// prev = 1  → prev + 1 = 2
// prev = 2  → prev + 1 = 3
// prev = 3  → prev + 1 = 4

//?? Step 3 :-
// React updates its internal state object with the final value
// --> On re-render, it updates the value of the state variable as 4
