//?? 1) Modernizing Code with async await :-

import { useEffect } from "react";

//--> Converting the old method of using .then and .catch()
//--> To the modern async-await syntax

//?? SOLUTION :-
//--> Create a function expression or normal function (not under useEffect())
//--> Make the normal / arrow function as async
//--> Inside it, get a try{} and catch(){} block
//--> The logic we wrote in .then() will come in try{}
//--> The logic we wrote in .catch() will come in catch(){}
//--> Call the async function inside useEffect()

useEffect(() => {
  fetchData();
}, [])

const fetchData = async () => {
  try { }
  catch (err) { }
}


//?? Steps of using async await :-
//--> Make a async fn(), else it will block the code until the await gets its response
//--> Make a try{} catch() block inside async fn()

//?? Inside try{} :-
// --> Store the response of axios in a variable
// --> Use the "await" keyword before axios
// --> "await" will make the code freeze till the response object is received directly (without a promise)
// --> Now set the Data State variable with the data property of the response object


//?? Inside catch(){} :-
// --> Pass an argument in the catch() block
// --> It will receive the error thrown by axios
// --> Inside it set the Error State variable with the Error message

//? e.g :-

const fetchData1 = async () => {
  try {
    const res_obj = axios.get("URL")
    setData(res_obj.data)
  }
  catch (err) {
    setError(err.message)
  }
}


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Using finally{} block :-

//--> It is always the last block after try{} & catch(){}
//--> It will always run irrespective of which one among try{} & catch{} runs
//--> It is generally used for giving the final message

try {
  //...
}
catch (err) {
  //...
}
finally {
  console.log("Everything went well");
}




//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 3) Important thing about async await :-

//?? async fn()
// --> async fn() always returns a promise 
// --> Whatever we return from async fn() will be wrapped inside a Promise and then returned

async function test() {
  return 10;               // Promise<10>
}

// --> If we throw an Error inside async fn()
// --> It returns a rejected Promise
async function test() {
  throw new Error("Failed");
}


//**************************** */

//?? await :-
// --> async returns a Promise
// ✔ await unwraps the Promise
// ✔ await pauses execution until the Promise finishes
// ✔ This prevents “running ahead” and gives correct timing
// ✔ It makes asynchronous code look like synchronous code (cleaner)

//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 4) Whole code :-

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res_obj = await axios.get("URL");
      setData(res_obj.data);
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false)
      setError(err.message);
    }
    finally {
      console.log("The API call made successfully");
    }
  }
  return (
    <>
      <h1>List of Names :-</h1>
      {isLoading && <Loader />}
      {error && <em>{error}</em>}
      <ul>{
        data.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })
      }</ul>
    </>
  )
}


