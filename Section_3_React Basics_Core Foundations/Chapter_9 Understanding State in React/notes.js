//? 1) Can normal variables update DOM in React ?

// --> We are not allowed to touch the DOM directly in React unlike in vanilla JS
// --> If we use normal JS variable, to update the DOM or UI, React won't allow it
// --> React has the concept of Virtual DOM

// e.g :-

const notes = () => {
  const val = 0;
  const increment = () => {
    ++val;
    console.log(val);
  }

  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <h1>{val}</h1>
    </div>
  )
}

//?? Result :-
// --> Though the value of variable will update, it will not reflect in the UI/DOM


//?? Solution :-
// --> Use State variables to update the value and UI


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//? 2) What is State in React?

// --> In React, state is a built-in object
// --> The state object is where we store data as property-values that can change over time.
// --> This data entirely belongs to the component
// --> Think it as a component's memory


//?? Use of State :-
// --> State allows us to manage and display changing data in our app


//?? State variables :-
// --> These are special variables stored as key-value pairs in the React State object
// --> These variables are tracked & whenever their value changes, the actual DOM is updated
// --> The Actual DOM is updated through the process of Reconciliation


// ?? How to define State Variables :-
// --> Through React hooks like useState()


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Short summary of Reconciliation :-
// --> It is a process to effectively update the actual DOM
// --> It involves only updating the affected area instead of repainting the whole DOM again


//?? Process :-
// --> React keeps a lightweight, in-memory representation of the DOM called the Virtual DOM (VDOM)
// --> It’s more like a data structure describing what the UI should look like.
// --> During the Render phase, it builds the VDOM tree in memory

//?? Role of State variable :-
// --> Whenever a State variable value is updated :
// --> it tells React to create a new Virtual DOM with updated changes by rendering the component
// --> Through diffing algo, the difference is identified between the new Virtual DOM and the old Virtual DOM
// --> That specific  change is then updated in Actual DOM through best efficient way (React Fibre)

//? The above process is called Reconciliation



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Some points about State

// a) State is mutable (can change) unlike props
// b) State changes cause re-rendering of the component
// c) State object is only created for a component if it uses State

//? d) Each component has its own state
// --> Changing one component’s state doesn’t affect another



//?? Note:-
// --> Every component when rendered using component tag, has its own State
// --> Hence, if we render the same component multiple times.

<>
  <Card />
  <Card />
  <Card />
</>

// --> Each one has its own independent State variables, even though they use the same code

//?  e.g :-
// If the card component has a button and clicking on the button the State changes for a count variable in <h1> tag


const Card = () => {
  const [count, setCount] = useState(0)   // State variable
  const increment = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Click me</button>
    </div>
  )
}


// In some other component file
<>
  <Card />
  <Card />
</>


// --> Now the <Card> component will be rendered twice
// --> Means one <h1> and <button> for each <Card/> will be rendered in UI
// --> Hence, if we just click on the button from the first <Card/>
// --> The <h1> tag from only the first component will be updated and not of the second component
// --> i.e the count variable of only the first <Card/> will be updated.

//?? This means for every component rendered, separate State object is created containing its own state variables.
