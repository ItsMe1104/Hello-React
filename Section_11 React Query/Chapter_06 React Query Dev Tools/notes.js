//?? 1) React Query Dev Tools :-

//?? Step 1 :-
// --> First install it using "npm i @tanstack/react-query-devtools"
// --> Then import {ReactQueryDevTools} as named import from "@tanstack/react-query-devtools"

//?? Step 2 :-
// --> In the root level file (main.jsx)
// --> Use the <ReactQueryDevTools/> component tag just below <App/>

{
  <BrowserRouter>
    <QueryClientProvider>
      <App />
      <ReactQueryDevTools />
    </QueryClientProvider>
  </BrowserRouter>
}


//?? Step 3 :-
// --> In the Browser page, in the below right corner, we get a icon
// --> Click on it to open React Query Dev Tools
// --> We can see the data present in the cache tagged to the queryKey
// --> We have options to Refetch, Trigger Loading, Trigger Error, etc

// --> We can control, modify, delete the API data as a test purpose

// --> The garbage collector (gcTime) is by default set to 5mins
// --> If it expires React Query removes the cached data completely


//?? Controlling gcTime :-
// --> We can define individual gcTime or independent APU calls
// --> Just use one more key-value pair inside the object argument of useQuery()

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  gcTime: 1000 * 60 * 2, // keep cached data for 2 minutes
});