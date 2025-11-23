//?? 1) React lifecycle phases :-

const { useEffect } = require("react")

//? a) Mounting :-
// --> It occurs when a component is created & inserted into the DOM for the first time

//? b) Updating / Re-render :-
// --> It occurs when a component's props or state change, leading to a re-render.

//? c) Unmounting :-
// -->  This phase occurs when a component is removed or replaced from the DOM.

//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//? 2) useEffect() Basics :-

//--> It is used to perform sideEffects in our component.

//?? Side Effects :-
//--> Side effects are actions performed with the outside world (outside the current function/component)
// e.g :-
// i) Fetching data from API
// ii) Directly updating the DOM (not recommended)
// iii) Timer functions(setTimeout or setTimeout)
// iv) Accessing Local Storage


//?? Syntax :-
useEffect(a, b)

// a = callback function (what to do)
// b = dependency array [] (when to do)

//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//?? Executing useEffect() at different Lifecycle phases :-
// --> Whenever the useEffect() runs, it executes its callback fn()
// --> Depending on the dependency array passed, it runs at different times


//********************************** */


//?? useEffect() & dependency array :-

//? a) When no dependency array is passed
// --> useEffect() will run on every render

useEffect(() => {
  // callback
})



//? b) When empty dependency array is passed
// --> useEffect() will run ony on first render (Mounting phase only)

useEffect(() => {
  // callback
}, [])



//? c) When State variables or props passed in dependency array
// --> useEffect() will only run on the re-renders created by the State variables or props passed
// --> No normal JS variables only State variables or props

useEffect(() => {
  // callback
}, [var1, var2])


//?? NOTE :-
// --> It will always run for the first time when the component is inserted into DOM (Mounting phase)


//?? Mounting Phase :-
// --> useEffect() always runs on the mounting phase
// --> We can pass no/empty/non-empty dependency array, still it will run on first render


//******************************* */


//?? Update/Render Phase :-
// --> useEffect() will always run on 1st render of the component (Mounting)

//?? Case 1 (on all renders)
// --> Passing no dependency array, useEffect() will run on every render

useEffect(() => {
  // callback fn()
})


//?? Case 2 (only on first render)
// --> Passing a empty dependency array, useEffect() will run on 1st render only

useEffect(() => {
  // callback fn()
})


//?? Case 3 (on re-renders created by specific State variables or props)
// --> Passing State variables or props in dependency array
// --> useEffect() will run on first render
// --> It will also run on every re-render caused by those State variables or props change

useEffect(() => {
  //callback fn()
}, [var_1, prop1, var_2])


//******************************* */


//?? Unmounting phase :-

// --> If we return a fn() from the callback fn() of the useEffect()
// --> Then that returned fn() will always run when that component unmounts (i.e leaves the screen)
// --> No dependence on the dependency array

useEffect(() => {
  //callback fn()

  return () => {
    console.log("Unmounting");
  }
}, [var_1, prop1, var_2])



//?? Whole Solution :-

const App = () => {
  console.log("********New Render*******");

  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // useEffect 1
  useEffect(() => {
    console.log("Will run on every render");
  })

  // useEffect 2
  useEffect(() => {
    console.log("Will run only on first render");
  }, [])

  // useEffect 3
  useEffect(() => {
    console.log("Will run on first render and re-renders due to count update");
  }, [count, input])

  // useEffect 4
  useEffect(() => {
    return () => {
      console.log("Runs on unmounting");
    }
  })

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>Increase Count</button>


      <input type="text" value={input} onChange={(e) => {
        setInput(e.target.value)
      }} />
    </>
  )
}


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Updating DOM using useEffect()

// --> Although bad practice, as it can conflict with React's changes in virtual DOM
// --> We can still directly manipulate the DOM inside useEffect

useEffect(() => {

  document.title = `Name is ${input}`

  const heading = document.querySelector("h1")
  heading.style.color = "red"

}, [input])



//?? Why DOM manipulation recommended inside useEffect() ?
// --> As useEffect() runs after the DOM is painted on the screen
// --> Hence, it is guarantees that the element we want to modify already exists in the DOM


//?? Here React’s steps are:
// ==> Render virtual DOM
// ==> Commit/update real DOM
// ==> Then run useEffect() where DOM exists — safe to manipulate


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Strange case of useEffect() and props passed :-

// --> If we pass a prop inside the useEffect() of our component
// --> It behaves differently depending on the data type of the prop

useEffect(() => {
  console.log("useEffect Ran");
}, [props])

//?? Case 1 (prop is primitive type):-
// --> useEffect() will run
// a) on first render
// b) only run when its Parent component changes the props


//?? Case 2 (prop is array,object,function):-
// --> useEffect() will run
// a) on first render
// b) on every render of Parent component (even if the prop gets updated or not)


//?? Why?
// --> React only re-renders the UI , if the reference of the state variable changes
// i) For primitive types, reference only changes if the value changes
// ii) Objects, arrays & functions are re-created on every render
// --> even if their contents are the same.
// --> Their reference changes on every re-render of Parent component
// --> Hence, React thinks that the prop changed on ever re-render of the parent
// --> Hence, the useEffect() of Child component runs on every re-render of the parent
// --> if the props passed is object/array/fn().


//?? Solution :-
// --> useMemo() and useCallback()