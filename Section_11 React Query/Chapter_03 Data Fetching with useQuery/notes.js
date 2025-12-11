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



