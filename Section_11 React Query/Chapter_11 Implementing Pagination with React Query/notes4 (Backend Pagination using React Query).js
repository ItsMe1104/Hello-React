//?? 1) Frontend Pagination using React Query :-

//?? Type 1 (only previous and next buttons are there):-

// --> The logic remains almost same as Backend Pagination
// --> Just remove the useEffect() and the fn() for fetching API data
// --> Use React Query to fetch the data


//??! Important points :-
//? i) Since all the variables that we destructure from useQuery() are inbuilt State variables
// --> Hence, remove the State variable for storing API data


//? ii) Since, we will fetch the API data every time our page changes
// --> Pass the "page" State variable in the queryKey
queryKey: ["products", page]


//? ii) Since the API data return an object and inside that the products array and total (for total records)
// --> Hence, for storing both the products array and "total" records
// --> Returning whole API data from queryFn

{
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products/?limit=66")
      const data = res.data;
      return data    // instead of returning just data
    }
  })

}



//! Important Fix :-
//? iii) Since ReactQuery sets the State variable for storing API data to be "undefined" initially
// --> Hence, our app will crash anywhere we are accessing array properties like length, map, etc
// --> Because on first render, the State variable will be undefined


//?? Solution 1 (partial)
// --> Using optional chaining will solve the problem for map(), etc
// --> But places where we are doing calculations using .total, etc cannot be solved using Optional chaining

// e.g :- 
// --> while calculating total no. of pages using equation 
Math.ceil(data.total / 10)        // crash


//?? Solution 2 (Best solution)
// --> Provide a default value for the State variable for storing API data according to the data type received
// --> If we want some properties to anyhow exist along with their values during initial render
// --> mention them along with default values too
// --> Do it while destructuring only

{
  const { data = { products: [], total: 0 }, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products/?limit=66")
      return res.data.products;
    }
  })
}


//?? Solution 3 (Saving initial render via Loader):-
// --> Render only Loader through isLoading variable on initial render, when the State variable for "data" is undefined
// --> Later when the data variable is updated with API data
// --> The Loader will automatically get off

if (isLoading) return <h3>Loading...</h3>;
if (error) return <h3>Error</h3>;

return (
  <></>
)


//! The rest of the code remains same like in previous notes
// notes1 (Backend Pagination using Normal React).js



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */
