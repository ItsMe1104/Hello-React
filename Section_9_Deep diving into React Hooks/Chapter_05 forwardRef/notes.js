//?? 1) Difference between functions and hooks :-

import { forwardRef, useState } from "react";

//? Functions :-
// --> A function is just a normal JavaScript function.
// --> In React we also have functional components, that return some jsx.

// So, in React a function is :-
// a) Normal JS functions → perform logic & return values.
// b) Functional components → perform logic & return JSX.



//?? Hook :-
// --> A Hook is a special function provided by React.
// --> It lets our functional component use React’s internal features like:

// a) State               → using useState
// b) Lifecycle methods   → using useEffect
// c) Refs                → using useRef
// d) Context             → using useContext
// etc

// --> All hooks are function
// --> But all functions are not hooks.


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Requirement :-

// --> Sometimes a parent component wants to access a DOM element from child component
// --> Hence it wants a reference to the one of DOM element from Child
// --> Passing reference created by useRef() to the DOM element present on itself is fine

// But

//? We cannot pass the reference created through useRef() directly from parent to child component as a prop


// e.g :-

// Child
const Child = (props) => {
  return
  <>
    <input />
  </>
}

// Parent
const Parent = () => {
  const headRef = useRef("");  // reference for its own <h1>
  const inputRef = useRef(""); //reference for input of child
  return (
    <>
      <h1 ref={headRef}>Hello</h1>   // fine
      <Child ref={inputRef} />  // React will throw error
    </>
  )
}


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) forwardRef in React :-

// --> It is not a hook, but a normal function provided by React

//? NOTE: - we might see custom hooks named useForwardRef


//?? Use Case?
// a) forwardRef is used to pass a reference from a parent down to a child component.
//--> "ref" attribute works in jsx elements for same component
//--> They cannot get passed as props in a child component

//    <input ref={abc} />     correct
//    <Child ref={abc} />     wrong (will give error)




//?? Solution :-

//?? Importing :-
//--> Import forwardRef as named import from react package

import { forwardRef } from "react";


//?? Step 1 :-
// --> Wrap the Child component's arrow function / anonymous function with forwardRef()
// --> As if passing passing the child component as a argument to forwardRef()

const Child2 = forwardRef(() => {
  return (
    <></>
  );
})



//? Step 2:-
//--> Now pass the ref attribute inside parent to the Child component tag

const Parent2 = () => {
  const inputRef = useRef(""); //reference for input of child
  return (
    <>
      <Child ref={inputRef} />  // React will throw error
    </>
  )
}



//?? Step 3 :-
// --> Receive the second parameter inside our child component as "ref"
// --> Name of that argument can be anything ("ref" is standard)
// --> First parameter is always for props

const Child3 = forwardRef((props, ref) => {
  return (
    <></>
  );
})




//?? Step 4 :-
// --> Use the "ref" attribute inside the DOM element of Child component
// --> Pass that second argument dynamically using {} as the value to "ref" attribute

const Child4 = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
    </>
  );
})



//?? Step 5 :-
// --> Now the DOM element inside the child component will get referred inside the useRef() variable of Parent
// --> Use that DOM element using .current property of useRef() variable


const Parent3 = () => {
  const inputRef = useRef(""); //reference for input of child
  console.log(inputRef.current);
  return (
    <>
      <Child ref={inputRef} />
    </>
  )
}


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Passing props and ref together :-

//--> Passing props & ref together from Parent to Child component
//--> While passing props we are using the concept of Lifting the State Up (Read notes2.js of Chapter 15 of Section 3)


// Parent
const Parent6 = () => {
  const [name, setName] = useState("")

  const inputRef = useRef(""); //reference for input of child
  const inputHandler = (e) => {
    setName(e.target.value)
  }

  console.log(inputRef.current);

  return (
    <>
      <h1>Input Value :- {name}</h1>
      <Child6 ref={inputRef} callback={inputHandler} />
    </>
  )
}


// Child
const Child6 = forwardRef((props, ref) => {
  console.log("From Child", props, ref);

  return (
    <>
      <input type="text" ref={ref} onChange={props.callback} />
    </>
  )
})


//? What is happening?
// --> Here, first the useRef() variable is updated with "" as soon as the Parent is getting mounted
// --> It does not immediately gets updated with the <input>

// --> Then the same empty string is passed as "ref" to the Child
// --> Once the Child is also mounted
// --> React updates the useRef() variable to the <input> once both the Parent and Child are mounted
// --> But it is updated in the Child only when the next State Change happens




//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Using DOM element of Child inside Parent using useRef()

// --> Create two buttons
// a) When clicked will focus on the input field from child
// b) When clicked will clear the input field from child


//? Solution :-
// --> Once the Parent and Child is mounted
// --> The parent has the access of <input> from child
// --> Hence we can use the buttons to manipulate the <input>

// Parent
const Parent7 = () => {
  const [name, setName] = useState("")

  const inputRef = useRef(""); //reference for input of child
  const inputHandler = (e) => {
    setName(e.target.value)
  }

  console.log(inputRef.current);

  return (
    <>
      <h1>Input Value :- {name}</h1>
      <Child7 ref={inputRef} callback={inputHandler} />

      <button onClick={() => {
        inputRef.current.focus();
      }}>Focus Input</button>
      <button onClick={() => {
        inputRef.current.value = ""
      }}>Clear Input</button>
    </>
  )
}

//?? Note :-
//--> since we are not using "value" attribute inside <input>, hence we can manipulate its value using useRef() reference
//--> But it will not be updated in the "name" variable of UI
//--> For that just use the set() to update it to "" inside clear button callback


// Child
const Child7 = forwardRef((props, ref) => {
  console.log("From Child", props, ref);

  return (
    <>
      <input type="text" ref={ref} onChange={props.callback} />
    </>
  )
})


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//??  5) Limitation of forwardRef()

// --> Continued in notes2.js