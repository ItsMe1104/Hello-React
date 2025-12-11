//?? 1) Creating custom Hook for useQuery :-

// --> For every API call through useQuery, we can create a custom hook


//?? Steps :-

//?? STEP 1
// --> First create a component starting with "use" (useUsers.jsx)
// --> Now cut the RHS part of useQuery Syntax along with the fn() used in queryFn (if defined outside)


const fetchUsers = async () => {
  const res = await fetch("URL")
  return res.json();
}

// LHS                                //RHS
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
})



//?? STEP 2 
// --> Paste it inside useUser.jsx
// --> Create a function with the same name as file and export it
// --> return the RHS of useQuery() from it

{
  // useUsers.jsx

  const fetchUsers = async () => {
    const res = await fetch("URL")
    return res.json();
  }

  const useUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: fetchUsers
    })
  }
}


//?? STEP 3
// --> In the main file, import our custom hook
// --> In the main file , instead of getting the data,isLoading, error from useQuery()
// --> Get these by calling our custom hook

{
  // App.jsx 

  const { data, isLoading, error } = useUsers()
}



