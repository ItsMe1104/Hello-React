//?? 1) React lifecycle phases :-

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
// --> We can pass no/empty/non-empty dependency array, still it will run for the first render
