
//??  5) Limitation of forwardRef()

// --> React only allows passing one ref through forwardRef()
// --> Hence the second parameter of the Child component can hold only one ref


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? Solutions to above problem :-

//?? Solution 1 (Pass other refs as props) :-
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


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? Solution 2 (Passing object as a ref to Child):-

//--> Pass an empty object as a ref Variable from Parent to Child

//--> Use forwardRef() in Child to receive that ref
//--> Receive that "ref" inside the Child component as second argument

//--> Inside the child component define the properties of that ref object as "null"
//--> These properties will store our JSX elements from child

ref.current = {
  first: null,
  second: null
};

// --> In the jsx elements, use the "ref" attribute and pass a callback
// --> The first argument of that callback will get the DOM node of that jsx element itself
// --> Inside the callback assign the properties of our "ref" object to the respective DOM nodes

< input type="text" name="Input1" ref={(ele) => { ref.current.first = ele }} />

// --> Repeat this for each JSX element we want our Parent to access
// --> Once both the Parent and Child component mounts
// --> The parent will have access to the respective JSX elements from the child inside its useRef() object

// --> Check that in useEffect()
useEffect(() => {
  console.log(refObj.current.first);
  console.log(refObj.current.second);
}, [])


//****************** */

// Whole example :-

const Parent = () => {
  const refObj = useRef({})
  useEffect(() => {
    console.log(refObj.current.first);
    console.log(refObj.current.second);
  }, [])

  return (
    <>
      <Child ref={refObj} />
    </>
  )
}


const Child = forwardRef((props, ref) => {
  ref.current = {
    first: null,
    second: null
  }
  return (
    <>
      <input type="text" name="Input1" ref={(ele) => { ref.current.first = ele }} />
      <input type="text" name="Input2" ref={(ele) => { ref.current.second = ele }} />
    </>
  )
})

