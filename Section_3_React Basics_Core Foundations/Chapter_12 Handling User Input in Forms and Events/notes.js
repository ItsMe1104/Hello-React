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


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */

//?? 3) Controlled Components :-

// --> The React component that renders a form input whose value is controlled by React state

// --> React is the single source of truth for the form’s data.

// --> So instead of the DOM managing the input’s value, React manages it through useState()


//********************** */


//?? Concept :-

//? a) value attribute in HTML

// --> the value attribute specifies the initial value of the <input> tag.
// --> We can still edit the value in the input tag

<input value="John" />



//? b) value attribute inside component
// --> If we use an input tag and we give the "value" attribute and specify its value
// --> Then the whole <input> tag will be freezed and we won't be able to update any value in the <input> tag

//?? Moreover React will give a warning in the console

// e.g :-
const notes1 = () => {
  return (
    <div>
      <input type="text" value="John" />
    </div>
  )
}


//?? Why it gets freezed?
// --> React puts some eventHandler in the whole component such that <input> tag cannot change on input event
// --> This is done because the initial value of <input> tag is rendered in UI 
// --> whatever the value we enter in input tag, will again be seen in the UI
// --> Hence, we want React to be the single point of truth

// In JS, we can implement that as
const input = document.querySelector("#inp");
const val = input.value;

input.addEventListener("input", (e) => {
  e.target.value = val;  // It will always stay the same value
})


// In JS, we want to implement snap back
// --> such that even after updating in input_field
// --> when the focus comes out of the text area
// --> the value inside the input field snaps back to original value

input.addEventListener("change", (e) => {
  e.target.value = val;  // It will always stay the same value
})


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */

//?? 4) Solution to the above problem :-

// --> How to unfreeze the <input> if we have passed the value attribute inside it
// --> React wants that the value attribute to be controlled by State
// --> Hence instead of hardcoding or using normal variables 

//* React wants State variable to reference the value attribute

//? Step1 (create State variable):-

const [val1, changeVal1] = useState("");
<input type="text" value={val1} />


//? Step2 (use onChange handler to update State) :-
// --> Inside the onChange handler update the State variable to the current value in the text area

// e.g :-
const notes2 = () => {
  const [val2, setVal2] = useState("");

  const handleChange = (e) => {
    setVal2(e.target.value)
  }
  return (
    <div>
      <input type="text" value={val2} onChange={handleChange} />

      <h1>{val2}</h1>   // (Optional) will display whatever text currently in input (2-way data binding)
    </div>
  )
}


//?? Note :-
// --> For <input> tag in React we mostly used onChange() handler only for 90% operations
