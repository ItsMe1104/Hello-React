//?? 1) Prop drilling :-

// --> Let's say there is huge hierarchy of components
// Parent --> Child1 --> Child2 --> ... --> ChildN

// --> How to pass the data from Parent to ChildN


//?? Way 1 (via props):-
// --> Passing the same props through each level of Components from Parent to ChildN
// --> This is called prop drilling

//?? Disadvantage :-
//--> Intermediate components do not directly use that data
//--> Reduced Readability & Maintainability :- Tracking where a prop came from & where it is used becomes difficult.


//?? Solution :-
// a) React Context API
// b) State Management Libraries (Redux, Zustand)


//?? Note :-
// --> Using these solutions, we can directly send the data from Parent to ChildN


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) How to use React Context API :-

// --> Three Steps :-
// a) Create the Context
// b) Provide the context  (through Producer)
// c) Consume the context  (through Consumer)


//?? Creating the context :-

// a) Create directory
// --> First create a directory "context" (Good Praxtice)
// --> Here we will keep all our created contexts

// b) Create a js context file
// --> e.g :- UserContext.js, ThemeContext.js, etc

// c) Creating the context
// --> import the createContext method from react package
// --> Call that method and store in a variable
// --> Pass any value inside it (by default undefined) 

