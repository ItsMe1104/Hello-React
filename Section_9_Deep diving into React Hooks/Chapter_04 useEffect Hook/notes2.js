// ?? 1) Right place to call API in React :-

//? Scenario :-
// --> If we want to fetch the data from an API
// --> Store it as a array
// --> Use that array to display in the UI


//?? Approach 1 (Wrong approach) :-
// --> Fetching the data and storing it in normal variable

// --> Fetching the data inside the component using fetch()
// --> Store the result in the array
// --> Now inside jsx, just loop on that array and display the details

const notes = () => {

  const req_data = []     // normal variable

  fetch("API")
    .then((res) => { return resizeBy.json() })
    .then((data) => {
      req_data = data;
    })

  return (
    <>
      <ul>
        {
          req_data.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })
        }
      </ul>
    </>
  )
}

//? Problem :-
// --> Even though the array will be updated
// --> UI will be empty

//?? Reason :-
// --> Fetching API data is an asynchronous call
// --> Hence, it leaves the callStack and goes to the callback queue
// --> And hence the array remains empty
// --> All this while, the DOM is painted with the empty array only
// --> When the API data is loaded into the array, the UI is not updated as its not tracked by React


//?? Solution :-
// --> Define the array as State variable


//************************************* */


//?? Approach 2 (better approach but still wrong) :-
// --> Use State variable array for storing the API data
// --> So that whenever the data is loaded into the array
// --> React re-renders the component and UI gets updated


const notes2 = () => {
  // Using State variable
  const [req_data, setReq_data] = useState([])

  fetch("API")
    .then((res) => { return resizeBy.json() })
    .then((data) => {
      setReq_data(data);
    })

  return (
    <>
      <ul>
        {
          req_data.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })
        }
      </ul>
    </>
  )
}


//? Problem :-
// --> Even though data will come into the UI
// --> There will be infinite API calls
// --> See in the network tab of browser


//?? Reason :-
// --> Since we defined the API call directly inside the component, the API is called on every render

// --> Now, on every API call the set() method is called for array
// --> Hence, the component re renders and again a new API call is made
// --> & again the component will re-render for set() inside it


//? new API Call -> set() -> component re-render -> new API call -> set() -> component re-render ...

// --> This cycle continues with infinite re-renders and infinite API calls


//************************************* */


//?? Approach 3 (better approach but still wrong)

// --> Define the if condition such that
// --> API call is made only if array length = 0

//?? Problem :-
// --> If we make the length of the array again 0
// --> On happening of an event like button click
// --> Then the API will be called again on component re-render
// --> And data will be loaded again on the array
// --> Hence, the array can never be emptied


//?? Solution :-
// --> We want our API to be called only on first render and never after it

//--> useEffect() is called after the component is rendered
//--> Hence, call the API inside useEffect()


//************************************* */


//?? Approach 4 (better approach but still wrong) :-

// -->  call the API inside useEffect()

const notes3 = () => {
  // Using State variable
  const [req_data, setReq_data] = useState([])

  // calling API inside useEffect
  useEffect(() => {
    fetch("API")
      .then((res) => { return resizeBy.json() })
      .then((data) => {
        setReq_data(data);
      })
  })

  return (
    <>
      <ul>
        {
          req_data.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })
        }
      </ul>
    </>
  )
}


//? Problem :-
// --> Still infinite re-renders and API calls


//?? Reason :-
// --> Since useEffect() is used without dependency array
// --> It will be called after every render
// --> Again, after every render, new API call will be called
// --> Again set() from newAPI will be called
// --> Again component will re-render and so on.


//? useEffect(new API Call) -> set() -> component re-render -> useEffect(new API call) -> set() -> component re-render ...

// --> This cycle continues with infinite re-renders and infinite API calls


//?? Solution :-
//--> Pass empty dependency array inside useEffect()
//--> So that it will be called only on first render and not on any re-renders



//********************************************** */


//?? Approach 5 (correct) :-

// --> Pass empty dependency array in useEffect()
// --> So that it only gets called on first render only.

const notes4 = () => {
  // Using State variable
  const [req_data, setReq_data] = useState([])

  // calling API inside useEffect
  useEffect(() => {
    fetch("API")
      .then((res) => { return resizeBy.json() })
      .then((data) => {
        setReq_data(data);
      })
  }, [])

  return (
    <>
      <ul>
        {
          req_data.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })
        }
      </ul>
    </>
  )
}


//?? NOTE :-
// --> Do not pass the State variable array inside the dependency list
// --> Else again infinite re-renders and calls will take place