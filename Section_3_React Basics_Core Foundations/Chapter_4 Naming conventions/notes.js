//?? 1) Camel case vs Pascal case vs Kebab Cases :-

//? a) camelCase :-
// --> Here, compound words are formed without spaces, with the first letter of each subsequent word capitalized except for the first word.
// e.g :- myVariableName


//? b) PascalCase :-
// --> Here the first letter of each word in a compound word is capitalized, and there are no spaces, dashes, or underscores.
// --> It is also called Upper Camel Case
//  e.g :- MyClassName


//? c) Kebab Case
// --> Here a phrase as a single, lowercase word, with hyphens replacing spaces between words
// e.g :- my-example-name



//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 2) When to use what?

//?? Components :-
// --> Components should be named in Pascal case, else Babel will not understand that it is a functional component
// Hence, it will not be able to convert it into JS


//?? normal functions :-
// --> Camel case


//?? Component file names :-
// --> Pascal Case (same as Component)  :- Best practice
// --> Kebab case


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Transpiler used in vite :-

// --> vite doesn't use Babel as a transpiler (although parcel uses)
// --> vite internally uses ESbuild
// --> But we can manually setup babel and make our project to use Babel as transpiler in vite too



//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? The story of React 17 :-

// --> Before React 17, we had to import React in every component file

import React from "react";

// --> This is because before React 17, Babel use to transpile the JSX using React.createElement()
// --> Hence, it needed the React object to be imported else it couldn't transpile
// --> There are some performance improvements and simplifications that React.createElement does not allow.


//?? Since React 17 :-
// --> The transpilation has changed
// --> Instead of transforming JSX to React.createElement
// --> the new JSX transform automatically imports special functions from the new entry points in the React package and calls them.


// Inserted by the transpiler/compiler (don't import it yourself!)
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}

// --> Hence, now the bundle size reduces

//?? NOTE (VVI) :-
// --> But we would still need to import React in order to use Hooks or other exports that React provides.)