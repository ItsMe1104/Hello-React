//?? 1) Some facts about event object :-

// --> e.target === DOM element where the event happened

// --> We can get any attribute of the DOM element from the event object


// e.g :-
<input
  type="text"
  name="username"
  placeholder="Enter your name"
  onChange={handleInput}
/>

function handleInput(e) {
  console.log(e.target.type);          // text
  console.log(e.target.name);          // username
  console.log(e.target.placeholder);   // Enter your name
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 2) When a form is submitted :-

// a) When a button with type = "submit" is clicked even with or without onClick Handler

//?? NOTE :-
// --> A button without any "type" attribute is by default of type = "submit"


// b) When an <input> is of type = "submit"


// c) When form.submit() is called using JavaScript
document.getElementById("myForm").submit();


// d) Clicking on input type="image" submits the form too


//********************* */

// ?? How to prevent form submission :-
// --> Use the preventDefault() method of event object for the event "submit" on form

//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Using useReducer with form fields

// a) Create a form with 3 input fields :- name, email, age
// b) Give the specific name attributes to <input> as name, email,age
// c) There should be a button to submit the form
// d) On form submission, all the data from the 3 fields should come in console
// d) There should be a button that should reset the form fields


const UserForm = () => {

  const initialState = {
    name: "",
    email: "",
    age: ""
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  }

  const handleChange = (e) => {
    dispatch({
      type: "update",
      field: e.target.name,
      value: e.target.value,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" value={state.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="email" value={state.email} onChange={handleChange} />
        <input type="text" name="age" placeholder="age" value={state.age} onChange={handleChange} />

        <button>Submit</button>
        <button onClick={() => {
          dispatch({ type: "reset" })
        }}>Reset</button>
      </form>
    </>
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value }
    case "reset":
      return {
        name: "",
        email: "",
        age: ""
      }
    default:
      return state;
  }
}


//?? What is happening :-

//? a) initialState object
// --> We set name,email,age properties in an object

//? b) useReducer()
// --> Defined a useReducer() with the initialState


//? c) "name" attribute in <input>
// --> Here, we gave the "name" attribute to differentiate the input fields from one another
// --> As later we will define a single onChange() Handler for all input fields
// --> So this name attribute will help to identify which <input> got the event
// --> And the property related to that particular <input> will be updated in our state object


//? d) Submit button
// --> Since no, "type" attribute is there
// --> Hence it will submit the form on a click
// --> Hence, we put a onSubmit() handler in the form
// --> Inside that, we prevented the default behavior of form to reload on submission
// --> And we printed whatever the current values of our state object


//? e) Reset button :-
// --> It is having a onClick() handler such that when clicked
// --> It will use the dispatch() method to send an action to reducer function
// --> so that all the properties of that state object can be reset


//? f) <input> fields
// --> Each input field is having a "value" attribute attached the properties of State object
// --> Such that the whatever we type inside <input> is synced with the state object
// --> Since we are using the "value" attribute, we have to use the onChange() Handler
// --> Else we cant type anything in <input>


//? g) onChange()
// --> We are having the same Event Handler for all <input>
// --> The handleChange() is also same for all <inputs>
// --> Whichever input field we are typing in
// --> The handleChange() for that input field will send the current value to the reducer function
// --> So that the value can be updated in the state object by reducer
// --> To identify which property of the State object we need to update
// --> We are sending the e.target.name to the action object inside dispatch()
// --> It will identify which input field value needs to be updated in input field


//? h) reducer function

// --> we are updating only a specific property value among name.email,age of the state object at a time
// --> Whenever the reducer function is called by the dispatch()
// --> To identify which action among "update" and "reset", we switch cases among action.type
// --> We are creating a new object whenever a single character in any field is types
// --> We are replacing the old state object with this new object
// --> This ensures state is immutable
// --> As we never modify the old object directly — a rule in React)
// --> For updating only the specific property value each time reducer function is called
// --> We are using the "field" property of action object, which tells which <input> is requesting a change
// --> We are using the "value" property of action object, which tells the updated value for that property
// --> We are using the spread operator to copy all the key-value pairs from old state object
// --> And update the new value only for the existing specific property

//?? e.g :-

// action object
{
  type: "update"
  field: "email"              // e.target.name
  value: "example@gmail.com"  // e.target.value
}


// Inside reducer
// { ...state, [action.field]: action.value }
// { ...state,  email: "example@gmail.com" }


// ==> Looks at the input’s name attribute ➝ "email"
// ==> Uses it as a key in the object
// ==> Update the value for that key

// ==> Copy old state → { name, email, age }
// ==> Override the property that changed


//?? Question
// Q) why are we using [] in [action.field]: action.value
//==> To make the property name dynamic
//==> { action.field: action.value } would create a property named "action.field"

//==> With [],
// ==> JavaScript evaluates what's inside the brackets first
// ==> Uses the result as the property name