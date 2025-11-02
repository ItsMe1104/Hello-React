//? 1) Company Standard Code for Context API :-

// a) While creating the context :-
// --> We will create both a custom Provider component for Provider
// --> We will also create a custom hook for useContext() to be consumed by the Consumer


//?? Setup :-
// --> Go the the file where we created the Context (e.g ThemeContext.js)
// --> Change it to jsx as we will be creating the Provider Component here


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Creating the Custom Provider Component :-

//?? Step 1 (Creating the Custom Provider Component):-
// --> Create a component named like ThemeContextProvider, UserContextProvider
// --> Use the "props" parameter
// --> Extract the "children" prop as well as other props sent to this Component

//?? Note :-
// --> We can destructure the required props on the go

const ThemeContextProvider = ({ children, themeDetails }) => {
  return (
    <></>
  )
}


//******************** */


//?? Step 2 (Returning From Custom Provider Component) :-
// --> Return whatever ".Provider" component tag we used in the Provider earlier 
// --> Cut-paste the same tag (opening & closing) along with the same "value" attribute 
// --> Inside the value attribute, pass the other prop that we extracted in our custom Provider component 
// --> other than children prop

value = { themeDetails }

//--> Pass the children prop inside it dynamically using {}


//?? What are Children props?
// --> Whatever (components, text) we put inside the opening and closing tag of a component
// --> Comes as children prop inside the prop object


// e.g :-
const ThemeContextProvider1 = ({ children, themeDetails }) => {
  return (
    <ThemeContext.Provider value={themeDetails}>
      {children}
    </ThemeContext.Provider>
  )
}

//?? Note :-
// --> Here ThemeContext from ThemeContext.Provider comes from context
// --> that we created and exported using createContext()


//****************************** */


//?? Step 3 (Export the custom Provider Component) :-

// --> Export the custom Provider Component 

export const ThemeContextProvider2 = ({ children, themeDetails }) => {
  return (
    <ThemeContext.Provider value={themeDetails}>
      {children}
    </ThemeContext.Provider>
  )
}


//****************************** */


//? Step 4 (Importing the custom Provider Component)

// --> In our Provider component (e.g App.jsx)
// --> import the custom Provider Component

import { ThemeContextProvider2 } from "location/ThemeContext.jsx"


// --> Replace the earlier "Context.Provider" closing and opening tag
// --> With the custom Provider Component opening and closing tag
// --> Whatever state we passed inside the "value" attribute of the "Context.Provider"
// --> Pass the same as some normal prop in our custom Provider component tag


const App2 = () => {

  const [name, setName] = useState("Hrithik")
  return (
    <>
      <ThemeContextProvider themeDetails={{ name, setName }}>
        <Card1 />
        <Card2 />
        <Card3 />
      </ThemeContextProvider>
    </>
  )
}


//?? Note :-
// a) For State
// --> It will be passed as a prop to our custom Provider Component tag
// --> It will be received as a normal prop inside our custom Provider component
// --> The same prop will be passed inside the "value" attribute of the "Context.Provider"
// --> Inside the custom Provider Component


// b) For Child components
// --> They will be wrapped by the custom Provider Component tag
// --> They will be passed as the children prop inside our custom Provider component
// --> The children prop will then be rendered inside the  "Context.Provider" of the custom Provider Component


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Custom useContext() for Consumer :-

// --> In the consumers :-
// --> We directly used the useContext() hook and passed the required Context to get the State
// --> Here we will create the custom useContext() hooks for separate Contexts


// --> Inside the file where we created that context
// --> Create a custom hook