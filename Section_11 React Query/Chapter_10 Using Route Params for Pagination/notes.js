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
  <select value={userId} onChange={(e) => {
    console.log(e.target.value);
  }}>
    <option value={null}> Select </option>
    <option value="1"> User 1 </option>
    <option value="2"> User 2 </option>
    <option value="3"> User 3 </option>
    <option value="4"> User 4 </option>
  </select>
}

//?? NOTE (controlled for <select>) :-
// --> Its very important to pass the value attribute inside <select> and link it with the State
// --> So that it becomes a controlled component


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
    <select value={userId} onChange={(e) => {
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

// --> The State variable will be passed to our custom hook for useQuery


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Creating custom hook to call our API :-


//?? Step 1 :-
// --> Create the hook (useTodos) will use React query 
// --> It will fetch the data based on the value we got from <select>
// --> Pass that target value as argument to our custom hook
// --> So that we can build the URL accordingly


// In main file calling the custom hook
const { data: todos, isLoading, error } = useTodos(userId);

// In custom hook.js
const useTodos = (userId) => {

  return useQuery({
    queryKey,
    queryFn
  })
}


//************************** */


//?? Step 2 (Adjusting queryKey):-
// --> Since, we will have different API calls for different userId
// --> We need to make different queryKeys for different API calls in the cache

//?? Best way to make different queryKeys :-
// --> Pass an array to the queryKey
// --> For 1st element, pass any name as string related to URL before queryParameter (e.g users)
// --> For 2nd element, pass the State variable we got from <select>
// --> For 3rd element, pass any name as string related to URL after queryParameter (e.g todos)
// --> This combination can make a unique key

//? e.g :-
// users/1/todos
["users", userId, "todos"]

//? e.g :-
// users/1
["users", userId]



//?? NOTE :-
// --> Don't only pass the State variable (although correct)
// --> As it can lead to having same keys, if we are other types of API requests from same URL

//?? Benefit :-
// --> Whenever the State changes, React re-renders
// --> React Query will check if the cache has a key corresponding to the new State value
// i) If Not, it will make a new request from new URL based on new State variable
// ii) If yes, it will get the data from cache

{
  const useTodos = (userId) => {

    return useQuery({
      queryKey: userId ? ["users", userId, "todos"] : ["todos"],
      queryFn
    })
  }
}

// --> means if userId is null or undefined (WHen the option is "select")
// --> then only save as "todos" in cache

//?? Better way is to use "enabled" property (Step 4), so that the API call is itself not made in case of "null" or "undefined"


//************************** */


//?? Step 3 (using queryParameter in URL):-

// --> Use String Interpolation to attach the received State Variable as query parameter in our URL
// --> Make the API call

{
  const useTodos = (userId) => {

    return useQuery({
      queryKey: ["users", userId, "todos"],
      queryFn: async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        return res.data;
      }
    })
  }
}


//?? NOTE :-
// --> If instead of query Parameter, it was queryString
//? e.g :-
//  https://jsonplaceholder.typicode.com/users/todos?userId=1
// (userId=1 is a queryString)

//! Solutions :-
// --> Every thing remains same, only axios URL will change
// --> Before the "?", we will provide as URL
// --> We will provide an object as a second argument in axios.get() or post(), etc
// --> Then inside the object, we will pass a property "params"
// --> It will take an object as value
// --> Inside that object, pass all the inputs for query Parameters

{
  params: {
    a, b, c            // a=1 & b=5 & c=3
  }
}


// Total example :-
{
  const useTodos = (userId) => {

    return useQuery({
      queryKey: ["users", userId, "todos"],
      queryFn: async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/todos`, {
          params: {
            userId
          }
        });
        return res.data;
      }
    })
  }
}

// --> Make sure that the State variable name matches the query param to be used in the URL

//************************** */


//?? Step 4 (Making API calls only when State is not null or undefined):-

// --> use the "enabled" property in useQuery()
// --> It will make the API call only when some condition is satisfied 

enabled: userId !== null && userId !== undefined;


// e.g :-
{
  const useTodos = (userId) => {

    return useQuery({
      queryKey: ["todos", userId],
      queryFn: async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        return res.data;
      },
      enabled: !!userId
    })
  }
}



//****************************** */

//?? Optimization :-
// --> Directly pass the queryKey inside queryFn
// --> Then extract userId from it and use it in the URL
// --> So that queryFn depends on queryKey and not closure variables

{
  const useTodos = (userId) => {

    return useQuery({
      queryKey: ["todos", userId],
      queryFn: async (queryKey) => {
        const [, userId] = queryKey;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        return res.data;
      },
      enabled: !!userId
    })
  }
}


//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 4) Another Solution to avoid using invalid query params in our URL :-


{
  const useTodos = (userId) => {

    // Checking if userId is in valid
    const params = {}

    if (userId !== undefined && userId !== null) {
      params.userId = userId
    }

    return useQuery({
      queryKey: userId !== undefined && userId !== null ? ["users", userId, "todos"] : ["todos"],
      queryFn: async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/todos`, {
          params: params
        })
      }
    })
  }

  // --> Hence, if userId is invalid, params will be empty and URL will be https://jsonplaceholder.typicode.com/users/todos
  // --> If userId is valid, params will get the required query params

}



//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */




//?? BONUS :-
// --> See the controlled and uncontrolled components in the next notes2.js
