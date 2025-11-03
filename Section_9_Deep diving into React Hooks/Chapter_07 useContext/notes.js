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


//?? 1) What is Context API?

// --> Context API is the entire mechanism for sharing data across components without prop drilling
// --> It is a way to manage state globally through a global store

// --> It includes :-
// a) Creating context 
// b) Providing data 
// c) Consuming data 


//?? Difference between Context API and Redux?
// --> It is lighter than Redux
// --> Best for theme, user auth, etc


//?? 2) How to use React Context API :-
// --> Three Steps :-
// a) Create the Context
// b) Provide the context  (through Producer)
// c) Consume the context  (through Consumer)



//?? Creating the context :-


// a) Create directory
// --> First create a directory "context" (Good Practice)
// --> Here we will keep all our created contexts


//********************* */


// b) Create a js context file (as we won't return any jsx)
// --> e.g :- UserContext.js, ThemeContext.js, etc


// c) Creating the context
// --> import the createContext method from react package as named import

import { createContext, useState } from "react";

// --> Call that method and store in a variable
// --> Pass any value inside it (by default undefined)

const UserContext = createContext();
const ThemeContext = createContext();


// --> export it so that it can be used by Producer and Consumer

export const UserContext1 = createContext();



//?? What does createContext() return?
// --> It returns an object with two main properties
// --> These properties are itself React components

// a) Provider
// b) Consumer (not majorly used in functional components, instead we use useContext())


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Providing the Context :-

// --> Whichever Component will become the producer
// --> All components down the hierarchy will get access to the state provided by the Provider through the Context
// --> And not through their immediate Parent through prop drilling


//?? How to choose the Provider Component?

// --> Choose the best suitable component such that it is common for most lower layer components requiring the same State

// ==> Mostly its the root component (App.jsx)
// ==> Sometimes its chosen as main.jsx also



//?? How to make Provider
// --> First import the Context that we created in our Provider Component

import { ThemeContext } from "./location/ThemeContext.js"

// --> Now create a closing and ending tag of that imported context
// --> Add a ".Provider" in the component tag name

<ThemeContext.Provider> </ThemeContext.Provider>


// --> Now wrap all the components inside our Provider Component with the Context Provider tag

const App = () => {
  return (
    <>
      <ThemeContext.Provider>
        <Card1 />
        <Card2 />
        <Card3 />
      </ThemeContext.Provider>
    </>
  )
}

// --> Whatever State we provide from Provider Component
// --> Can be accessed by all the Components inside the Context Provider Tag as well as all their children down their hierarchy


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Passing State through Provider :-

// --> Create a state using useState
// --> Use an attribute called "value"
// --> Pass both the state as well as its set() as an object dynamically using {}

const App2 = () => {

  const [name, setName] = useState("Hrithik")
  return (
    <>
      <ThemeContext.Provider value={{ name, setName }}>
        <Card1 />
        <Card2 />
        <Card3 />
      </ThemeContext.Provider>
    </>
  )
}


// Note :-
// ==> Here value = {{name,setName}} is a short hand of

// value={{ name: name, setName: setName }}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 4) Consuming the context :-

// --> In whichever child component, we want to use that State
// --> We can access it directly through the useContext() hook


//?? Steps :-
//* a) Import the useContext() hook from "react" package as named import 

import { useContext } from "react";

//* b) Pass the Context that we want to use (here ThemeContext) and store it in a variable 
// ==> Or destructure the States on the fly

const Theme = useContext(ThemeContext)
console.log(Theme.name);
console.log(Theme.setName);

// or
const { name, setName } = useContext(ThemeContext)


// --> This is because in an app we might use many Contexts
// --> Sometimes the same component will be used as Provider for different contexts
// --> Hence, we need to tell useContext, which Context we are using


// * c) Now use the States and their set() methods normally like in other components

console.log(name);
setName("Shaw")
console.log(name);




//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 5) Different Components consume the same Context state

// --> Hence, both components will share the same value
// --> Updating the state from any one of them will update it for both
// --> Both will re-render when the state changes


//? NOTE :-
// --> If multiple components consume the same context state, they always stay synchronized
// --> Changing the value of State in one, will automatically change in the other component also



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 6) Disadvantage of Context :-


//==> If one Consumer updates the State through a Context, then all the other consumers using the same Context will re-render
//==> Even if the Producer Component updates the State, then also all the Consumers using that context will re-render

//? This will happen, even if those Consumers extract and use that State through that Context or not


// --> In small apps → no big issue
// --> In complex apps → can cause slow UI and wasted re-renders


//?? Best Solution :-
// --> Use Redux or Zustand