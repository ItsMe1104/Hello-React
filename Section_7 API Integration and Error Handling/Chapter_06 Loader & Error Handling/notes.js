//?? 1) Adding Loaders till response is received :-

//--> Adding Loaders is important to enhance User Experience
//--> We need to add a Loader (animation), till we get the response from the API & show it into the UI

//?? Reason :-
// --> It enhances user experience, if the network is slow
// --> Or there is some glitch, hence user will wait for the data


//?? How to enable a Loader?
// --> There are two ways to do it:-

//? i) Data level :- 
// --> showing other parts of the component
// --> Just showing the loader for the API data

//? ii) Component Level :-
// --> Only showing Loader till we receive the API data
// --> Once we receive, then only we will render all the parts of the component


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 2) Creating a Loader in Data Level :-

//?? Step 1 :- Creating State variable to Load
// --> Create a State which will toggle the Loader using a boolean
// --> Initially pass it as true
// --> Inside useEffect, before calling the API update the boolean State variable for Loader to true
// --> Once we update the State with our data, just update the boolean State variable for Loader to false

const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  setIsLoading(true)
  axios.get("ENDPOINT")
    .then((res) => {
      setData(res.data);
      setIsLoading(false)
    })
}, [])


//***************************** */

//?? Step 2 :- Error handling & turning off the loader
// --> If axios catches some error, it will never go inside the .then() block
// --> And hence we can never set our Loader State variable to false
// --> The loader will stay ON forever

//?? Solution :-
// --> Add a .catch() block and catch the error
// --> set the Loader State variable to false, inside .catch() or .finally()

useEffect(() => {
  setIsLoading(true)
  axios.get("ENDPOINT")
    .then((res) => {
      setData(res.data);
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
}, [])


//***************************** */


//?? Step 3 :- Using Loader State variable to render Loader

// --> Crate a Loader Component
// --> While rendering, just render a Loader component if the Loader boolean is true using Logical AND (&&)

// {isLoading && <Loader/>}


// Whole code :-
const App = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("ENDPOINT")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <ul>{
        data.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })
      }</ul>
    </>
  )
}


//?? Step by Step :-

//?? Initial Render
// --> React calls our component
// --> Since loader is initially set as false, no Loader is seen
// --> No list items appear

//?? useEffect runs()
// --> After commit, the useEffect() runs
// --> Inside it we change the State of Loader to true
// --> Re-render will happen only when all the useEffect() synchronous lines are executed
// --> useEffect() finds the axios for API call as an async task & it will run in background


//?? Re-render due to Loader = true
// --> As useEffect() is over, now re-render will happen
// --> React re-renders with Loader as true
// --> JSX now renders <Loader/> component
// --> Still no list appears

//?? Network call in progress
// --> While the request is still pending
// --> Loader remains visible

//?? Request resolves
// --> We enter inside the .then()
// --> Here we update the State of Data & Loader
// --> Both the re-renders will be merged as one

//?? Re-render due to data = {...} & Loader = false
// --> Loader disappears
// --> List starts to appear with API data 


//************************************* */


//?? Note (Better Version) :-
// --> We can also initially set the Loader State to true
// --> This will load the Loader from the beginning and not after rendering the UI inside useEffect()
// --> And after we get the data we can set it to false

//?? Why better version?
// --> It avoids an extra re-render while setting the Loader State to true inside useEffect()

// e.g :-
const [isLoading1, setIsLoading1] = useState(true);
const [data1, setData1] = useState([]);

useEffect(() => {
  axios.get("ENDPOINT")
    .then((res) => {
      setData1(res.data);
      setIsLoading1(false)
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
}, [])


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Creating a Loader in Component Level :-

// --> Here we want only the Loader to appear from the component in the UI
// --> Rest all the parts of component become visible, only after the data is received & displayed


//?? Solution :-
// --> Instead of rendering Loader inside React fragment
// --> Make the component render the Loader component as a whole if the Loader State is true
// --> If the Loader State is false, means data received
// --> Then render all the parts of the component inside the React Fragment  (<></>)


// Whole code :-
const App1 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("ENDPOINT")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [])

  // Changes
  if (isLoading == true)
    return <Loader />

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <ul>{
        data.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })
      }</ul>
    </>
  )
}


