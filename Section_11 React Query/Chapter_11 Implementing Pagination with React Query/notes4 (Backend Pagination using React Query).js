//?? 1) Frontend Pagination using React Query :-

//?? Type 1 (only previous and next buttons are there):-

// --> The logic remains almost same as Backend Pagination
// --> Just remove the useEffect() and the fn() for fetching API data
// --> Use React Query to fetch the data


//??! Important points :-
//? i) Since all the variables that we destructure from useQuery() are inbuilt State variables
// --> Hence, remove all the State variable for storing API data
// --> Only the "page" State variable will be present


//? ii) Since, we will fetch the API data every time our page changes
// --> Pass the "page" State variable in the queryKey
queryKey: ["products", page]



//!(Creating the URL with correct limit & offset values)

//? offset/skip :- starting index
// page * limit - limit

//? limit = limit

const URL = `https://dummyjson.com/products?limit=10&skip=${page * limit - limit}`




//? ii) Since the API data return an object and inside that the products array and total (for total records)
// --> Hence, for storing both the products array and "total" records
// --> Returning whole API data from queryFn

{
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      const data = res.data;
      return data;    // instead of returning just data
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
      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      return res.data;
    }
  })
}



//?? Solution 3 (Saving initial render crash via Loader):-
// --> Render only Loader through isLoading variable on initial render, when the State variable for "data" is undefined
// --> Later when the data variable is updated with API data
// --> The Loader will automatically get off

if (isLoading) return <h3>Loading...</h3>;
if (error) return <h3>Error</h3>;

return (
  <></>
)


//! Important Optimization only for React Query (Using "placeholderData" to stop the sudden disappearance of items):-

// --> When the API call is made for new set of items
// --> The old set of items suddenly disappear, making the pagination buttons to climb up till new items are loaded

//?? Solution 
// --> Pass the property "placeHolderData" 
// --> For the value :- pass a callback and return its parameter
// --> Hence, till the new set of items are fetched and rendered, the old items will remain visible on the UI

{
  const { data = { products: [], total: 0 }, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      return res.data;
    },
    placeholderData: (previousData) => previousData
  })
}



//?? iv) Since we don't want our current page to again fetch the API and render again if we click on the same button
// --> Hence put a check on the button click handlers to only fetch and render when the button no. != currentPage

if (page !== idx + 1)
  setPage(idx + 1);


// E.g :-
[...Array(Math.ceil(data.products.length / 10))].map((item, idx) => {
  return <button key={idx + 1} style={{ fontWeight: page === idx + 1 ? "bold" : "normal" }} onClick={() => {
    if (page !== idx + 1) setPage(idx + 1)
  }}>{idx + 1}</button>
})


//?? NOTE :-
// --> Since, we are extracting data directly
// --> Wherever we are using products and total, use data.products & data.total


//! The rest of the code remains same like in previous notes
// notes3 (Backend Pagination using Normal React).js


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? Whole Code :-


const App = () => {

  const [page, setPage] = useState(1);


  const { data = { products: [], total: 0 }, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      const data = res.data;
      return data;
    },
    placeholderData: (previousData) => previousData
  })


  return (
    <>

      {
        data.products?.length > 0 && <div className="products-container">
          {
            data.products.map((item) => {
              return <span key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            })
          }
        </div>
      }

      <div className="pagination-container">
        <button disabled={page == 1} onClick={() => {
          setPage(page - 1)
        }}>⏮️</button>
        {
          [...Array(Math.ceil(data.total / 10))].map((item, idx) => {
            return <button key={idx + 1} style={{ fontWeight: page === idx + 1 ? "bold" : "normal" }} onClick={() => {
              if (page !== idx + 1)
                setPage(idx + 1)
            }}>{idx + 1}</button>
          })
        }
        <button disabled={page == Math.ceil(data.total / 10)} onClick={() => {
          setPage(page + 1)
        }}>⏭️</button>
      </div>

    </>
  )
}
