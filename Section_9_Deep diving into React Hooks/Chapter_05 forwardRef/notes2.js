
//??  5) Limitation of forwardRef()

import { useEffect } from "react";

// --> React only allows passing one ref through forwardRef()
// --> Hence the second parameter of the Child component can hold only one ref


//?? Solution (Not good practice) :-
// --> Pass one ref normally and others via props  or
// --> Pass every ref as props

<Child6 ref={inputRef1} abc={inputRef2} def={inputRef3} />

// --> In the child component
// --> Extract the other refs passed as props normally using destructuring
// --> Inside the JSX elements of Child component
// --> Pass those extracted props as value to the "ref" attribute dynamically using {}

//? e.g :-
// <input type="text" ref={ref} placeholder="Input 1" />
// <input type="text" ref={props.abc} placeholder="Input 2" />
// <input type="text" ref={props.def} placeholder="Input 3" />




// Parent
const Parent6 = () => {
  const inputRef1 = useRef(""); //reference for 1st input of child
  const inputRef2 = useRef(""); //reference for 2nd input of child
  const inputRef3 = useRef(""); //reference for 2nd input of child

  useEffect(() => {
    // checking refs once component is mounted
    console.log(inputRef1.current);
    console.log(inputRef2.current);
    console.log(inputRef3.current);
  }, [])

  // Passing inputRef1 as ref and others as props
  return (
    <>
      <h1>Input Value :- {name}</h1>
      <Child6 ref={inputRef1} abc={inputRef2} def={inputRef3} />
    </>
  )
}


// Child
const Child6 = forwardRef((props, ref) => {
  console.log("From Child", props, ref);

  return (
    <>
      <input type="text" ref={ref} placeholder="Input 1" />
      <input type="text" ref={props.abc} placeholder="Input 2" />
      <input type="text" ref={props.def} placeholder="Input 3" />
    </>
  )
})