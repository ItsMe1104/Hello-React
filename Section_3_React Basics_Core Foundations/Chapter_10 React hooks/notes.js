//?? 1) What are hooks in React?

import { Component } from "react";

// --> Hooks are special JS functions
// --> They allow functional components to access the internal React features without using classes
// --> They provide a direct API to React concepts like props, state, context, refs, and lifecycle.

//?? API :-
// --> set of functions, rules, or tools that let one piece of software interact with another


//?? Rules of Hooks :-
// a) It can only be used inside functional components
// b) It should be called before the return statement in the functional component
// c) It cannot be conditional (used inside if-else or ternary)

//?? NOTE :-
// --> Its the naming convention in React that all the hooks start with "use"

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Why Hooks instead of Class components :-

// --> Hooks are functions that make functional components behave like Class components.


//*************** */


// ? Problems with Class components :-


//? i) Challenges of "this" keyword 
// --> Handling "this" can be sometimes confusing in JS


//? ii) Boilerplate Code 
// --> Class components often require repetitive boiler plate code making code lengthy and less maintainable.


//? iii) Hooks have simple and readable syntax
// --> Writing class components are complex

// e.g (class components) :-
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

