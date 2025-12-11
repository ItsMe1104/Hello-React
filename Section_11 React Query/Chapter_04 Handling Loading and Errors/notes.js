//?? 1) Handling Loading and Error using React Query :-

//?? isLoading :-
// --> tells you whether the query is loading for the first time
// --> It is a boolean returned by  useQuery

//* true = when the query is running for the very first time
//* false = after the initial fetch completes (either success or error)


//?? What if the data is fetched again?
// isLoading remains false
// isFetching becomes true


//********************************* */

//?? error :-
// It is the error object returned by useQuery
// Same as axios
// Hence display the message property of error object


const fetchUsers = async () => {
  const res = await axios.get("URL")
  return res.data
}

// const fetchUser2 = () => {
//   return fetch("URL").then((res) => { return res.json() })
// }

const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
})


//? NOTE :-
// --> Hence, we don't need to create separate states for Loading and error
// --> We can use the Loading and error variables provided by useQuery()
// --> It internally uses State only


//?? For Loading :-
{
  { isLoading === true ? <Loader /> : <></> }
  { isLoading && <Loader /> }
}


//?? For Loading :-
{
  { error && error.message }
}


//?? NOTE :-
// --> In case of Errors, React Query will keep on sending the API request
// --> We can set it to change the no. of times it can retry