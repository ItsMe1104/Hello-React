
//?? 1) Calling API inside React App :-

// --> Either we can use fetch with .then()
// --> Or we can use async & await (Modern Syntax)

//?? Prerequisite :-
// --> Go to JSON placeholder API
// --> Use the endpoint (https://jsonplaceholder.typicode.com/users)


//?? Methods :-
// a) Using fetch() with .then()
// b) Using axios


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//? 1) METHOD 1 (Using fetch() with .then()) :-
// --> Making the API call on 1st render only
// --> We have to update the State inside .then() only


//?? NOTE (optional chaining) :-
// --> Always use optional chaining (?) while displaying the API data using map()
// --> Though it is required only when we defined the initial State of data to be null or undefined
// --> It will work fine if the initial state of data is declared as []
// --> But still it is good practice to have optional chaining

// e.g :-
data?.map(() => {

})


//?? Why Optional Chaining Required?
// --> Because in the first render, data will be undefined (since the initial State is undefined) 
// --> hence we cannot use map() on it
// --> Only on the re-render, the state, will be updated with the API data 



// Whole Code :-

const App = () => {

  const [data1, setData1] = useState([])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);  // prints the data
        setData1(data);     // setting data inside .then()
      })
  }, [])

  return (
    <>
      <h1>Users :-</h1>
      <ul>
        {data1?.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//? 2) METHOD 2 (Using axios() library and then()) :-

// --> Mostly used in industry
// --> Use it inside useEffect()

//?? Step 1 (Install axios) :-
// --> In the console use "npm i axios"


//******************** */


//?? Step 2 (Using get method) :-
// --> The axios object has all the HTTP methods as its properties
// --> We can use the methods using dor operator (.)
// --> Inside the HTTP methods pass the Endpoint URL.

axios.get("ENDPOINT")


//******************** */


//?? Step 3 (Getting response object):-
// --> the HTTP methods in axios return a Promise
// --> The Promise contains the response object as resolved state
// --> Get it as argument of then()

//?? Response object :-
// --> It is slightly different from response object of fetch()
// --> It contains metadata about the response data
// e.g :- data, status, headers, etc

axios.get("ENDPOINT")
  .then((res) => {
    console.log(res);
  })


//************************* */


//?? Step 4 (Getting actual data):-
// --> The "data" property of the response object here, contains the actual data
// --> We can use it inside then()
// --> We can update the State inside then() only

//?? NOTE :-
// --> Don't return the actual data from then()
// --> then() only returns a promise

const [data2, setData2] = useState([])
useEffect(() => {
  axios.get("ENDPOINT")
    .then((res) => {
      console.log(res.data);
      setData2(res.data);
    })
}, [])


//****************************** */


//?? Step 5 (Error Handling) :-

// --> To catch an error in Axios
// --> We use .catch() just like with Promises
// --> It takes a callback fn() as argument which receives the Error object thrown by axios


//?? NOTE :-
// --> Unlike fetch, Axios throws errors for non-200 codes (like 404,500,401) in catch() block

useEffect(() => {
  axios.get("ENDPOINT")
    .then((res) => {
      console.log(res.data);
      setData2(res.data);
    })
    .catch((err) => {
      console.log(`Error Message :- ${err.message}`);
    })
}, [])


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 4) Benefits of axios over fetch() :-

// i) Actual data in fewer steps (using 1 less then())
// ii) It automatically throws error to the catch() block for non-200 status codes also.  






