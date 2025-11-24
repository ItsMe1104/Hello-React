
//?? 1) Calling API inside React App :-

// --> Either we can use fetch with .then()
// --> Or we can use async & await (Modern Syntax)

//?? Prerequisite :-
// --> Go to JSON placeholder API
// --> Use the endpoint (https://jsonplaceholder.typicode.com/users)


//?? Methods :-
// a) Using fetch() with .then()
// b) Using fetch() with async await
// c) Using axios


//? METHOD 1 (Using fetch() with .then()) :-
// --> Making the API call on 1st render only
// --> We have to update the State inside .then() only

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
        {data1.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </>
  )
}





