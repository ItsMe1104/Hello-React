//?? 1) Library, Package and Module in terms of React :-

//? Library :-
// A collection of code providing UI features
// e.g :- React itself

//? Package :-
// --> How that library is distributed (via npm)
// e.g :- The "react" npm package

//? Module :-
//--> A file or bundle that exports code to be imported
// e.g :- The imported "react" module in your JS file for using hooks, etc

// --> React is a library, published as an npm package ("react"), and imported as a module.


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Basics of useState() hook :-

// --> It helps us to create State variables in a functional component
// --> These state variables are tracked and their changes are updated in the UI

//?? How to use :-
// --> import it from "react" (package) as a named import

import { useState } from "react";


//************************ */


//?? Basics of useState()

//? a) It is a function 


//? b) It receives an argument 
// --> The argument serves as the initial value of our state variable.
// --> It can be any data type including array or object.

useState(0);
useState("");
useState(true);
useState([]);
useState({});


//? c) It returns an array
// --> 1st element of the returned array is the current value of our State variable

const count_arr = useState(0);
const count = count_arr[0];                // 1st element 

// --> 2nd element of the returned array is the method to update it

const setCount = count_arr[1];

//? NOTE :-
// --> Best practice is to name this variable starting with set, followed by State variable name in Pascal case



//****************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Destructuring in useState() array :-

// --> Instead of extracting the current value and update function separately from array returned by useState()

// --> We can destructure it directly while declaring useState().

// e.g :-

// Old way :-
const count1_arr = useState(6);
const count1 = count1_arr[0];
const setCount1 = count1_arr[1];

// Industry way :-
const [count2, setCount2] = useState(6);


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) How to update the State variable and the UI :-

// --> Using the update State function given by useState()
// --> Just call the update State function and pass the updated value inside as argument

const [count3, setCount3] = useState(9);

setCount3(5);
// or
setCount3(count3 + 1);


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 5) When do we actually update the State variables

// --> On the happening of some event
// --> Inside the handler functions

// e.g :-
// Updating the count inside <h1> on every click of button

const notes = () => {
  // State variable -> count
  const [count, setCount] = useState(0);

  // event handler function
  const handleCount = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleCount}>Click Me</button>
    </div>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Why do we need State variables?

// --> React doesn't allow us to touch or update the DOM using normal variables as it use the concept of VDOM
// --> Even though the value of normal variables might update but it won't reflect in the UI
// --> For seeing the updates in the UI, we have to use State variables
// --> Whenever the State variables updates, React re renders the whole component and a new VDOM is created
// --> Then the new VDOM and old VDOM are compared through diffing algo
// --> Then that difference is only updated in the actual DOM