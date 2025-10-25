//?? 7) Passing functions inside props :-

// --> We can even pass functions as props from Parent component
// --> It can be received & used as callbacks by the Child component

//?? Ways :-
// Props can be passed :- 
// a) Dynamically as function expression
// b) Directly as callback


//? e.g :-
// Parent :-

const Parent = () => {
  const func1 = (e) => {
    console.log(e.target.value);
  }

  return (
    <>
      <Child callback1={func1} />     // as function expresion
      <Child2 callback2={(e) =>       // as callback
        (console.log(e.target.value))
      } />
    </>
  )

}


// Child :-
const Child = (props) => {
  return (
    <>
      <input type="text" onChange={props.callback1} />
    </>
  )
}

// Child2 :-
const Child2 = (props) => {
  return (
    <>
      <input type="text" onChange={props.callback2} />
    </>
  )
}


//?? How does it work?
// --> Parent passes a function as a prop
// --> The parent does not have direct access to the input.
// --> It only defines a function that can process an event when called

// --> Child attaches it to the input
// --> When the user types, React fires the input’s onChange event.
// --> React automatically calls props.callback2 with the event object as its first argument

props.callback2(e)

// --> Parent’s function gets called
// --> e is the same event object from the child input.
// --> So even though the function is defined in the parent
// --> Parent receives the event object from the child because the child called it.

//?? This concept is called lifting the State Up.



//?? Note :-
// --> Don't think that the callback function defined in parent
// --> Is passed as a reference to the Child
// --> So that the child starts owning the callback function
// --> The child receives a reference to the function, not a copy.


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 8) Why do we pass functions as props?

// --> Why do we need to pass functions as props to Child
// --> We can directly define them inside Child


//?? Lifting the State up :-
// --> In React we can only send the data from Parent to Child via props
// --> But there is a way to use the child's data to parent
// --> This is called Lifting the State Up


//?? How?
// --> We create a function in the parent scope.
// --> That function exists once in memory.

// --> Pass it as a reference to the child
// --> Now inside the child, call that function with the required data

// --> Then that data will be received by the function present in the parent as the parameter
// --> Now inside that function we can do anything in the parent


//?? Note :-
// --> We need to call the function received from the Parent inside the Child component
// --> Then only data will be passed


//? e.g 1:-
const Parent5 = () => {
  return (
    <>
      <Child5 callback2={(abc) => console.log(abc)} />
    </>
  )
}

const Child5 = (props) => {
  props.callback2("Hiii")   // calling the function from child
  return (
    <>
    </>
  )
}

// --> Here the Parent's callback function receives the data "Hiii" in its parameter from the Child component
// --> It happened because the function got called inside Child.


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 9) Other examples of lifting the State up :-

//? e.g 1 :-
// --> We always pass some reference of a function to the onEventHandlers()
// --> We don't need to call that function inside the onEventHandlers() manually

//? React automatically 
// a) calls the function and 
// b) passes the event object as argument during the event 



const Parent6 = () => {
  return (
    <>
      <Child6 callback2={(e) => console.log(e.target.value)} />
    </>
  )
}

const Child6 = (props) => {
  return (
    <>
      <input type="text" onChange={props.callback2} />
    </>
  )
}


//--> Here, the callback function is passed from parent to Child as reference via props
//--> Whenever we type in the <input>
//--> The onChange() gets fired
//--> React automatically calls that callback function with the event object as its first argument.

props.callback(e)

// --> This "e" object is received as data in the parameter of callback function inside the parent
// --> This "e" object is used inside the Parent component


//******************************************* */


//? e.g 2 :-
// --> Using the data from Child inside Parent's State

const Parent7 = () => {
  const [name, setName] = useState("")

  return (
    <>
      <h1>{name}</h1>
      <Child2 callback2={(e) => {
        setName(e.target.value)
      }} />
    </>
  )
}

const Child7 = (props) => {
  return (
    <>
      <input type="text" onChange={props.callback2} />
    </>
  )
}

// --> Here in the starting 
// a) the Parent doesn't have access to the event object
// b) the child doesn't have access to setName() 

//--> Here, the callback function is passed from parent to Child as reference via props
// --> Inside the callback we are updating the State variable using set() method

//--> Whenever we type in the <input>
//--> The onChange() gets fired
//--> React automatically calls that callback function with the event object as its first argument.

props.callback(e)

// --> This "e" object is received as data in the parameter of callback function inside the parent
// --> This "e" object is used inside the Parent component to update the State variable using setName()


//?? Note :-
// --> Here the Child component still doesn't have the access to setName()
// --> This is because the callback function is inside the parent scope



//?? Main purpose of Lifting the State up?
// --> In React, state is local to a component
// --> If multiple children need to read or update the same value, the parent holds the state and passes it down.
// --> Every child passes their data by calling the callback function
// --> The parent updates it accordingly


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 10) BONUS :- JSX to Vanilla JS :-

// --> Browsers doesn't understand modern JS syntax
// --> Browsers only understand vanilla JS

// --> Babel transpile the JSX into a particular modern JS syntax at least if not vanilla JS
// --> But still to convert it into Vanilla JS, bundlers like web pack or parcel will do it while bundling.