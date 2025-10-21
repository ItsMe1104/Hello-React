//?? 1) useRef() hook :-

import { useEffect, useRef } from "react"

//?? Syntax :-
// useRef(a)
// --> It returns an object
// --> Inside the object, we have the "current" property
// --> a = value we store in the "current" property

//?? Note :-
// --> By Default value of "current" property is undefined

// e.g :-
useRef(5)

// Returned object
{
  current: 5
}


//?? Functionality :-
// a) It can create mutable variables which don't re-render the component but persist their values.
// b) To access DOM element directly



//?? How to persist values between renders?
// --> When React re-renders a component
// --> all normal variables inside the component are reset (they don’t keep their old values).
// --> But with useRef, the value you store persists between renders — it’s not lost.

// e.g :-
// --> Make 3 variables (State, normal and useRef)
// --> Put them inside 3 <h1> dynamically
// --> Use 3 buttons to increment their values individually


const notes = () => {

  const ref_variable = useRef(5);
  const [count, setCount] = useState(0)
  let normal_variable = 0

  const handleStateVariable = () => {
    setCount(count + 1);
  }

  const handleNormalVariable = () => {
    normal_variable = normal_variable + 1;
    console.log(normal_variable);
  }

  const handleRefVariable = () => {
    ref_variable.current = ref_variable.current + 1
  }

  return (
    <>
      <h1>State variable :- {count}</h1>
      <button onClick={handleStateVariable}>State Variable Increment</button>
      <hr />
      <h1>Normal variable :- {normal_variable}</h1>
      <button onClick={handleNormalVariable}>Normal variable Increment</button>
      <hr />
      <h1>UseRef variable :- {ref_variable.current}</h1>
      <button onClick={handleRefVariable}>UseRef variable Increment</button>
    </>
  )
}


//? Result :-
//* Updating normal & useRef variables
// --> Incrementing normal and useRef() variables
// --> Increases their initial values (see by console.log)
// --> But those value are not updated in UI
// --> Means they do not re-render the component


//* Updating State variables
// --> Incrementing State variables
// --> Update their values and also in UI


//? --> Since the State variable re-rendered the component

//? a) normal variable
// --> Still didn't update the UI
// --> Got reset to its initial value (no matter how many times we updated it before the re-render)

//? b) useRef() variable
// --> still holds its updated value before the re-render
// --> the UI got updated with updated value
// --> Hence, its value persisted among re-renders

//?? In short :-
// --> all normal variables are reset after re-render
// --> But with useRef, the value we store persists evn on re-renders


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Does component re-render on updating useRef() variables :-

// --> No, on updating useRef() variables, it does not re-render

// e.g :-
//? Will display that when we update the State variable the component re-renders but not on useRef variable
// --> We create a State variable and a useRef variable
// --> We create a useEffect() that will run every time our component re-renders
// --> We create another useRef() variable or State variable for counting re-renders

// --> Create 1 button for both State & useRef variable 
// --> increment them on clicking their buttons


//? For counting re-renders
// a) (if using State variable) then pass the State variable to be updated in the dependency array   
// b) we will not use any dependency array if using useRef variable for counting re-renders


//?? Note :- 
// --> Don't pass the State variable in the dependency array else it will cause infinite renders

//?? How it works?
// --> When the State variable re-renders the component
// --> The useEffect runs and the render-variable from useRef() is updated
// --> But its updated value will be seen in the UI, on the next State update when the component re-renders
// --> But since on the first render by React the useEffect runs and updates the render variable to 1
// --> Hence when the first State update happens 
// --> both State variable value and render variable value shows 1 in UI
// --> even though the value of render variable always stays one ahead of State variable behind the scenes
// --> console it to see


//?? Changes on update of useRef() variable :-
// --> No renders
// --> The actual value is only updated when State variable is updated
// --> Because the component re-renders


// e.g :-
const Notes2 = () => {
  const ref_variable = useRef(0);
  const [count, setCount] = useState(0)
  const count_renders = useRef(0);

  const handleStateVariable = () => {
    setCount(count + 1);
  }

  const handleRefVariable = () => {
    ref_variable.current = ref_variable.current + 1
    console.log(ref_variable.current);
  }

  useEffect(() => {
    count_renders.current = count_renders.current + 1;
  })

  return (
    <>
      <h1>State variable :- {count}</h1>
      <button onClick={handleStateVariable}>State Variable Increment</button>
      <hr />
      <h1>UseRef variable :- {ref_variable.current}</h1>
      <button onClick={handleRefVariable}>UseRef variable Increment</button>
      <br />
      <hr />
      <h1>Renders :- {count_renders.current}</h1>
    </>
  )
}



//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//? 3) Accessing DOM elements using useRef() :-

// --> useRef() allows us to direct access DOM elements


//?? How to extract DOM element from jsx?

// a) Just create a useRef variable with any initial value
const inputEle = useRef(null)   // best practice is null

// b) In the jsx element, use the "ref" attribute
// c) Pass the useRef() variable dynamically inside the "ref" attribute using {}

//  <input type="text" ref = {inputEle} />

//? d) As soon as React sees the "ref" attribute in any JSX element
// --> It immediately updates the "current" property of the useRef() variable with the corresponding DOM Node 

console.log(inputEle.current);


//?? UseCase :-
// --> On the happening of some event, we can style the DOM elements directly


//? e.g 1 :-
// --> Changing the width and font color of input field on button click
// --> Also on button click put the input field on focus

// --> Use the style property like in normal DOM element
// --> Use focus() of style property to focus

const Notes3 = () => {

  const input_ele = useRef("");

  const handleClick = () => {
    input_ele.current.style.width = "300px"
    input_ele.current.style.color = "red"
    input_ele.current.focus();
  }

  return (
    <>
      <h1>Width change on click</h1>
      <input type="text" ref={input_ele} />
      <button onClick={handleClick}>Click Me</button>
    </>
  )
}




//? e.g 2 (Not recommended):-
// --> Getting whatever we type on the input field in UI

const Notes4 = () => {
  const input_ele = useRef("")
  const [inputVal, setInputVal] = useState("");
  useEffect(() => {
    console.log(input_ele.current.value);
  })
  return (
    <>
      <input type="text" name="" id="" value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value)
        }} ref={input_ele} />
      <h1>{inputVal}</h1>
    </>
  )
}


//?Note :-
// --> We are using onChange() & value attribute inside <input>
// --> So that the State updates and component re-renders
// --> Because useEffect() will only run on re-render
// --> Just inputting on input field won't re-render
