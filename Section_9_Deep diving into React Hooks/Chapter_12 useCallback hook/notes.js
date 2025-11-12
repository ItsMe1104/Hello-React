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


//?? 2) Why useCallback() is used?
// a) To prevent unnecessary re-renders of child component
// b) To prevent expensive fn() to be created on every render



//? a) REASON 1 :- To prevent unnecessary re-renders of child components
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

import { memo, useCallback } from "react";


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
  console.log("Parent Rendered");

  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log("Clicked");
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => { setCount(count + 1) }}>Increment From Parent</button>

      <Child2 buttonName={handleClick} />
    </>
  )
}

const Child4 = memo((props) => {
  console.log("Child2 rendered");
  return (
    <>
      <button onClick={props.buttonName}>Increment From Child</button>
    </>
  )
})


//?? What happened? 
// --> Here, whenever we click the button inside Parent component
// --> The State changes and Parent Component re-renders
// --> All the functions inside Parent will be recreated
// --> Hence, a different reference of handleClick() is created and passed as props to Child component
// --> Since its a new reference, memo() thinks as if the props changed

//? Hence, Child component will re-render despite of using memo()


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) Solution for Limitation of memo() (useCallback):-

//? use useCallback() along with memo()

// --> We need to freeze the reference of that function
// --> And make sure it doesn't get re-created on every render but only on specific ones

// --> Hence, the Child components will not be re-rendered unnecessarily on every render of Parent.



//?? useCallback()
// --> It lets us cache a fn() reference between renders
// --> Hence, a f() won't be recreated every time
// --> Means its memory reference won't change every time


//?? Note :-
// --> use memo() also in the Child component
// --> Else the Child component will re-render by default



//?? Syntax :-

useCallback(a, b)
// a = callback f() to be cached or recreated only during dependency change
// b =  dependency array


//? Return Value :-
// --> The cached fn()
// --> Hence, store it in a variable


//?? How it works :-
// --> The callback function passed is only recreated when the dependency changes, else it remains cached


// e.g :-

const Parent4 = () => {
  console.log("Parent Rendered");

  const [count, setCount] = useState(0);
  const memoizedHandleClick = callback(() => {
    console.log("Clicked");
  }, [count])


  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => { setCount(count + 1) }}>Increment From Parent</button>

      <Child2 buttonName={memoizedHandleClick} />
    </>
  )
}

const Child5 = memo((props) => {
  console.log("Child rendered");
  return (
    <>
      <button onClick={props.buttonName}>Increment From Child</button>
    </>
  )
})


// --> Hence, the memoized fn() will only be re-created when the count variable changes


//?? NOTE :-
//--> If we don't provide the State variable in dependency
//--> Then we won't be able to update the State variable using set() inside that callback fn()

const memoizedHandleClick = callback(() => {
  console.log("Clicked");
}, [])

//?? Why?
// --> Because during the first render
// --> The callback function is created which forms a closure with the count variable.
// --> It is stored in cache due to useCallback()
// --> Because dependency array [] is empty, React will never recreate this function again.


// --> When we click the button, Parent re-renders
// --> The saved function runs → it does setCount(0 + 1) → count becomes 1.


// --> When we click the button again
// --> React still uses the same cached fn() with the earlier closure value only
// --> So it again does setCount(0 + 1)
// --> This happened because the callback fn() will keep the same values of variables & closure since its creation


//?? If the State variable is passed in the dependency array
// --> Then the callback fn() will be re-created with a new Closure on every State update


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 7) Function definition vs reference?
//  In JS,
// --> A function definition (the code inside () => { ... }) creates a new function object each time it runs.

// --> Each function object has a unique reference (memory address)

// --> when React re-renders, a new function object (definition + reference) is created each time



//?? While using useCallback()
// --> React saves the f() object created (which includes its code & closure context)
// --> On the next render, if dependencies don’t change, React returns the exact same f() object (same reference)


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */
