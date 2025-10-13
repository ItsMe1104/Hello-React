//?? 1) Lifecycle methods in React :-

import { useEffect } from "react";

// --> A component goes through which stages in its lifecycle are defined through React lifecycle methods


//?? React Rendering has two internal stages :-
// a) Render phase
// b) Commit phase


//?? a) Render phase :-

//?? First render :-
// --> React Calls your component functions (or render() method in class components).
// --> Builds a new virtual DOM tree.


//?? Updating components render :-
// --> React agains calls functional components (or render() method in class components).
// --> Builds a new virtual DOM tree.
// --> Compares it with the previous virtual DOM
// --> Figures out what needs to change in the real DOM but doesn’t change it yet. (NO UI update)

// Methods called :-
// --> constructor, render, getDerivedStateFromProps, shouldComponentUpdate




//?? b) Commit phase :-
// --> React Takes the list of changes computed during the render phase.
// --> Applies them to the actual DOM.
// -->  Calls lifecycle methods and effects related to updates.

//Methods called :-
// --> componentDidMount, componentDidUpdate, componentWillUnmount
// --> useEffect in functional components.


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) React Lifecycle phases :-

// --> Whenever a component appears on the UI :-
// a) Mounting :- component is created and inserted into the DOM

// b) Updating :- Component gets updated and again rendered on screen

// c) Unmounting :- removed from the UI / DOM or while pulling some other component in its place


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//? 3) Mounting phase in Class Component :-

//?? Order :-
//* Render Phase :-
// --> First Constructor()
// --> Second render()

//* Commit Phase :-
// React updates DOM
// --> componentDidMount()


//?? Checking componentDidMount()
// --> Create the componentDidMount() method inside the class component
// --> Make sure that the name is correct

class Notes extends Component {
  constructor() {
    super();
    console.log("Inside Constructor");
  }

  componentDidMount() {
    console.log("Inside componentDidMount()");
  }

  render() {
    console.log("Inside render()");
    return (
      <> </>
    )
  }
}

//? Output :-
// Inside Constructor
// Inside render()
// Inside componentDidMount()




//?? What is the need of componentDidMount() :-

// --> It is given :-
// a) so that after the DOM is ready we can manipulate it.
// --> because if we try to access DOM elements in constructor() or render(), it will give null

// b) Call an API

// c) Create any timer functions



//?? Equivalent of componentDidMount() in functional component :-

// --> useEfect() with empty dependency array
// --> Here also we can access the DOM
// --> call the APIs
// --> create timer functions

useEffect(() => {
  //...
}, [])


//?? Why empty dependency array?
// --> So that it should execute only on first render


//?? Why API calls, setIntervals() should be made inside the componentDidMount() or useEffect() ?
// --> The componentDidMount() and useEffect() run after the render phase, so
// --> The UI is visible.
// --> React won’t interrupt this phase.
// --> It’s safe to perform side effects (like data fetching, timers, subscriptions).


//? Why API call should not be made during render phase?
// --> The render phase must be pure with no side effects
// --> So that React can restart, pause or skip during concurrent rendering
// --> It should calculate how the UI should look like


//?? If we trigger an API or setInterval() in render() :-
// --> It can run or get created multiple times as and when the State gets updated.
// --> As the component will be re-rendered


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Updating phase in React :-

//?? Order :-
//* Render Phase :-
// --> render()

//* Commit Phase :-
// React updates DOM
// --> componentDidUpdate()


//?? NOTE :-
// --> render() also gets called every time we update the State in Component



//?? Checking componentDidUpdate()
// --> It runs after the render() only when some State or prop is updated
// --> Create the componentDidUpdate() method inside the class component
// --> Make sure that the name is correct


// e.g :-
// --> Update the State using a button and see the order when componentDidUpdate() runs

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
    console.log("Inside Constructor");
  }

  componentDidMount() {
    console.log("Inside componentDidMount()");
  }

  componentDidUpdate() {
    console.log("Inside componentDidUpdate()");
  }

  render() {
    console.log("Inside render()");
    return (
      <>
        <h1>{this.state.count}</h1>
        <button onClick={() => { this.setState({ count: this.state.count + 1 }) }}>Increment</button>
      </>
    )
  }
}

//? Output (on clicking the button):-
// Inside render()
// Inside componentDidUpdate()



//?? Similar behavior in functional component :-
// --> use useEffect() with some State variable in the dependency array 

useEffect(() => {
  console.log("Inside UseEffect");
}, [count])


//?? NOTE (Not exactly like componentDidUpdate()):-
// --> It doesn't work exactly like componentDidUpdate()
// --> It works as ComponentDidMount() & componentDidUpdate() together

// --> It will also run on first render of the component as well as when the State or prop in the component updates


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


// ComponentWillUnmount() in notes2.js
