//?? 1) Customizing default properties of useQuery() :-

// We can customize default properties of React Query like :-
// i) staleTime
// ii) gcTime
// iii) retry


//?? staleTIme :-
// --> time (in ms) till which fetched data (from API or cache) is considered “fresh”
// --> Once not fresh, React Query will refetch when some trigger happens like :-
// a) component re-mounts
// b) window refocus (when we switch tabs or outside Browser & get back )
// c) network connect (when user reconnects due to network issue)

//?? NOTE :-
// --> It doesn't refetch automatically when the data becomes not fresh


//*********************************** */


//?? gcTime :-
// --> Time (in ms) till which unused query stays in cache before garbage collection
// --> The countdown starts only when the query becomes inactive
// --> Especially when the component using that query unmounts


//*********************************** */

//?? retry :-
// --> how many times to retry failed API calls
// --> default is 4



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Customizing properties for all React Queries in our app :-

// --> We can generalize these properties for all React Queries we used in different components

//?? Steps :-
// --> In our root file (main.js)
// --> While creating an instance of QueryClient
// --> In the constructor function, pass an object
// --> Inside that object, pass a property "defaultOptions" & attach another object to it
// --> Inside that object pass a property "queries" & attach another object to it

// --> Inside the most inner object, define the required properties to be customized and their values

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 360000,          // 6 minutes
      staleTime: 240000,      // 4 minutes
      retry: 9,               // if the API failed, 9 times retry
    }
  }
})



//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 3) Some extra properties of React Query :-

//? a) refetchOnMount
// --> React Query should refetch when a component mounts again if the data is stale.

//? Values :-
// a) true (default) 
// b) false :- do not refetch if the data is stale
// c) "always" (String) :- always refetch, even if the data is fresh


//********************************************* */


//?? b) refetchOnWindowFocus 
// --> Window focus means when the user switches back to your app tab 
// --> React Query should refetch when the user switches back and the data is stale


//? Values :-
// a) true (default) :- Refetch stale queries on window focus
// b) false :- Do NOT refetch when user focuses the tab
// c) "always" (String) :- Always refetch on focus, even if fresh


//********************************************* */


//?? c) refetchOnReconnect
// --> React Query should refetch when the network reconnects ad data is stale

//? Values :-
// a) true (default) :- Refetch stale queries on window focus
// b) false :- Do NOT refetch when user focuses the tab
// c) "always" (string) :- Always refetch on focus, even if fresh



// e.g :-
const queryClient1 = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000,
      staleTime: 3 * 60 * 1000,
      retry: 3,
      refetchOnMount: false,           // do not refetch
      refetchOnWindowFocus: false,    // do not refetch
      refetchOnReconnect: false        // do not refetch
    }
  }
})


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Customize Properties Per Query Separately :-

// --> Pass the properties to be customized & their values inside the object argument passed inside that specific useQuery() hook
// --> The same object argument where we pass queryKey & queryFn

const { data: users, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await axios.get("URL")
    return res.data;
  },
  gcTime: 5 * 60 * 1000,
  staleTime: 3 * 60 * 1000,
  retry: 2,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false
})


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) How to use "," in between numbers according to Number system :-

// --> Use "_" instead of ","

// e.g :- 10,000  --> 10_000

const num = 10_000;
console.log(num);      // 10000
