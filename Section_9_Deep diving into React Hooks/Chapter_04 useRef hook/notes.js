//?? 1) useRef() hook :-

//?? Syntax :-
// useRef(a)
// // --> It returns an object
// --> Inside the object, we have the "current" property
// --> a = value we store in the "current" property

// e.g :-
useRef(5)

// Returned object
{
  current: 5
}


//?? Functionality :-
// a) It can create mutable variables which don't re-render the component but persist their values.
// b) To access DOM element directly



//?? How to persist values between renders?
// --> When React re-renders a component (for example, because state or props changed)
// --> all normal variables inside the component are reset (they don’t keep their old values).
// --> But with useRef, the value you store persists between renders — it’s not lost.
