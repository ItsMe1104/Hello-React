//?? 1) useQuery() Hook :-

// --> It is a React Hook provided by React Query
// --> It simplifies data fetching, caching, etc


//?? Importing useQuery()
// --> Import {useQuery} as named import from ""

//?? Fetching data using React Query :-
// --> So that the states we provided to store the API data, can be neglected



//?? Syntax (For fetching Data) :-

const { a } = useQuery(b)

// a = returned data from the API call
// b = object that contains the queryKey, queryFn as properties



//?? object argument we pass in useQuery :-
// --> It will have two main properties

// a) queryKey :- 
// A unique key that identifies the query in the cache (Must be an array)
// --> Next time (if the component unmounts and then mounts) the data will come from this cache & not from server


// b) queryFn :- 
// The fn() that actually fetches data (Must return a Promise)
// --> Since, fetch or axios return a Promise, directly return them from a fn()

useQuery({ queryKey: [], queryFn: () => Promise })



//?? e.g (using with fetch) :-
// --> Using fetch, just return the response in json

{
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetch("URL").then((res) => res.json())
  })
}


//?? e.g (using with async-await) :-
// --> Using fetch, just return the response in json

{
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async function fetchUsers() {
      const res = await fetch("URL")
      return res.json();
    }
  })
}


//?? e.g (using with axios) :-
// --> return data as we directly get json() here

{
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get("URL").then((res) => { return res.data })
    }

  })
}


//?? e.g (using with axios with async await) :-
// --> Since, using await, no need to use .then()
// --> return data as we directly get json() here

{
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("URL")
      return res.data;
    }
  })
}


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Fetching data with different name other than data :-

// --> What if we are making multiple API calls using different useQuery() in the same component
// --> If we are destructuring the same "data" from both, it will give error
// --> Hence, we need to name it on the go
// --> Just use the ":" followed by new_name while destructuring "data" from useQuery() 


{
  // fetching data as users
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("URL")
      return res.data;
    }
  })

  // fetching data as todos
  const { data: todos } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("URL")
      return res.data;
    }
  })
}


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Displaying data got from useQuery() :-

// --> useQuery also uses State behind the scenes
// --> Hence, when it gets the data via Promise
// --> It will update the State and the component will automatically re-render

//?? NOTE :-
// --> The initial value for State variable for loading the data is "undefined"
// --> Hence, always use Optional Chaining (?) while using map() on it


{
  <ul>
    {
      // Using Optional Chaining
      data?.map((item) => {
        return <li>{item.title}</li>
      })
    }
  </ul>
}


//?? Why Optional Chaining Required?
// --> Because in the first render, data will be undefined (since the initial State is undefined)
// --> Hence we cannot use map() on it
// --> Only on the re-render, the state, will be updated with the API data 
