//?? Controlled & Uncontrolled components :-

// --> This concept is about form elements
// --> As form elements have their own internal state in Browser like :-
// a) <input> → current text
// b) <select> → selected option
// c) textarea> → text value
// d) <checkbox / radio> → checked state


//?? Why?
// --> The browser itself stores some values for certain elements
// --> JS or React never touches them
// --> These values can change over time

// e.g :-
{
  <input type="text" />
}

// --> When we open the HTML file in the browser and type "Hello"
// --> "Hello" is stored not in JS variables, or HTML attributes
// --> Its stored inside the Browser's DOM engine
// --> Hence, Browser itself updates the value fro "" to "Hello"


//?? Other examples :-
// --> Typing in an <input>
// --> Selecting an <option>
// --> Browser autofill
// --> Back/forward navigation restoring form values
// --> Right-click paste


//?? WHy React has problem with this?
// --> As React has its own state system
// --> But for form elements, there are two possible source of truths
// --> Hence, Browser (DOM) and React(state)


//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Controlled components :-
// --> A controlled component is a form element whose value is controlled by React state.

function ControlledInput() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

// ! What happens :-
// --> Value comes from useState
// --> User types
// --> Browser fires event
// --> React updates state
// --> React re-renders
// --> React sets the input value


//?? props to make controlled components :-
// a) value (text, textarea, select)
// b) checked (checkbox, radio)


//?? Problems if React doesn't have control :-
// --> UI & state mismatch might happen as they are not in sync


//! Using Controlled components UI always matches state

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 3) Uncontrolled Components :-

// --> An uncontrolled component stores its value inside the DOM, not React state.
// --> React reads the value only when needed using ref from useRef()

// ! What happens :-
// --> Initial value set using defaultValue / defaultChecked
// --> Browser manages value
// --> React accesses value via ref


function UncontrolledInput() {
  const inputRef = React.useRef();

  const handleClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input type="text" defaultValue="John" ref={inputRef} />
      <button onClick={handleClick}>Submit</button>
    </>
  );
}


//?? NOTE :-
// --> Even if we put onChange() and no "value" attribute, still it will be uncontrolled


//?? Pros :-
// --> No re-render on every keystroke

//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 4) Why React Forbids Switching Control Modes

// ?? Rule :-
// a) We cannot switch a form element from controlled --> uncontrolled & vice versa during its lifetime.
// b) A component is controlled only when React sets its value using value or checked from state.

//?? Reason :-
// --> Ownership confusion (DOM vs React)
// --> Leads to inconsistent UI state


//! React will issue a warning if we try to switch an uncontrolled component to controlled component


//?? Here are the examples :-
// ❌ Having state but no value
// ❌ Using value={undefined}
// ❌ Having both value and defaultValue attribute
// ❌ Switching controlled ↔ uncontrolled
// ❌ Assuming onChange alone makes it controlled


//?? 1) Having state but NO value :-
// State exists
// State updates
// But React never sets the input value
// DOM controls the input → uncontrolled


function StateNoValue() {
  const [name, setName] = React.useState("");

  return (
    <input
      onChange={(e) => setName(e.target.value)}
    />
  );
}


//************************* */


//? 2) (VVI) Using value={undefined}

//--> undefined means “no value prop”
//--> Input becomes uncontrolled

function UndefinedValue() {
  const [name, setName] = React.useState("Amit");

  return (
    <input
      value={undefined}
      onChange={(e) => setName(e.target.value)}
    />
  );
}


//************************* */


//? 3) Having both value and defaultValue attribute:-
// --> value → controlled
// --> defaultValue → uncontrolled
// --> React ignores defaultValue and renders the initial State value
// --> React issues a warning

function MixedValue() {
  const [name, setName] = React.useState("Amit");

  return (
    <input
      value={name}
      defaultValue="Rahul"
      onChange={(e) => setName(e.target.value)}
    />
  );
}


//********************************* */


//?? 4) Switching uncontrolled to controlled due to empty State

// --> No initial State value is defined, hence it will be undefined
// --> Hence, First render: value is undefined → uncontrolled
// --> After typing: value becomes string → controlled
// --> React issues a warning

