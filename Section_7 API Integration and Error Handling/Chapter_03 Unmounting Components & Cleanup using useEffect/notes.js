//?? 1) Facts about the React Lifecycle Phases :-
// --> Whatever be the phases, the changes first be reflected in Virtual DOM
// --> Then only it will be reflected in the Actual DOM


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Unmounting phase & Cleanup fn():-

// --> If we return a fn() from the callback fn() of the useEffect()
// --> Then that returned fn() will always run when that component unmounts (i.e leaves the screen) 
// --> No dependence on the dependency array


//?? NOTE (Cleanup also runs BEFORE effect re-runs):-
// --> Cleanup fn() also runs before useEffect re-runs when the dependency changes


useEffect(() => {
  //callback fn()

  return () => {
    console.log("Unmounting");
  }
}, [var_1, prop1, var_2])


//***************** */

//?? Whole Solution :-

const App = () => {
  console.log("********New Render*******");

  const [input, setInput] = useState("");

  useEffect(() => {
    return () => {
      console.log("Runs on unmounting");
    }
  }, [input])

  return (
    <>
      <input type="text" value={input} onChange={(e) => {
        setInput(e.target.value)
      }} />
    </>
  )
}


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Why cleanup fn() is required during unmounting phase?

// --> It removes all side effects created by useEffect() when the component unmounts
// --> So that nothing runs unnecessarily in the background to avoid memory leaks or performance issues.


//?? Why?
// --> When a component unmounts, everything inside it disappears from the screen
// --> But the side effects created earlier might still be running in the background
// --> Unless they are cleaned up manually

// Hence,
//? i) setTimeout / setInterval
// -->	Keeps running even after component is gone

//? ii) Event listeners on window (scroll, click, resize)
// --> Will continue to trigger even after unmounting

//? iii) WebSocket
// --> Still active → memory leak


//?? Main problem :-
// --> If an async task, API call or listener tries to update state after unmounting
// --> React shows a warning
//? Can't perform a React state update on an unmounted component

// + memory leak and unnecessary CPU usage :-

// --> As the component no longer exists, but side effects still tries to access it



// e.g :-

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
      console.log("Interval running...");
    }, 1000);
  }, []);

  return <h1>{count}</h1>;
}
