//?? 1) Implementing Backend Pagination using React Query :-

// --> We will have only previous and next button for navigation

//? What did the backend provide?
// a) total = 200   (Normally it would also be integrated in the API as a property)
// b) limit = 10


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 2) Steps :-

//! Step 1 (Make the State variables):-
// --> Introduce the "page" State variable
// --> Rest all the State variables like "total", "products" will be taken care by React Query

const [page, setPage] = useState(1);


//! Step 2 (Calculate total pages to be formed)
const total = 200;
const limit = 10;
const total_pages = Math.ceil(total / limit);


//! Step 3 (Create the prev & next button for pagination) :-
<>
  <button>Previous</button>
  <button>Next</button>
</>


//! Step 4 (Disable the prev & next buttons on first & last page)
//? Option 1 (using disabled attribute)
// --> Pass a condition to the disabled attribute as to when the corresponding button should be disabled
{
  <>
    <button disabled={page == 1}>Previous</button>
    <button disabled={page == Math.ceil(total / limit)}>Next</button>
  </>
}

//? Option 2 (using class attribute)
// --> Give a class to the buttons based on the condition
// --> In the CSS file, select that class and give the opacity as 0
{
  <>
    <button className={page == 1 ? "disable" : ""}>Previous</button>
    <button className={page == Math.ceil(total / limit) ? "disable" : ""}>Next</button>
  </>
}

//? CSS file :-
//  .disable{
//    opacity:0
//   }



//! Step 5 (Add the onClick handler to the buttons)
// --> Add the onClick handler to the prev & next button
// --> Such that the page is updated by -1 or +1
{
  <div>
    <button disabled={page === 1} onClick={() => { setPage(page - 1) }}>Previous</button>
    <button disabled={page === Math.ceil(total / limit)} onClick={() => { setPage(page - 1) }}>Next</button>
  </div>
}



//! Step 6 (fetch the API data using useQuery)
// --> Fetch the API data (products chunk) from useQuery

//?? queryKey :-
// --> Since we want to fetch the API whenever the page changes
// --> Hence, pass the "page" State variable in the array of queryKey

//?? default value for API data
// --> Since the default value of all the State variables of React Query are set as default
// --> Hence, our app can crash if we try to access properties like length, map(), etc
// --> Hence, give a default value while destructuring only  

//?? URL :-
// offset/skip :- starting index
// page * limit - limit
// limit = limit

const URL = `https://dummyjson.com/products?limit=10&skip=${page * limit - limit}`


{
  const { products = [], isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * limit - limit}`
      )
      return res.data.products
    }
  })
}


// OR pass the query params in the params object of axios

{
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`
        , {
          params: {
            _limit: 10,
            _start: page * 10 - 10
          }
        })
      return res.data;
    }
  })
}



//! Step 6 (Render the API data product chunk)
// --> Render the products API data using map()
// --> Since we handled the crash by giving default value for API data
// --> Hence, we can ignore the optional chaining but not good practice

// --> To better be more safe, render the isLoading and error before rendering the entire component or the API data

{
  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error</h3>;
  <>
    <div className="product-container">
      {
        data?.map((item) => {
          return <span id={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <span>{item.title}</span>
          </span>
        })
      }
    </div>
  </>
}


//! Step 7 (Using "placeholderData" to stop the sudden disappearance of items):-
// --> When the API call is made for new set of items
// --> The old set of items suddenly disappear, making the pagination buttons to climb up till new items are loaded

//?? Solution 
// --> Pass the property "placeHolderData" 
// --> For the value :- pass a callback and return its parameter
// --> Hence, till the new set of items are fetched and rendered, the old items will remain visible on the UI


{
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`
        , {
          params: {
            _limit: 10,
            _start: page * 10 - 10
          }
        })
      return res.data;
    },
    placeholderData: (previousData) => previousData
  })
}


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Whole code :-

const App = () => {

  const [page, setPage] = useState(1);
  const total = 200;
  const limit = 10;
  const total_pages = Math.ceil(total / limit);


  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`
        , {
          params: {
            _limit: 10,
            _start: page * 10 - 10
          }
        })
      return res.data;
    },
    placeholderData: (previousData) => previousData
  })

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error</h3>;

  return (
    <>
      <div className="product-container">
        {
          data?.map((item) => {
            return <div id={item.id}>
              <div className="">{item.id}</div>
              <div>{item.title}</div>

            </div>
          })
        }
      </div>


      <div className="pagination-container">
        <button disabled={page === 1} onClick={() => { setPage(page - 1) }}>Previous</button>
        <button disabled={page === Math.ceil(total / limit)} onClick={() => { setPage(page + 1) }}> Next</button>
      </div >
    </>
  )
}
