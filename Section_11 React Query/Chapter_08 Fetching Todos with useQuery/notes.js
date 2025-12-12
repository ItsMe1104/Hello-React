//?? 1) Example of Fetching API data using useQuery() :-

// In main.js
{
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60 * 1000,
        staleTime: 3 * 60 * 1000,
        retry: 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      }
    }
  })

  {
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevTools />
      </QueryClientProvider>
    </BrowserRouter>
  }
}

//************************** */

// custom_hook.jsx

const custom_Hook = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
    return res.data
  },
  gcTime: 6 * 60 * 1000,
  staleTime: 3 * 60 * 1000,
  retry: 3,
  refetchOnMount: always,
  refetchOnWindowFocus: true,
  refetchOnReconnect: false,
})


// Sales.js

{
  const { data: todos, isLoading, error } = custom_Hook();

  {
    { isLoading && <Loader /> }
    { error && error.message }

    <ul>
      {
        // optional chaining very important
        todos?.map((item) => {
          return <li>{item.title}</li>
        })
      }
    </ul>
  }
}

