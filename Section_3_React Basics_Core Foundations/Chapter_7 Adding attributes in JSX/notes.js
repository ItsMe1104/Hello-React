//?? 1) Attributes in JSX :-

// --> JSX contains JS + HTML like syntax
// --> Just like in HTML tag, we define attributes
// --> Similarly here also we define the attributes inside the HTML like tags


//?? Note :-
// --> If in JSX we use predefined HTML tags (like h1, button, etc), then,
// --> the attributes we use in HTML work with same functionality in JSX too
// --> The user-defined attributes will work normally


<button value="Add Task">Add task</button>  // will work with same in HTML and JSX


// --> If in JSX we use user-defined tags or component tags then,
// --> attributes act as props


// e.g :-
const notes = () => {
  return (
    <div>
      <h1>Hello</h1>
      <button value="Add Task">Add task</button>
      <Card age="16" />              // props
    </div>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Some Rules of Attributes in JSX :-

//? a) className
// --> for giving "class" attribute , we use "className"
// --> This is because in JS "class" is a reserved keyword

const notes2 = () => {
  return (
    <>
      <h1 className="heading">Hello</h1>
    </>
  )
}


//? b) JS expressions for attributes :-
// --> We can also use JS expressions to serve as dynamic values for the attributes in JSX tags
// --> For using JS expressions as values to attributes we have to wrap them in curly braces 

const notes3 = () => {
  const class_name = "hello";
  return (
    <>
      <h1 className={class_name}>Hello</h1>
    </>
  )
}


//? c) Boolean attributes in JSX :-
// --> For boolean attributes in HTML, we don't need to give any value in HTML tags
// --> But boolean attributes in JSX, we need to give a boolean value in form of JSX expression

const notes4 = () => {
  const isDisabled = true;
  return (
    <>
      <button className="btn" disabled={isDisabled}>Add Task</button>
    </>
  )
}


//? c) Adding inline CSS to JSX tags (to be avoided) :-

// --> To add inline CSS to JSX tags, we use the "style" attribute
// --> It will take an object, with all the CSS properties and their values as key-value pairs (value as string)
// --> Since object also belongs to the JS literal, we have to enclose it in braces

//??Note :-
// --> Inside JSX, the CSS properties will always be in camel case and not kebab case

const notes5 = () => {
  return (
    <>
      <h1 style={{ color: "red", fontSize: "45px" }}>Hi from H1</h1>
    </>
  )
}

//?? Better practice :-
// --> Create a variable and store all the key-value pairs of style object
// --> Pass that variable dynamically in the style attribute
// --> Since we are using JS variables hence we have to wrap it inside curly brace again 

const notes6 = () => {
  const styles = { color: "red", fontSize: "45px" }
  return (
    <>
      <h1 style={styles}>Hi from H1</h1>
    </>
  )
}


//?? NOTE :-
// --> Generally inline styles should be avoided




