//?? 4) Accessing DOM elements without useRef() variables

// --> Till now, we always pass a useRef() variable inside the "ref" attribute


//? e.g :-
// const someRef = useRef("")

// <input ref={someRef} />


// ************************************************ */


//?? Passing callback inside "ref"
//--> We can also pass a callback f() inside "ref" attribute dynamically using {}

// --> When the element mounts, React will call that callback f()


//?? Receiving DOM node inside 
// --> The first argument of that callback f()
// --> will receive the DOM node itself on which we applied "ref" attribute

<input ref={(ele) => { }} />

//--> Now we can use that argument & store it in a variable
//--> It can be a normal variable or useRef() variable itself 

//e.g :-

const App = () => {

  const refVar = useRef("");
  const normalVar = null;

  useEffect(() => {
    console.log(refVar.current);
    console.log(normalVar);
  }, [])

  return (
    <>
      <input type="text" name="Input 1" ref={(ele) => {
        normalVar = ele;
      }} />

      <input type="text" name="Input 2" ref={(ele) => {
        refVar = ele;
      }} />
    </>
  )
}


//?? Note :-
// --> When the element mounts, React calls that function and passes the DOM node (el).
// --> When it unmounts, React calls it again with null
