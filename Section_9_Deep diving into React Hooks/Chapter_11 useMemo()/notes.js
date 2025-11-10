//?? 1) Memoization in React:-

// --> It is used for performance optimization
// --> Memoization means, if an unsolved problem statement comes, then solve it and store it
// --> If it is already solved, then don't calculate it again and return it from our store


// --> To memoize a value, we use useMemo()
// --> To memoize a function, we use useCallback()



//?? Why useMemo() or useCallback() used?
// --> Sometimes there are expensive operations/tasks/calculations in our app
// --> If they are getting performed unnecessarily
// --> It can impact performance
// --> To prevent this, we use useMemo() or useCallback()


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Scenario 1 :-
// --> Make a counter app, where count increases on button click
// --> Inside the component create an expensive function which takes some time
// --> Inside the same component call the expensive f() and store the result
// --> Display the result in <h1><h1>

//?? Note :-
// --> without calling, the expensive function won't trigger


const App = () => {
  const [count, setCount] = useState(0);

  function expensive(input) {
    for (let i = 0; i < 1e9; i++) { }  // expensive loop

    return input * 2;
  }

  const result = expensive(4);
  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => {
        setCount(count + 1);
      }}>Click Me</button>

      <h2>Expensive Calculation : {result}</h2>
    </>
  )
}


//?? What will happen?
// --> When we click the button quickly 3-4 times
// --> We can see the delay in updating the UI as well as in the console


//?? Why?
// --> Whenever we click on button
// --> The State changes and re-renders the Component
// --> When re-rendering the component, the expensive f() is called again
// --> Hence the expensive f() is triggered again with the heavy loop
// --> This creates the delay
// --> After this the UI is updated


//?? Summary :-
// --> The expensive function is called and executed again in every component re-render



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Scenario 2 :-

// --> Instead of passing hardcoded value as input to the expensive function
// --> Create an <input> of type number
// --> Whatever we type inside the <input>, that no. should go as input to expensive function
// --> Hence, we have to use the "value" attribute & the onChange() handler
// --> Note that the state will always update on each character we type or delete in <input>


const App2 = () => {
  console.log("Rendered");

  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  function expensive(input) {
    for (let i = 0; i < 1e9; i++) { }  // expensive loop

    return input * 2;
  }

  const result = expensive(input);
  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => {
        setCount(count + 1);
      }}>Click Me</button>

      <input type="number" value={input} onChange={(e) => {
        setInput(e.target.valueAsNumber)
      }} />
      <h2>Expensive Calculation : {result}</h2>
    </>
  )
}


//?? What is happening?
// --> Here the <input> field is a also triggering a state change and component re-render
// --> And the button is also doing the same

//==> Hence, incrementing count is still slow
//==> And changing in input field is also slow





//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Solution to above problem using useMemo():-

//? a) For <input> re-renders
// --> Since the input value changes means the argument of expensive f() will also change
// --> And the result should also change

// --> Hence, it is necessary for the expensive f() to re-trigger on every re-render cause by <input>
// --> In order to calculate the new result
//? Hence delay is inevitable



//? b) For button click re-renders
// --> Here, no argument change for the expensive f()
// --> Hence the result will be same before and after the re-render
// --> Hence, no need to call & trigger the expensive f() here during the re-render

// --> Hence, here the expensive f() is causing unnecessary delay



//? Solution :-
// --> We need to memoize the function call result
// --> such that if before & after the re-renders the result are going to be same
// --> Then, no need to re-trigger the expensive f() and re-calculate the same value again

//?? How (useMemo())?
// --> Use useMemo() hook
// --> Its syntax is like useEffect only
// --> It doesn't return anything on its own but only the cached value



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) useMemo() hook :-

// --> It remembers/memoizes the most recent result of a function
// --> If on any re-render, the result remain the same
// --> it will not let React calculate the same result again by calling the expensive f()


// --> It will only let React call the expensive f() if its dependency changes


//******************************** */

//?? Syntax :-
useMemo(() => { }, [])

//? first argument :-
//==> callback that runs only when the dependency inside dependency array changes

//? second argument :-
//==> dependency array []
//==> If something inside it changes then the callback f() is executed


//?? Return value :-
// a) If no dependency change, then cached value
// b) If dependency change, then returned value from callback


//********************************* */


//? Solution to avoid unnecessary re-renders :-

//?? Step 1 :-
// --> Instead of calling the expensive f() directly
// --> We will return the expensive f() call from the callback of useMemo
// --> Since the expensive f() call will return a value, it can be stored in cache of useMemo()
// --> Store the result in our result variable and render it inside <h1>



//?? Step 2 :-
// --> Since, we only want our expensive f() to be called when input State variable changes
// --> As it will be taken as a new argument
// --> Hence, pass the input State variable in dependency array

let result = useMemo(() => {
  return expensive_f(input)
}, [input])



//?? Final Code :-

const App3 = () => {
  console.log("Rendered");

  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  function expensive(input) {
    for (let i = 0; i < 1e9; i++) { }  // expensive loop

    return input * 2;
  }

  let result = useMemo(() => {
    return expensive(input);
  }, [input])

  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => {
        setCount(count + 1);
      }}>Click Me</button>

      <input type="number" value={input} onChange={(e) => {
        setInput(e.target.valueAsNumber)
      }} />
      <h2>Expensive Calculation : {result}</h2>
    </>
  )
}


//?? How does it work?

//?? On button click :-
// --> On button click, since the count State variable is updated & not the input State variable
// --> Hence, no new input means expensive f() will give same output
// --> Hence, useMemo() returns the cached value directly into our result variable
// --> Hence, we do not face any delay while clicking button


//?? On input change :-
// --> Since new input is generated
// --> Means new argument
// --> Means new result by expensive f()
// --> Hence, it is provided in the dependency [] of useMemo()
// --> So that the callback f() of useMemo calls the expensive f() which gives a new result value
// --> & return that new value
// --> and store it in its cache too

//?? Hence, delay remains for change in input value



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Limitations of useMemo() :-

// --> It will cache only the most recent value returned by its callback

// *) Means :-
// a) if input is 1 gives the result 2
// --> Cached result = 2

// b) If the input is changed to 2, the result is 4
// --> Cached result = 4     (2 removed)

//?? Hence, for input = 1, we have to call the expensive f() again and get its result

