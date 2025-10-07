//?? 1) How to handle events in React?

//?? Event :-
// --> an event is a signal that something has happened within a web page or application
// --> We can react to those events using Event Handlers


//?? React Event Handlers :-
// --> React can perform actions based on user events.
// --> React has the same events as HTML: click, change, mouseover, submit, keyup, keydown, mouseenter etc.


//******************************* */

//? Rules :-

//? a) React events are written in camelCase syntax

// e.g :-
// onClick instead of onclick


//? b) React event handlers are written inside curly braces:

// e.g :-
// onClick = { shoot }  instead of onclick = "shoot()"


//? c) We don't call the function to be executed when the event happens
// --> It is the job of React to call it
// --> we just pass the function name


//? d) We need to create the function within the component


//******************************* */


//?? HTML :-
// <button onclick="shoot()">Take the Shot!</button> 

//?? JSX :-
<button onClick={shoot}>Take the Shot!</button>


// e.g :-
const Football = () => {
  const shoot = () => {
    alert("Great Shot!");
  }

  return (
    <button onClick={shoot}>Take the shot!</button>
  );
}



//******************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 2) Passing Arguments to event handling function :-

// --> To pass an argument to an event handler function :-
// --> Make a function call instead of the function name
// --> Pass the arguments in the function call
// --> Return the function call in an arrow function
// --> Since, the arrow function belongs to JS expression, hence we need to wrap it inside braces

// e.g :-
const Football2 = () => {
  // Receiving argument
  const shoot = (abc) => {
    alert(`Great Shot! ${abc}`);
  }

  return (
    // Passing the argument
    <button onClick={() => shoot("Ronaldo")}>Goal</button>
  );
}


//******************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) React Event Object :-

// --> In React, an event object (Synthetic Base Event) is a special object passed to event handler functions
// --> It provides information in form of properties about the event that occurred like type, target, etc
// type = what type of event happened
// target = which element received the event


//?? How to use the event object :-

//? a) if no arguments are passed to event function :-
// --> The first parameter of the Event handling function will receive this event object

//? b) If "n" arguments are passed to event function :-
// --> The "n+1" parameter of the Event handling function will receive the event object

// --> We generally name it as "e"


//? e.g 1 (Without Arguments):-

const Football3 = () => {
  // Without argument
  const shoot = (e) => {
    console.log("Event Object :- ", e);
    console.log("Type of event :- ", e.type);
    console.log("Target :- ", e.target);
  }
  return (
    // Passing the argument
    <button onClick={() => shoot("Ronaldo")}>Goal</button>
  );
}




//? e.g 2 (With arguments):-

const Football4 = () => {
  // Without argument
  const shoot = (abc1, abc2, e) => {
    console.log("Nice Goal", abc1, abc2);

    console.log("Event Object :- ", e);
    console.log("Type of event :- ", e.type);
    console.log("Target :- ", e.target);
  }
  return (
    // Passing the argument
    <button onClick={() => shoot("Ronaldo", "Messi")}> Goal</button>
  );
}




