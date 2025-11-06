//?? useReducer() hook :-

const { useReducer } = require("react")

// --> It is also a state management hook like useState()
// --> It is used when state logic becomes complex or
// --> when future state depends on previous state 

// e.g :-
// Count Value
// --> Increment, Decrement, Reset

//? OR

// --> When multiple states always change together or depend on each other

// e.g :-
// A Cart Item in E-commerce

State:
quantity
price
totalPrice

// When quantity changes:
// Update quantity ✅
// Update total price ✅



//? When to use useState() vs useReducer() :-
// Simple state :- useState()
// Multiple states that depend on each other :- useReducer()


//?? When to use useReducer() vs Redux :-
// --> It is a small and light-weight version of Redux
// --> For small apps we can use useReducer()


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Updating object through useState() :-

// --> Create a State variable with an object as a value
const [abc, setAbc] = useState({ count: 1, count2: 1 })


// --> Suppose on clicking the button
// --> We try to update the count property in the object


// Scenario 1 (without using set()):-
abc.count = abc.count + 1;
console.log(abc);

// Will the UI update?
// --> No, it will not update


//?? ********************************** */

// Scenario 2 (using set()):-:-
abc.count = abc.count + 1;
setAbc(abc);

// Will the UI update?
// --> No, it will still not update

//?? Reason :-
// --> React's set() always checks if there is some change in the address passed to it
// --> Then only it re-renders the component
// --> Here, we are passing the same object in the set()
// --> Hence, same address is passed in the set() again & again


//?? ********************************** */

// Scenario 3 (Passing new object in set()):-:-

setAbc({ count: state.count + 1, count2: 1 });
// or 
newObj = { count: state.count + 1, count2: 1 }
setAbc(newObj)


// Will the UI update?
// --> Yes now it will happen


//?? Reason :-
// --> Since we are passing a new object
// --> And every new object is created in a new address
// --> Hence, different address is passed in the set() 
// --> Hence, React re-renders the component


//?? Summary :-
//* Primitive Data types :-
// --> For primitive types, every value is created in a different address.
// --> The variables pointing to the same value point to the same address
// --> Hence, when a new value is passed, a new address is passed
// --> Hence React re-renders the component.


//* Objects :-
// --> For objects also, React doesn't compare the properties between previous and new object
// --> It checks whether the address of the new object is different than the new object's address or not


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Syntax of useReducer() :-

// --> It mainly accepts two arguments :-
// a) reducer       :- Function that decides how state updates
// b) initialState  :- Initial value of State (any data type, object, array, etc)


// --> It returns an array of two elements
// a) state         :- Current value of state
// b) dispatch      :- Function used to send (action) to reducer


//?? What is an action that we send from dispatch?
// --> It is a JS object
// --> It tells the reducer what change to make in state


//?? "type" property in action:-
// --> The action object has a "type" property
// --> The value for this property is the type of action we are performing on the State

// e.g :-
{ type: "increment" }
{ type: "decrement" }
{ type: "reset" }

// --> Hence, the reducer reads this type and decides how to update state.


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

// ?? 4) initialState passed in useReducer():-

// --> Create a normal JS object
// --> And store it in a variable
// --> Pass that variable in the initialState argument of useReducer()


//?? Note :-
// --> we normally use the initialState as an object only
// --> For normal data types we generally use useState()

let initialState = {
  count: 0,
  count1: 0
}

const [state, dispatch] = useReducer(reducer, initialState);


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

// ?? 5) "state" variable returned from useReducer():-

//--> It is the variable with most updated value of the initialState variable passed as argument in useReducer()

//--> It is used to actually use the updated value or render that value

const App = () => {
  const initialState = { count: 0 }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <h1>Count : {state.count}</h1>
    </>
  )
}

//?? NOTE :-
// --> We cannot render the "state" variable from useReducer(), until we define the reducer()


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 6) dispatch() returned by useReducer() :-

// --> The function call that is used to send(action) to reducer

//?? What is an action that we send from dispatch?
// --> It is a JS object
// --> It tells the reducer what change to make in state
// --> It has two main properties :-

// a) type :-
// --> The value for this property is the name of action (as String) we are performing on the variable

// b) payload :-
// --> Not used much


//?? When is dispatch() called?
// --> Whenever we want to define some action on our variable on the happening of some event
// --> Most commonly used inside the callback of Event Handlers in React.

//?? NOTE :-
//--> It is a function call and not a callback function
//--> Hence don't directly pass it inside the event Handler

// e.g :-

const App2 = () => {
  const initialState = { count: 0 }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <h1>Count : {state.count}</h1>
      <button onClick={() => {
        dispatch({ type: "increment" })
      }}>Increment</button>

      <button onClick={() => {
        dispatch({ type: "decrement" })
      }}>Decrement</button>

      <button onClick={() => {
        dispatch({ type: "reset" })
      }}>Reset</button>
    </>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 7) reducer we passed as argument to useReducer() :-

//--> The function that decides how state updates based on the type action type we dispatch

//--> Whatever value it returns will become the updated value of State


//?? Where to define the reducer function :-
// --> In redux, we define it in a separate file
// --> In small apps, while using useReducer(), we define it in the same component file where we use useReducer()
// --> But outside the component



//?? Syntax :-
//? i) It takes two arguments :-
// a) state = current value of State 
// b) action = type of action passed from dispatch()


//? ii) Inside we use a switch case to decide what updated state value is returned on a particular action
// --> Always return the same state in default value


//? iii) Its return value becomes the updated value of the State 
// --> In case of object as a State, always return a new object
// --> Then only React will re-render the component like in useState() 


function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }

    case "decrement":
      return { count: state.count + 1 }

    case "reset":
      return { count: state.count + 1 }

    default:
      return state;
  }
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 8) How useReducer() updates the UI?

// --> When the dispatch() is called
// --> React calls the reducer function
// --> React re-renders the component when a new updated state is returned from reducer function


//?? Whole code :-

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    case "reset":
      return { count: 0 }
    default:
      return state;
  }

}

const App3 = () => {
  const initialState = { count: 0 };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => {
        dispatch({ type: "increment" })
      }}>Increment</button>
      <hr />
      <button onClick={() => {
        dispatch({ type: "decrement" })
      }}>Decrement</button>
      <hr />
      <button onClick={() => {
        dispatch({ type: "reset" })
      }}>Reset</button>
    </div >
  )
}

