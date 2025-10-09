//?? 1) Handling forms in React :-

// --> Get an <input> tag with type = "text"

<input type="text" />

// --> Whatever we type in the input box, we can get its value
// --> We have to use the event object
// --> And use the property target.value

handleInput = (e) => {
  let current_Input = e.target.value
}

//? What can be the frequent event on <input> ?
// --> onChange :-
// --> Whenever we type or remove some letter in input box it gets triggered


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Task 1 (Two way Data Binding):-
// --> Create an input tag and <h1>
// --> Whatever current value is there in the input tag, the <h1> tag should show the same at every instant
// --> The <h1> in UI should update simultaneously as we update in the <input> field


//?? Hint :-
// --> Use the state variable in <h1> and update it every time the onChange event gets fired


// Solution :-
const notes = () => {
  const [val, setVal] = useState("");

  const handleInput = (e) => {
    setVal(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={handleInput} />
      <h1>{val}</h1>
    </div>
  )
}