function SwitchControl() {
  const [name, setName] = React.useState();

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

//********************************* */


//?? 5) Assuming onChange alone makes it controlled
// --> No value prop
// --> Browser controls the selection
// --> React only listens
// --> Still uncontrolled

function OnChangeOnly() {
  const [city, setCity] = React.useState("Delhi");

  return (
    <select onChange={(e) => setCity(e.target.value)}>
      <option value="Delhi">Delhi</option>
      <option value="Mumbai">Mumbai</option>
    </select>
  );
}


//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Controlled & uncontrolled pattern for necessary form elements :-


//! a) Input :-

// Controlled :-
{
  const [name, setName] = useState("");
  <input value={name} onChange={e => setName(e.target.value)} />
}


// Uncontrolled :-
{
  <input defaultValue="John" ref={inputRef} />
}


//******************** */


//! b) Textarea :-

// Controlled :-
{
  <textarea value={text} onChange={e => setText(e.target.value)} />
}


// Uncontrolled :-
{
  <textarea defaultValue="Hello" ref={inputRef} />
}


//******************** */


//! c) select (single option) :-

// Controlled :-
{
  const [city, setCity] = useState("");
  <select value={city} onChange={e => setCity(e.target.value)}>
    <option value="Delhi">Delhi</option>
  </select>
}


// Uncontrolled :-
{
  <>
    <select defaultValue="Delhi" ref={inputRef}>
      <option value="Delhi">Delhi</option>
    </select>

    {/* OR */}

    <select onChange={e => setCity(e.target.value)}>
      <option value="Delhi">Delhi</option>
    </select >

  </>
}




//******************** */


//! d) select (multiple option) :-

// Controlled :-
{
  const [colors, setColors] = React.useState([]);

  const handleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions).map(
        option => option.value
      );
    setColors(values);
  };

  <>
    <select multiple value={colors} onChange={handleChange}>
      <option value="red">Red</option>
      <option value="green">Green</option>
    </select>

  </>
}

// --> "multiple" attribute is necessary to make it select multiple
// --> "e.target" is the <select> element
// --> "e.target.selectedOptions" is a DOM property that returns HTML collection of all selected <option> DOM elements

// e.g :-
e.target.selectedOptions
// → [ <option value="red">, <option value="blue"> ]

// --> Array.from(...) converts HTMLCollection into a real array as arrays allow filter, map, etc 
// --> Or use spread operator

const values = [...e.target.selectedOptions]

// --> After converting into array, we extract the values of those <option> DOM elements using .value




// Uncontrolled :-
{
  <>
    <select multiple defaultValue={["red", "blue"]} ref={inputRef}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </select >
  </>
}



//******************** */


//! e) Checkbox :-

// Controlled :-
{
  const [selected, setSelected] = React.useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(item => item !== value));
    }
  };

  <>
    <label>
      <input
        type="checkbox"
        value="apple"
        checked={selected.includes("apple")}
        onChange={handleChange}
      />
      Apple
    </label>

    <label>
      <input
        type="checkbox"
        value="banana"
        checked={selected.includes("banana")}
        onChange={handleChange}
      />
      Banana
    </label>
  </>
}

// --> "value" :- Which checkbox was clicked
// --> "checked" :- Whether it is checked or unchecked

//?? NOTE :-
// --> Here, we are not controlling "checked" attribute, directly from State variable
// --> But we are deriving it from State "selected" 
// --> User cannot change UI unless React state updates




// Uncontrolled :-
{
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selected = formData.getAll("fruits");

    console.log(selected);
  };

  <>
    <label>
      <input
        type="checkbox"
        name="fruits"
        value="apple"
        defaultChecked
      />
      Apple
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        name="fruits"
        value="banana"
      />
      Banana
    </label>

  </>
}

// --> FormData is a built-in browser object.
// --> Reads all form fields having "name" attribute
// --> Collects their inputs that have:
// ✔ name (input and select)
// ✔ name ans are checked(for checkboxes / radios)

// --> Use .getAll() and pass the "name" to get all the values in the array, belonging to that name


//******************** */


//! e) radio buttons :-

// --> It lets the user choose exactly one option from a group



// Controlled :-
{
  const [gender, setGender] = React.useState("");
  <>
    <input
      type="radio"
      name="gender"
      value="male"
      checked={gender === "male"}
      onChange={(e) => setGender(e.target.value)}
    /> Male

    <input
      type="radio"
      name="gender"
      value="female"
      checked={gender === "female"}
      onChange={(e) => setGender(e.target.value)}
    /> Female
  </>
}

// --> "value" :- Which radio was clicked
// --> "checked" :- Whether it is checked or unchecked

//?? NOTE :-
// --> Here, we are not controlling "checked" attribute, directly from State variable
// --> But we are deriving it from State "gender" 
// --> User cannot change UI unless React state updates




// Uncontrolled :-
{
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedGender = formData.get("gender");

    console.log(selectedGender);
  };

  <>
    <label>
      <input
        type="radio"
        name="gender"
        value="male"
        defaultChecked
      />
      Male
    </label>

    <br />

    <label>
      <input
        type="radio"
        name="gender"
        value="female"
      />
      Female
    </label>
  </>
}