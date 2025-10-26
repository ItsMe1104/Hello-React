//?? 1) useLayoutEffect() vs useEffect() :-


//? When is useEffect() run for first time?
// --> It is always called after the component is rendered on UI



//?? Behind the scenes :-

//?? ReactDOM.render() or root.render()
//--> When the React.render() is called
// --> It starts the process that leads to React building the Virtual DOM (Render phase)



//? Render phase :-
// --> When Babel transpiles the JSX into modern JS like React.createElement()
// --> This then returns a React element which is a plain JS object
// --> Then React uses this JS object to build virtual DOM

//* Now if changes are made in State
// --> A new virtual DOM is made
// --> The old & new Virtual DOM are compared using diffing algo
// --> Now React is prepared to update the difference in real DOM
// --> This is the render phase

//?? Commit phase :-
// --> Here React updates the changes in Real DOM
// --> The Real DOM is just updated and is ready
// --> Still now the changes are not present in UI or Browser


//?? Painting phase :-
// --> Browser will pick up the real DOM
// --> It will now paint it in the UI
// --> This is the job of Browser and not React



//?? When does useEffect() run
// --> After the Painting phase, when UI is available
// --> So that the UI is not blocked & User experience is better

// e.g :-
// --> On first render, the width of the div is 300px
// --> Hence, it is painted in UI as 300px
// --> When useEffect() runs after the component is rendered on the UI 
// --> We will see a smooth transition of div to 600px

const App = () => {
  console.log("Rendering");
  const [width, setWidth] = useState(300);
  useEffect(() => {
    console.log("Inside useEffect()", width);
    setWidth(600)
  }, [])

  return (
    <div style={{
      width: `${width}px`,
      backgroundColor: 'blue',
      height: '100px',
      transition: 'width 1s'
    }}>My UseEffect</div>
  )
}


//? Output :-
// --> Rendering
// --> Inside useEffect()
// --> Rendering

// --> First our <div> will render with 300px
// --> then it will transition to 600px


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? Updating State variables with objects:-


//?? Literal Values
// --> If are updating State variables with literal values 
// --> not arrays [] or objects {}
// --> React won't re-render the component unnecessarily once it finds the new value == the old value

// --> Hence, useEffect() will also be not called once React stops re-rendering


// Case 1 :-

useEffect(() => {
  console.log("Inside useEffect()", width);
  setWidth(600)
},)

// Case 2 :-
useEffect(() => {
  console.log("Inside useEffect()", width);
  setWidth(600)
}, [width])


// --> Both the cases won't give infinite re-renders
// --> Because React internally stops re-rendering if the new State value == old State value




//?? Arrays and objects :-
// --> If we updated State variables with [] or {}

useEffect(() => {
  console.log("Inside useEffect()", width);
  const abc = []
  setWidth(abc);
},)

useEffect(() => {
  console.log("Inside useEffect()", width);
  const abc = []
  setWidth(abc);
}, [width])

// --> Both cases will give infinite re-renders 
// --> useEffect() will also run infinitely
// --> Mostly happens while calling APIs


//?? Reason :-
// --> Since same literal values have same reference
// --> Hence, React compares easily

// --> But all objects and arrays have different reference
// --> Hence, React cannot make out if they are like-equal or not

//* Hence, infinite renders happen


//?? Solution :-
// --> Don't forget to pass empty dependency array in useEffect()
// --> In case of API calls or 
// --> updating State variables with arrays or objects 


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Why useLayoutEffect() is used?

// --> When the commit phase is completed and real DOM is ready
// --> But we want to manipulate DOM before Browser paints it into th UI
// --> It blocks the Browser from painting till its completed.

useLayoutEffect(() => {
  //...
}, [])

//?? e.g :-
// --> calculating or changing Layout measurements
// --> resizing window, etc before we see in UI




//?? Syntax :-
// --> Same as useEffect()

//?? Working :- 
// --> same as useEffect() along with the dependency array
// --> Same outputs in console (as consoles are updated before painting phase)



//?? When does useLayoutEffect() run :-
// --> Just before the painting phase synchronously
// --> After the commit phase

const App2 = () => {
  console.log("Rendering");
  const [width, setWidth] = useState(300);
  useLayoutEffect(() => {
    console.log("Inside useLayoutEffect()", width);
    setWidth(600)
  }, [])

  return (
    <div style={{
      width: `${width}px`,
      backgroundColor: 'blue',
      height: '100px',
      transition: 'width 1s'
    }}>My UseEffect</div>
  )
}


//? Output :-
// --> Rendering
// --> Inside useLayoutEffect()
// --> Rendering

// --> From first only our <div> will render with 600px
// --> No transition can be seen



//?? Note (Blocking Nature):-
// --> The code & all state updates scheduled in useLayoutEffect  block the browser from repainting the screen.
// --> Makes the app slow, hence prefer useEffect()


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */





