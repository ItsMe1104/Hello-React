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
  <>
    <button disabled={page === 1} onClick={() => { setPage(page - 1) }}>Previous</button>
    <button disabled={page === Math.ceil(total / limit)} onClick={setPage(page + 1)}>Next</button>
  </>
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
//? offset/skip :- starting index
// page * limit - limit

//? limit = limit

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
