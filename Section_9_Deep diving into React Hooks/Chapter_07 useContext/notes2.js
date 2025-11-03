//?? 1) Multiple Context Providers in the same Component :-

//Let’s say your app needs:
// a) a Theme context (light/dark)
// b) a User context (current logged-in user)
// c) Language context (for translations)

// We can nest them like :-
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const LanguageContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: "Hrithik", role: "Admin" }}>
        <LanguageContext.Provider value="en">
          <Dashboard />
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}


//? Features :-
// a) When a component calls useContext(ContextName), React
//--> Looks for the nearest matching Provider.
//--> Returns the State from the value attribute of that Provider.

// b) Order doesn't matter :-
//--> The <Context.Provider> tags can be nested in any order


// c) Each context works independently:
// --> Updating one context State re-renders only consumers of that context
// --> Others remain unaffected


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? Industry Standard pattern :-

// --> Use the Custom "combined providers" pattern
// --> We can create a wrapper component to simplify nesting
// --> Remember to use the children prop inside the wrapper component


// e.g :-
function AppProviders({ children }) {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: "Hrithik" }}>
        <LanguageContext.Provider value="en">
          {children}
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  );
}