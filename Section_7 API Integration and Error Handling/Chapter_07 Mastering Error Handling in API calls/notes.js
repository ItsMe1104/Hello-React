//?? 1) Error Handling in API calls :-

//?  If any error happens while calling the API :-
// a) The loader should stop in the UI
// b) The Error message should be displayed

//?? Solution :-
// --> Maintain a State variable for Error also
// --> Initially set it to null
// --> Use .catch() in the axios to catch the Error if any


//? If we get any error inside .catch() :-
// a) Stop the Loader by making the Loaders State variable as false
// b) Instead of just logging the Error message, update it in the State variable to render in the UI

axios.get("ENDPOINT")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    setIsLoading(false);
    setError(err.message);
  })


//?? Where to render?
// --> It should be done in the data level (other parts of the component should be rendering)
// --> Add one more Logical AND operator to render the Error State variable in <em> (emphasis tag)

{ error && <em>{error}</em> }


//********************** */

//?? Solution :-

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get("ENDPOINT")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
  }, [])

  return (
    <>
      <h1>List of Data</h1>
      {isLoading && <Loader />}
      {error && <em>{error}</em>}

      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </>
  )
}



