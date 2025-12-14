//?? 1) Exercise :-
// --> Creating a Pagination using a Dropdown menu with numbers
// --> Whatever option we select will be sent as query parameter to our API


//? e.g :-
//? Normal API :- https://api.example.com/users

// DropDown :- 5
// --> Then the todos of 5th user should be displayed using the API

//? New API :- https://api.example.com/users/5/todo


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Creating a DropDown :-


//?? Step 1 :-
// --> To create a drop-down
// a) we will use a <select> tag
// b) Inside that we will use the <option> tag to give options

{
  <select>
    <option> User 1 </option>
    <option> User 2 </option>
    <option> User 3 </option>
    <option> User 4 </option>
  </select>
}


//***************************** */


//?? Step 2 :-
// --> For better UX, for first option, keep the text as "Select"

{
  <select>
    <option> Select </option>   {/* For better UX */}
    <option> User 1 </option>
    <option> User 2 </option>
    <option> User 3 </option>
    <option> User 4 </option>
  </select>
}


//***************************** */


//?? Step 3 :-
// --> To store a value attached to an option
// --> use the "value" attribute
// --> Here the value attached will work as userId for route param

{
  <select>
    <option value={null}> Select </option>
    <option value="1"> User 1 </option>
    <option value="2"> User 2 </option>
    <option value="3"> User 3 </option>
    <option value="4"> User 4 </option>
  </select>
}


//******************************** */


//?? Step 4 :-
// --> On selecting an option, we need to extract its attached value
// --> To know which option got selected
// --> Use "onChange" event handler on the <select> tag
// --> Whenever the Drop Down option gets changed, it will trigger
// --> Extract the value, using e.target.value


//?? NOTE (special property of <select>):-
// --> Even though the onChange() event got triggered on <select>
// --> And e.target = <select>
// --> But, <select> gets the "value" attribute of the selected option (only happens for <select>)
// --> Hence, extract the value attached to selected option using e.target.value

{
  <select onChange={(e) => {
    console.log(e.target.value);
  }}>
    <option value={null}> Select </option>
    <option value="1"> User 1 </option>
    <option value="2"> User 2 </option>
    <option value="3"> User 3 </option>
    <option value="4"> User 4 </option>
  </select>
}


//******************************** */


//?? Step 5 :-

// --> Store the selected option's attached "value" in a State
// --> Initialize the State as null


//?? NOTE :-
// --> e.target.value will give a string 
// --> Convert it to number using Number()

{
  const [userId, setUserId] = useState(null)

  {
    <select onChange={(e) => {
      setUserId(Number(e.target.value))
    }}>
      <option value={null}> Select </option>
      <option value="1"> User 1 </option>
      <option value="2"> User 2 </option>
      <option value="3"> User 3 </option>
      <option value="4"> User 4 </option>
    </select>
  }

}




//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Creating custom hook to call our API :-


//?? Step 1 :-
// --> Create the hook (useTodos) which will use React query to fetch the data based on the the value that we got from <select> tag
// --> Pass that target value as argument to our custom hook
// --> So that we can build the URL accordingly


// In main file calling the custom hook




// In custom hook.js
const useTodos = (userId) => {

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`URL`)
    }
  })
}



//?? Step 2 :-
