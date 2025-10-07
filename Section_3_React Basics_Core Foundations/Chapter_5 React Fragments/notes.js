//?? 1) Does the transpiled code from JSX to JS can be understood by Browser?

// --> No, a lot more things happen behind the scenes
// --> Whenever a React app is made
// --> The transpiled code is taken by module bundlers, like web-pack, rollup (used by vite), parcel
// --> This code is bundled and converted to plain JS code by these bundlers


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Component returns JSX expression with single parent only :-

// --> A component will always return a JSX expression with a single parent element
// --> That parent can have as many children
// --> Hence we always wrap the all JSX elements inside a <div> as the parent element

// e.g :-

const notes = () => {
  return (
    <div>
      <h1>Heyy</h1>
      <h2>Hello</h2>
      <p>Hiii</p>
    </div>
  )
}


//?? Empty fragment :-
// --> Instead of "div" we can also use a simple empty tag <></> called React Fragment
// --> This came since React 17 
// --> It can also act as the single parent element 

const notes2 = () => {
  return (
    <>
      <h1>Heyy</h1>
      <h2>Hello</h2>
      <p>Hiii</p>
    </>
  )
}


//?? Note (Before React 17) :-
// --> Before React 17, to use this fragment
// --> We had to import React
// --> Then use the React.Fragment inside the tags

import React from "react"
const notes3 = () => {
  return (
    <React.Fragment>
      <h1>Heyy</h1>
      <h2>Hello</h2>
      <p>Hiii</p>
    </React.Fragment>
  )
}


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Why Component returns JSX expression with single parent only :-

// --> This is because this is the only format expected during transpilation of React code
// --> The format used in transpilation takes a single parent element when returned from the component


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) BONUS :-

// --> Install the "Auto Rename Tag" as extension
// --> It will automatically add the closing tag for all our HTML/JSX elements