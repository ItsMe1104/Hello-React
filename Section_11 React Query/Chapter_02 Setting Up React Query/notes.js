//?? 1) Setting Up React Query :-

//?? Step 1 (Install React Query):-
// --> Install React Query
// --> In the command prompt type "npm i @tanstack/react-query"


//?? Step 2 (Enable React Query) :-
// --> Go to the root component (main.jsx)
// --> import {QueryClient, QueryClientProvider} as named import from "@tanstack/react-query" package


//?? Step 3 (Create an instance of QueryClient)

const queryClient = new QueryClient;


//?? Step 4 (Enabling Query Client to our App.jsx)
// --> Wrap the App.jsx with the opening & closing <QueryClientProvider> component tags
// --> Then, pass the created instance of QueryClient as a value to the "client" attribute in the  <QueryClientProvider> tag
// --> All the components inside the App, will be able to consume the data provided by the Provider


const queryClient1 = new QueryClient;
<>
  <BrowserRouter>
    <QueryClientProvider client={queryClient1}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
</>



//?? NOTE :-
// --> QueryClient is a class to store the cache, track loading/error states, etc
// --> QueryClientProvider is a component that provides QueryClient instance to our entire app



