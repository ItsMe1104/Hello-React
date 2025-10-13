//?? 1) Unmounting phase in React :-

//?? Order :-
//* Render Phase :-
// 

//* Commit Phase :-
// --> componentWillUnmount()


//?? NOTE (when it gets called):-
// --> componentWillUnmount() will only be called when the component gets removed from the UI.
// --> It can be when we are replacing our component with some other component while navigating.



//?? Checking componentDidUpdate()
// --> Create the componentDidUpdate() method inside the class component
// --> Make sure that the name is correct


// e.g :-
// --> Make a boolean state variable in Parent Component
// --> Create a button which can reverse the boolean value
// --> If the boolean is true then only show the component else don't 


// Current Component :-
class Notes extends Component {
  constructor() {
    super();
    console.log("Inside Constructor");
  }
  componentDidMount() {
    console.log("Inside componentDidMount()");
  }
  componentDidUpdate() {
    console.log("Inside componentDidUpdate()");
  }

  componentWillUnmount() {
    console.log("Inside componentWillUnmount()");
  }

  render() {
    console.log("Inside render()");
    return (
      <>
        <h1>Notes Component</h1>
      </>
    )
  }
}


//Parent Component :-
class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    }
  }
  render() {
    const { show } = this.state;
    return (
      <>
        {show === true ? <Notes /> : <></>}
        <button onClick={() => { this.setState({ show: !show }) }}>Show/Unshow</button>
      </>
    )
  }
}


//? Output (on clicking the button):-
// Inside Render()
// Inside componentDidUpdate()

// Inside componentWillUnmount()



//?? What is the usecase of componentWillUnmount() ?
// --> It is basically used as a clean up functions

//? e.g 1 (setInterval) :-
// --> For instance, if we created a setInterval which would execute every 1s for our component
// --> Now even if our component gets removed from the UI, it still gets executed
// --> Even Worse thing is that if we render back our component
// --> Then a new setInterval will be created along with the old one
// --> Hence, always clear it in componentWillUnmount()
// --> Because th setInterval() will be created again as required when our component is rendered back


//? Note :-
// --> We need to declare & initialize variables inside constructor() using this

this.var_name;

// --> This makes the variables accessible to other methods inside same class using "this"
// --> As normal variables created inside the componentDidMount() cannot be accessed outside in componentWillUnmount()

// e.g :-
class notes extends Component {
  constructor() {
    super();
    this.clear = null;
  }
  componentDidMount() {
    this.clear = setInterval(() => {
      console.log("Hi");
    }, 1000)
  }
  componentDidUpdate() { }

  componentWillUnmount() {
    clearInterval(this.clear)
  }

  render() {
    return (
      <>
      </>
    )
  }
}



//? e.g 2 (eventListener) :-
// --> If we have attached any eventListener() also to any element of our component
// --> It will remain there even if our component gets unmounted/removed impacting our performance
// --> Hence, we need to clear it in componentWillUnmount()
// --> Because when we render our component back, the eventListener will again be created as required


//?? Why setInterval() should be created in componentDidMount() or useEffect()
// --> Because these methods run after the UI is loaded
// --> That too only once after the render()

// --> If these methods are created inside render(), then they will be created each time during State update



//?? Equivalent of componentWillUnmount() in function Components :-

// --> We can return a function from useEffect()
// --> That returned function is equivalent to componentWillUnmount()
// --> Whatever we write inside that returned function
// --> It will be executed when our component unmounts.

//* It is also called clear function



//? e.g (setInterval):-
// --> Create the setInterval() inside the useEffect() with empty dependency array
// --> Clear that setInterval inside the function returned from useEffect()

const notes = () => {
  useEffect(() => {

    // Creating setInterval 
    const timer_id = setInterval(() => {
      console.log("Hi");
    }, 1000);

    // clear functiom
    return () => {
      clearInterval(timer_id);   // clearing setInterval
    }
  }, [])

  return (
    <></>
  )
}


//?? Note :-
// --> Here we can use normal variables created in useEffect() only
// --> As the clear function is inside useEffect() which will have access to those variables

