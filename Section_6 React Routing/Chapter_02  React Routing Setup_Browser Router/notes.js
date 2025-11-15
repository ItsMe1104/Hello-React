//?? 1) Requirement :-
// --> Inside <App/> we have <Navbar/> & <main> section
// --> Inside our <Navbar/>, list of anchor tags are given
// --> Clicking on those anchor tags, should render that component in the <main> section


//?? Solution :-
// --> To achieve this routing, we need an external dependency called React Router DOM

//?? Why?
// --> Since React offers a single age application
// --> Hence routing through multiple pages is not possible in React
// --> Hence, React Router DOM is used


//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) React Router DOM :-

// --> It is a library that provides routing capabilities for React applications
// --> Routing means handling navigation between different views


//?? Features :-
// --> Create multiple pages in your single-page application
// --> Handle URL parameters and query strings
// --> Create nested routes and layouts, etc


//?? How to install :-
// --> In the console, go to the directory where node_modules are present
// --> Type "npm i react-router-dom"

//?? Hence dependency will be installed in package.json file




//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Browser router, Routes and Route

// ==> To enable routing :-

//?? Step 1 :-
// a) First go to the root file of our app (where we created the root component using ReactDOM.createRoot())
// --> For us :-
// *) Root Component = App.jsx
// *) Root File = main.jsx


// b) import "BrowserRouter" as a named import from "react-router-dom" package
// --> It is a component that enables routing 
import { BrowserRouter } from "react-router-dom"


// c) Wrap our Root component (<App/>) with our <BrowserRouter> component


//**************** */


//?? Step 2 :-

// a) Inside the component where we want to achieve routing
// --> import "Routes" & "Route" as named import from "react-router-dom" package
// --> These are also components

import { Routes, Route } from react - router - dom;



// b) Inside the section, where we want our components to load through routing
// --> Create the starting and ending tags of <Routes>

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes></Routes>
      </main>
    </>
  )
}


// c) Inside the <Routes> tag
// --> create the <Route> tags for each <a> we want to enable routing




// d) Inside the <Route/> tag, pass 2 attributes:-

// i) path :- the same URL path we passed in the "href" attribute of corresponding <a> tag 

// ii) element :- The component tag, we want to load for the corresponding <a> (dynamically using {})

<Route path="/" element={<Home />} />


//?? NOTE (path):-
// --> "/" is base URL for home route
// --> That is the default page that loads when a user visits our website.

// --> Always make sure that the relative URL we are passing in "path" attribute
// --> matches the URL passed in "href" of <a> 



//?? NOTE (element) :-
// --> Whatever component tags we use in the "element" attribute, remember to import them 


// e.g :-
const App2 = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}


