//?? useReducer() hook :-

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


//?? 2) Syntax of useReducer() :-

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


// ?? 3) initialState passed in useReducer():-

// --> Create a normal JS object
// --> And store it in a variable
// --> Pass that variable in the initialState argument of useReducer()


//?? Note :-
// --> we normally use the initialState as an Object only
// --> For normal data types we generally use useState()