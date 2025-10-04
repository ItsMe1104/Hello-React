//? 1) Component Based Architecture :-

// --> React follows a component based architecture
// --> Breaking UI into smaller, reusable pieces are called components
// --> But technically components are like JS functions that return some JSX or some component/components itself
// --> This architecture improves code reusability and maintainability
// --> e.g :- Navbar, Sidebar, etc


//***************************** */


//? 2) Proper practice to make components :-

// --> In the src folder, create a directory name "components"
// --> Inside that make all the components


//***************************** */


//? 3) Naming the first component :-

// --> The component name should start with a capital letter
// --> The component file should end with a .js or .jsx
// --> If we use .js then it will only contain our JS code, but jsx can contain an HTML like syntax inside JS called JSX


//***************************** */

//? 4) Prerequisites of building a component (VVI):-

// --> First import React from "react"

import React from "react";


//***************************** */


//? 5) Types of component :-

// 2 types
// a) Class components :- earlier used
// b) Functional Components :- Modern components used now a days


//? Syntax of class component :-

class Card extends Component {
  render() {
    return <h1>Hello,{this.google.com}</h1>;
  }
}


//?? Syntax of Functional component :-
//Note :- The component name should match the file name

// a) Normal JS function returning an HTML like syntax

function Card() {
  return <div> Hello from card component</div>;
}



// b) Arrow function stored in a variable

const Card = () => {
  return <div> Hello from card component</div>;
}


//?? NOTE :-
// --> The concept of "this" works same as in normal JS


//***************************** */


//?? 6) Shortcut to create React components :-
// --> First install the "ES7 React" extension in Vs code

// --> Go the component file
// --> Type "rafce" and hit Enter


// --> The shortcut will :-
// a) import React
// b) Create a component in terms of arrow function returning empty div
// c) default export our component



//***************************** */


//?? 7) Using our components in some other files :-

// --> To use our components in other files/components
// --> We have to follow 3 steps

//? Step 1 (Exporting our component):-
// --> In our component file, first export that component
// --> We can either use default export (mostly used) or named export


// e.g :-
export default Card;




//? Step 2 (Importing our component):-
// --> In our file where we require the component, import it
// --> We can either use default import (mostly used) or named import depending on the type of export

//?? Syntax :-
// import Component_name from "relative_path_to_the_component"

// e.g :-
import Card from "/components/Card"



//? Step 3 (Using our component once exported and imported):-

// a) We can either use it like the way we call a normal JS function
// b) Or we can use it as a normal HTML tag
// c) Or we can use it as a self closing HTML tag (mostly used).
// --> We can use it wherever we are using or returning JSX
// --> Mostly a component is used inside other components or inside the createRoot.render() method of React

// e.g :-

const Card2 = () => {
  return <Card />;
}


