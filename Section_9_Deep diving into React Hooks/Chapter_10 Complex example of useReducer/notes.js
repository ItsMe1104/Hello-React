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

//?? 2) Using useReducer with form fields

// a) Create a form, which on submit resets all the input fields
// b) There would be three input fields :- name, email, age
// c) Give the specific name attributes to <input> as name, email,age
// d) There should be a button that should reset the form fields

