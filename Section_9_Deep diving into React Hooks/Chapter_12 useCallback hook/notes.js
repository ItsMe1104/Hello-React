//?? 1) useCallback() hook :-

// --> It caches the function definition/reference so that function doesn't get recreated during re-renders

//?? Different from useMemo()
// --> useMemo() is used to cache a value/result
// --> useCallback() is used to cache a function definition/reference



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Difference between re-render and Browser paint?

// a) React render :-
// --> It happens in React's virtual DOM
// --> React calls your component function again to create a new virtual tree


// b) Reconciliation :-
// --> React compares old vs new virtual DOM to see what actually change


// c) Paint / Commit :-
// --> It happens in Actual DOM
// --> Only the parts that truly changed are updated in the browser


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Why useCallback() is used (REASON 1) ?

//? a) To prevent unnecessary re-renders of child components
// --> Whenever the state or props of Parent component changes, it re-renders
// --> Simultaneously, all the child components inside the parent component will also re-render


//?? NOTE :-
// --> Even though the child is re-rendered
// --> But will it be repainted to the DOM, depends on if its props changed


//?? Why did the child components re-rendered?
// --> When the Parent re-renders, its function is called again
// --> React recreates the JSX tree completely
// --> All the child components in the new JSX will be a new Object in memory
// --> React doesn't know if it can skip rendering the Child components
// --> React also re-renders all child components inside that JSX.
// --> Now the new JSX tree is compared with old JSX tree


// --> If there is no props passed to Child components
// --> Or their props remain unchanged, then they won't be re-painted in the actual DOM

//? e.g1 :-

const Parent = () => {
  const [count, setCount] = useState(0);
  console.log("Parent Rendered");

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>Increment From Parent</button>

      <Child buttonName={"Click Child"} />
    </>
  )
}

const Child = (props) => {
  console.log("Child rendered");
  return (
    <>
      <button>{props.buttonName}</button>
    </>
  )
}


//?? Note :-
// --> Even if we don't pass props to Child component,
// --> Still it will rerender the Child component


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Solution to above problem (React.memo)?

//?? React.memo()
// --> It is a Higher Order Component
// --> It prevents unnecessary re-renders of Child components when its props haven't changed

//?? Limitation :-
// --> It only works if some value is passed as props
// --> But not a function reference


//? Syntax :-
memo(SomeComponent_definition)

//?? NOTE :-
// --> After React 17, we can directly use memo()



//?? What are higher order components?
// --> Function that takes a component as input and returns a new component with extra powers (logic,props,etc)


//******************** */

//?? How to use memo() ?
// a) Import it as a named import from "react" package

import { memo } from "react";


// b) Wrap the arrow function of Child components inside memo()

const Child1 = memo((props) => {
  console.log("Child rendered");
  return (
    <>
      <button>{props.buttonName}</button>
    </>
  )
})



//?? Advantage :-
// --> It will not let the Child components re-render unless the props passed to it changes
// --> Even if the Parent components re-render

// e.g :-
const Parent2 = () => {
  const [count, setCount] = useState(0);
  console.log("Parent Rendered");

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>Increment From Parent</button>

      <Child2 buttonName={"Click Child"} />  //wont re-render
      <Child3 counter={count} />     // will re-render
    </>
  )
}

const Child2 = memo((props) => {
  console.log("Child2 rendered");
  return (
    <>
      <button>{props.buttonName}</button>
    </>
  )
})

const Child3 = memo((props) => {
  console.log("Child3 rendered");
  return (
    <>
      <h1>Count from Parent :- {props.counter}</h1>
    </>
  )
})


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 4) Limitation of memo() :-

// --> It only works properly if the "prop" passed to the Child component is a "value"
// --> But if the "prop" passed is a "function reference", it won't work


//?? Why?
// --> Whenever the Parent component rerenders
// --> All the fn() inside it are recreated & a new f() object & reference of those methods are created in memory
// --> Since we passed a function reference as prop
// --> Hence, earlier reference sent as props and current reference to be sent are different

// --> Hence, memo won't be able to prevent unnecessary re-renders of Child component


// e.g :-
const Parent3 = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1)
  }
  console.log("Parent Rendered");

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment From Parent</button>

      <Child2 buttonName={handleClick} />
    </>
  )
}

const Child4 = memo((props) => {
  console.log("Child2 rendered");
  return (
    <>
      <button onClick={props.handleClick}>Increment From Child</button>
    </>
  )
})

// --> Here, whenever we click the button, Child component will re-render despite of using memo()


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) Solution for Limitation of memo() (useCallback):-
// --> We need to freeze the reference of that function
// --> And make sure it doesn't get re-created on every State or prop change but only on specific ones
// --> Hence, the Child components will not be re-rendered unnecessarily



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */




//?? Function definition or reference?
//  In JS,
// --> A function definition (the code inside () => { ... }) creates a new function object each time it runs.

// --> Each function object has a unique reference (memory address)

// --> when React re-renders, a new function object (definition + reference) is created each time



//?? While using useCallback()
// --> React saves the f() object created (which includes its code & closure context)
// --> On the next render, if dependencies don’t change, React returns the exact same f() object (same reference)





