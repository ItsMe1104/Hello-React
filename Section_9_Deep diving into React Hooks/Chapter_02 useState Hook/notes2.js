//?? 1) Using useState() with Forms :-

// --> Scenario :-
// --> Inside a form, we will create a input tag and submit a button
// --> We will create a state variable as an array
// --> Whatever name that the user types in the input tag, we will put in the array
// --> Whatever elements are present in the array at any instant, we will display on the UI as a list


//?? Step 1 :-
// --> Declare the required state variables
// --> One for taking out the value from the input tag
// --> One array in which all the names from the <input> tag will be stored

const [name, setName] = useState("");
const [nameArr, setNameArr] = useState([])


//************************************** */


//?? Step 2 :-
// --> Define a form inside it
// --> Inside the form put an input tag and a button
// --> The form can be submitted using the button
// --> Hence, put the "onSubmit" handler in form
// --> Put the onClick handler in button and put its type as submit

//   <form onSubmit={}>
//      <input type="text" />
//      <button type="submit" onClick={}></button>
//   </form >



//************************************** */


//?? Step 3 :-
// --> Taking the value from <input> on submit and storing on State variable
// --> We will continuously keep updating the name variable with whatever value is present in the <input> at any instant

//?? onClick Handler
// --> For that we have to put the "onClick" Handler on <input> tag
// --> Inside the handler update the State variable "name" with the current value of the <input> using :-
// --> e.target.value

//?? value attribute
// --> Put the value attribute in the <input> and update it with State variable
// --> so that when State variable updates, the UI in the input tag updates synchronously 


// <input type = "text" value={name} onClick = {handleClick} /> 

const handleChange = (e) => {
  setName(e.target.value)
}


//************************************** */


//?? Step 4 :-
// --> On submitting form, the current value in the <input> tag should be entered in the State variable array 
// --> For this add the onSubmit handler in the <form>
// --> Since we made a button of <submit> type
// --> Hence, our form will itself submit on button click

//? onSubmit handler
// --> Inside the onSubmit handler
// --> first use preventDefault() of the event object, 
// --> It stops the website from automatic loading when the form is submitted
// --> Then inside the handler update the state of the array, by adding the the submitted name from the <input>

//?? Wrong approaches :-
setNameArr(arr.push(name))   // wrong approach

setNameArr(() => {           // wrong approach
  return arr.push(name)
})

// Reason :-
// --> The push() returns the updated length of the array 
// --> Hence the Array State variable would be updated to a mo. and not the updated array itself.



//?? Correct Approach :-
// --> Directly add the new name in the existing array
// --> Use the spread operator on the current array
// --> To use the value of the current array, take help of prevState

setNameArr((prevState) => {
  return [...prevState, name]
})



//********************************* */

//?? Step 5 :-
// --> Once the array is updated
// --> Inside the jsx, use the map() on the array to create <li> items for <ul> from the array elements
// --> This should be done whenever the array is updated with a new element

// --> Give the keys for <li> as index of the array 

// <ul>
{
  newArr.map((item, idx) => {
    return <li key={idx}>{item}</li>
  })
}
// </ul>


//?? NOTE (array as State variable):-
// --> Don't use the array as normal variable
// --> Because then even though the array will be updated every time the submit button is called
// --> But the UI list items will not be updated 
// --> As the component will not be re-rendered for updating normal variable

// --> The list items will only be updated in the UI when the component re-renders on the next State change
// --> The next State change will be done by the onChange handler 

// e.g :-
const notes2 = () => {
  // State variables
  const [name, setName] = useState("");
  const [nameArr, setNameArr] = useState([])

  // onChange Handler
  const handleChange = (e) => {
    setName(e.target.value)
  }

  // onSubmit Handler
  const handleSubmit = (e) => {
    e.preventDefault()   // to prevent reloading the page

    setNameArr((prevState) => {
      return [...prevState, name]; // using spread operator
    })
  }

  return (
    <div>
      {/* OnSubmit handler on Form */}
      <form onSubmit={handleSubmit}>

        {/* OnChange handler on input */}
        <input type="text" placeholder="Enter Name" value={name} onChange={handleChange}></input>

        {/* button to submit the form */}
        <button type="submit">Submit</button>
      </form>

      <ul>
        {
          // Creating list items from array elements
          nameArr.map((item, idx) => {
            return <li key={idx}>item</li>
          })
        }
      </ul>

    </div>
  )
}

