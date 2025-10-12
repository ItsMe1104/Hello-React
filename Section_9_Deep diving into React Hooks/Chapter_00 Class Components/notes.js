//?? 1) Class based components :-

// --> Back in 2018/2019, mainly Class based components were used
// --> Nowadays React doesn't recommend using them now
// --> All new projects shifted to functional components
// --> But still it is asked interviews


//****************************** */


// ?? How to make class based components?

//? a) Define class
// --> We have to define JS ES6 class with our Component name (Pascal Case) and inherit it from Component class

// --> import the Component class as a named import from react package

// --> export default the class Component

import { Component } from "react";   // import Component
class Counter extends Component {
  // ...
}
export default Counter;              // export Counter 



//****************************** */


//? b) Implement render() :-
// --> Inside the class Component, implement the render method
// --> It returns the JSX that will be displayed in UI
// --> We can use the React Fragment to group the JSX also.

class Counter extends Component {
  render() {
    return (
      <></>
    )
  }
}


//****************************** */


//?? How to use this class component in other components?

// --> import & export it like normal functional components
// --> Then use the component tag to render it exactly like functional components
// --> Even passing props is same as in functional components (via attributes)


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) How to receive props in class component :-

// --> In functional components we received it through arguments
// --> In class components we receive it through "this" keyword inside render()


//?? "this" inside class components :-
// --> Inside the class component, "this" points to the component itself
// --> That component will have a property called "props"
// --> This property has the "prop" object where all the props passed via attributes will appear


// Access the props object using :-
this.props


// Destructure like in functional components to get the required prop
const { name, city } = this.props;


//? e.g :-

// parent :-
<OldCounter />


// child :-
class OldCounter extends Component {
  render() {
    const { name, city } = this.props;
    return <div>{name}</div>
  }
}



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Defining State in class components :-

//? How to define State in class components
// --> Implement constructor method inside the class component just like in JS
// --> call the super() constructor inside our constructor to access "this" in derived class

class notes extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <></>
    )
  }
}


//?? How to create State?
// --> Inside the constructor use "this" to create a state property 
// --> Reference that property to an object (State object)
// --> Inside that object define all the State variables and their initial values in key-value format

class notes extends Component {
  constructor() {
    super()
    this.state = { count: 0, name: "Hrithik" }
  }

  render() {
    return (
      <></>
    )
  }
}


//?? NOTE :-
// --> Its very important to name that property as "state" only
// --> else React will not know that it is defining State


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Using State variables in class components :-


//? Method 1 :-
// --> Use the state variables using "this"
// --> Use "this" to access State object through state property using (.)
// --> Extract the state variables as properties from this State object

this.state.property



//?? Method 2 :-
// --> Destructure the State variables from the State object
// --> Then use the State variables directly

const { name2, age2 } = this.state;

// e.g :-
class notes extends Component {

  constructor() {
    super();
    this.state = {
      name: "Hrithik",
      age: 24,
    }
  }
  render() {
    const { name, age } = this.state;
    return (
      <>
        <h1>{this.state.name}</h1>   // Method 1
        <h1>{age}</h1>               // Method 2
      </>
    )
  }
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Updating State variables in class Component :-

// --> Use the "setState" property to update the State variable
// --> Access the "setState" property using "this" as it  belongs to the Component Prototype's Prototype (Object).


//? setState
// --> The setState is a method
// --> It takes an object as an argument
// --> In that object we pass only those State variables that need to be updated along their updated value as key-value pairs

this.setState({ name: "Vikash" })

// --> We don't need to specify other State variables which don't need to be updated inside that object


//?? Note :-
//? How to update the value of State variable based on current value of the same State variable


//? Option 1 :-
// --> use "this.state.variable_name" just like while setting their initial values

this.setState({ count: this.state.count + 1 })




//? Option 2:-
// --> Destructure the State variables before only, then use them normally

this.setState({ count: count + 1 })


// e.g :-

class note extends Component {
  constructor() {
    super();
    this.state = {
      name: "Hrithik",
      count: 1
    }
  }

  render() {
    const { name, count } = this.state;
    const handleClick = () => {
      this.setState({ count: this.state.count + 1 }); //M1
      this.setState({ name: name + " Shaw" });  // Method 2
    }

    return (
      <>
        <h1>{this.state.count}</h1>
        <button onClick={handleClick}>Click Me</button>
      </>
    )
  }
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) constructor() vs render() :-

//? Which is rendered first?
// --> constructor() method is rendered first

// e.g :-
class notes extends Component {
  constructor() {
    super();
    console.log("Constructor() Rendered");
  }

  render() {
    console.log("Render() Rendered");
    return (
      <></>
    )
  }
}


//? How many times each one is rendered?

// constructor() is rendered only for the first time when an instance of that class is created


// render() is rendered 
// a) For the first time to render the Component
// b) Whenever the State is updated


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Accessing props inside constructor :-

// If we want to access the "props" inside our constructor() :-
// --> We have to first receive them in the constructor function as a parameter
// --> The entire "props" object will be received

// e.g :-
class Note extends Component {
  constructor(props) {
    super();

    console.log(props);
  }
}


//?? Accessing props using "this" inside constructor
// --> If we want to access props using "this" inside constructor()
// a) We need to receive the "props" object in the parameter of constructor()
// b) pass the "props" object in the super() as argument.

// e.g :-
class Note extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }
}


