//?? 1) Frontend Pagination using React Query :-

// --> The logic remains almost same
// --> Just remove the useEffect() and the fn() for fetching API data
// --> Use React Query to fetch the data


//??! Important points :-
//? i) Since all the variables that we destructure from useQuery() are inbuilt State variables
// --> Hence, remove all the State variable for storing API data
// --> Only the "page" State variable will be present


//? ii) Since the API data return an object and inside that the products array
// --> Hence, for directly storing the array inside the State variable
// --> instead or returning whole API data from queryFn
// --> Return the "data.products"

{
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products/?limit=66")
      const data = res.data;
      return data.products;     // instead of returning just data
    }
  })

}

//! Important Fix :-
//? iii) Since ReactQuery sets the State variable for storing API data to be "undefined" initially
// --> Hence, our app will crash anywhere we are accessing array properties like length, map, etc
// --> Because on first render, the State variable will be undefined

//?? Solution 1 (partial)
// --> Using optional chaining will solve the problem for map(), etc
// --> But places where we are doing calculations using .length, etc cannot be solved using Optional chaining

// e.g :- 
// --> while calculating total no. of pages using equation 
Math.ceil(products.length / 10)



//?? Solution 2 (Best solution)
// --> Provide a default value for the State variable for storing API data
// --> Do it while destructuring only
{
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products/?limit=66")
      return res.data.products;
    }
  })
}



//?? iv) Since we don't want our current page to again fetch the API and render again if we click on the same button
// --> Hence put a check on the button click handlers to only fetch and render when the button no. != currentPage

if (page !== idx + 1)
  setPage(idx + 1);


// E.g :-
[...Array(Math.ceil(products.length / 10))].map((item, idx) => {
  return <button key={idx + 1} onClick={() => {
    if (page !== idx + 1) setPage(idx + 1)
  }}>{idx + 1}</button>
})


//! Important Optimization only for React Query (Using "placeholderData" to stop the sudden disappearance of items):-

// --> When the API call is made for new set of items
// --> The old set of items suddenly disappear, making the pagination buttons to climb up till new items are loaded

//?? Solution 
// --> Pass the property "placeHolderData" 
// --> For the value :- pass a callback and return its parameter
// --> Hence, till the new set of items are fetched and rendered, the old items will remain visible on the UI

{
  {
    const { data: products = [], isLoading, error } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axios.get("https://dummyjson.com/products/?limit=66")
        return res.data.products;
      },
      placeholderData: (previousData) => previousData
    })
  }
}


//! The rest of the code remains same like in previous notes
// notes1 (Frontend Pagination using Normal React).js



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Whole Code (Frontend Pagination Using React Query) :-

const App = () => {

  const [page, setPage] = useState(1);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products/?limit=102");
      const data = await res.data;
      console.log(data.products);

      return data.products;
    },
    placeholderData: (previousData) => previousData
  })

  return (
    <>

      {
        products?.length > 0 && <div className="products-container">
          {
            products?.slice(page * 10 - 10, page * 10 - 10 + 10).map((item) => {
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
          [...Array(Math.ceil(products.length / 10))].map((item, idx) => {
            return <button key={idx + 1} style={{ fontWeight: page === idx + 1 ? "bold" : "normal" }} onClick={() => {
              if (page !== idx + 1)
                setPage(idx + 1)
            }}>{idx + 1}</button>
          })
        }
        <button disabled={page == Math.ceil(products.length / 10)} onClick={() => {
          setPage(page + 1)
        }}>⏭️</button>
      </div>

    </>
  )
}
