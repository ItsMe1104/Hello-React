
//? 8) Reason 2 :- To prevent expensive fn() to be created on every render

import { useCallback, useEffect } from "react";

//?? useMemo()
// --> The expensive fn() reference will be recreated on every Parent render (not talking about callback inside useMemo)
// --> We can save the it from running on every render by memoizing the value
// --> Here we are optimizing the re-run of expensive fn()


//?? useCallback()
// -->  The expensive function reference is memoized
// --> Still the function will run whenever called (especially before returning JSX)

// --> Here we are optimizing the resource to create the function again


//?? e.g (From previous useMemo example with some changes) :-
// --> Just remove the argument of input field to our expensive function
// --> Remove the use of useMemo()
// --> Call the expensive function directly from JSX

const App3 = () => {
  console.log("Rendered");

  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  function expensive() {
    let sum = 0;
    // expensive loop
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    return sum / 1e6;
  }


  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => {
        setCount(count + 1);
      }}>Click Me</button>

      <input type="number" value={input} onChange={(e) => {
        setInput(e.target.valueAsNumber)
      }} />
      <h2>Expensive Calculation : {expensive()}</h2>
    </>
  )
}


// --> Now if we update the State using either of :-
// a) Counter button
// b) Input field

// --> State will be updated & Parent re-rendered
// --> expensive fn() will be re-created
// --> And it will be run again


//?? Task 1 :-
// --> Get the expensive fn() to recreate only when the State is updated by Counter button
// --> To check, just put console.log() inside a useEffect()
// --> In the dependency array of useEffect() pass the reference of expensive fn()
// --> So that it only runs if the the reference updates


const App = () => {
  console.log("Rendered");

  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  const expensive = useCallback(() => {
    let sum = 0;
    // expensive loop
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    return sum / 1e6;
  }, [count])

  useEffect(() => {
    console.log("Expensive Function got recreated");
  }, [expensive])

  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => {
        setCount(count + 1);
      }}>Click Me</button>

      <input type="number" value={input} onChange={(e) => {
        setInput(e.target.valueAsNumber)
      }} />
      <h2>Expensive Calculation : {expensive()}</h2>
    </>
  )
}

// --> Hence we can see that the useEffect only runs when we click the counter button
// --> But not on input field

//?? NOTE :-
// --> The expensive fn() runs on either State update, hence we can see the delay in both cases