//?? 1) Difference between functions and hooks :-

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


//?? 2) forwardRef in React :-

// --> It is not a hook, but a normal function provided by React

// --> But we might see custom hooks named useForwardRef
// --> Which are mainly used to modify the way we use refs


//?? Use?
// a) forwardRef is used to pass a "ref" (reference) from a parent component down to a child component.
// --> "ref" attribute works in jsx elements only
// --> They cannot get passed through props in a child component tag

//    <input ref={abc} />     correct
//    <Child ref={abc} />     wrong (will give error) 


//? e.g :-

// Child
const Input = () => {
  return
  <>
    <input />
  </>
}


// Parent
const Parent = () => {
  const inputRef = useRef();   // reference

  return (
    <>

      <Input ref={inputRef} />  // React will throw error
    </>
  )
}


//?? Problem?
// --> ref is not a prop
// --> it only works with jsx elements as an attribute
// --> or components using forwardRef()




//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 3) Why passing ref to child component?

// --> Sometimes a parent component wants to access a DOM element form child component
// --> Hence it wants a reference to the one of DOM element from Child






