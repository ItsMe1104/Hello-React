//?? 1) useImperativeHandle hook :-

//--> sometimes we don't want the parent to access DOM directly
//--> But send custom methods from child to parent using that ref
//--> That is done using useImperativeHook()


//?? Note :-
// --> It is used along with forwardRef()


//?? Summary :-
// --> Instead of exposing the JSX elements to parent
// --> We will expose custom methods of child to parent to manipulate that jsx element


//?? e.g :-
// --> Exposing focus() & clear() from child to parent
// --> Instead of exposing the entire <input> jsx element


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? Using useImperativeHandle() hook :-

//? a) Importing :-
// --> Import it as a named import from "react" package

import { useEffect, useImperativeHandle } from "react";


//******************************** */

//? b) Syntax :-

useImperativeHandle(a, b)
// a = "ref" that we got from Parent in Child's 2nd argument
// b = callback function returning an object


//?? Note :-
// --> Inside that object we will create the custom methods we want Parent to access using key-value pairs


//? e.g :-
useImperativeHandle(ref, () => {
  return {
    focusInput: () => { },
    clearInput: () => { }
  }
})


//?? Prerequisites :-
// --> First use the forwardRef() in Child component
// --> Then create useRef variables in the child component whose methods we want to expose to Parent


//?? Why creating useRef() variables?
//--> Because inside the custom methods we create, we might need the DOM elements itself
//--> Hence, we will store those DOM elements in useRef variables



//?? Note :-
// --> We will not pass the parent's "ref" inside the ref attribute of jsx elements in Child

// --> We will pass the parent's "ref" inside the useImperativeHandle()

// --> We will only use the "ref" attribute in jsx elements to reference the useRef variables in Child



//?? How the Parent will receive it?
// --> the useRef() variable that Parent passes inside the "ref" attribute of the Child component tag
// --> That useRef variable will receive the object returned by the callback of useImperativeHandle()


// --> We can use that useRef variable in Parent to access those methods



//**********************************8 */


//?? Difference between Parent's useRef() variable and Child's useRef() variable

//--> Child's useRef() variable is used to reference the Child's jsx elements to use in the custom methods

//--> Parent's useRef() variable is used to as a reference send to the Child's component
//--> It is what will let the Parent access the custom methods. 




//?? e.g :-

// Child :-
const Child = (props, ref) => {

  // To reference the <input> jsx element within Child
  const inputEle = useRef("");

  // To create custom methods and expose to Parent
  useImperativeHandle(ref, () => {
    return ({
      focusInput: () => {
        inputEle.current.focus();
      },
      clearInput: () => {
        inputEle.current.value = "";
      }
    })
  })

  return (
    <>
      <input type="text" name="Input1" ref={inputEle} />
    </>
  )
}


// Parent
const Parent = () => {

  // passed as reference to Child to access custom methods
  const inputEleMethods = useRef("")

  useEffect(() => {
    console.log(inputEleMethods.current);
  }, [])

  return (
    <>
      <Child ref={inputEleMethods} />

      <button onClick={() => {
        inputEleMethods.current.focusInput();
      }}>Focus</button>

      <button onClick={() => {
        inputEleMethods.current.clearInput();
      }}>Clear</button>
    </>
  )
}



//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) BONUS :- useRef() hooks similarity in class components :-

// --> In class component we have createRef() method from React

class App extends Component {
  inputRef = createRef();
  //...
}



