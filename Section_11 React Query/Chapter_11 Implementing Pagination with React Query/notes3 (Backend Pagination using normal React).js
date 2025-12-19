//?? 1) Backend Pagination :-

// --> Here the Backend will let us know three things :-
// a) limit :- how many no. of products per page
// b) offset :- starting_index (how many products (in index) to skip before that)
// c) total :- total no. of records

//?? NOTE :-
// --> Both offset and limit will be configured in the API url
// --> offset can have different names like "skip", etc

//? e.g :-
// https://dummyjson.com/products?limit=10&skip=7


//?? Why total is needed?
// --> To create the total no. of pages and buttons based on the limit
// --> The "total" can be taken from the API data as a property
// --> Hence, make a state variable for total also
// --> Then, update it while


//?? Solution :-
// --> Here the backend will give us an API where the limit and offset are already configured
// --> The "total" will come as a property from API data
// --> We just have to update the limit & offset values in the API URL
// --> Then call the updated API URL for new products data






//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Steps :-

//! Step 1 (Create State variable for Page):-
// --> First create the State variable for Page 
// --> This will control, which set of products will be shown in the current page
const [currentPage, setCurrentPage] = useState(1)



//! Step 2 (Create state variable for Storing total records of API)
// --> This is required for counting total no. of pages
// --> And total no. of buttons for pagination
// --> We will get this "total" from API data by the Backend (here through "total" property)
const [total, setTotal] = useState(0)



//! Step 3 (Create State variable for storing API data for different chunks) :-
// --> Create another State variable to store all the API data
// --> This is what we do usually while calling API
const [products, setProducts] = useState([]);




//! Step 4 (Fetch API data chunk & store in State variable and also store total no. of records from total property):-
// --> Fetch the API data inside usEffect() 
// --> Then update "product" State variable with products array using data.products
// --> And update "total" State variable with total no. of records using data.total
// --> Before setting API data in our State variable, check if data is there

const fetchAPI = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=10&skip=7");
  const data = await res.json();


  // API data :-  { products:[] }
  if (data && data.products) {
    setProducts(data.products);
    setTotal(data.total)
  }
}

useEffect(() => {
  fetchAPI();
}, [])



//! Step 5 (Creating the URL with correct limit & offset values)

//? offset/skip :- starting index
// page * limit - limit

//? limit = limit

const URL = `https://dummyjson.com/products?limit=10&skip=${page * limit - limit}`



//! Step 6 (When to call the API through useEffect)
// --> Whenever the page changes, we need to call the API inside useEffect()
// --> So that the updated chunk of products are fetched & displayed
// --> Pass the "page" State variable inside the dependency array of useEffect()

{
  // Fetching API whenever the page changes
  const fetchAPI = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();
    setProducts(data.products);
    setTotal(data.total);
  }

  // calling API whenever the page is updated
  useEffect(() => {
    fetchAPI();
  }, [page])
}



//! Step 7 (Render the products chunk using map()) :-
// --> As a security check, first render the products chunk
// --> Create a div, only if our State variable is not empty

products.length > 0 && <div className="products-container"></div>

// --> Inside the div, render all the products within the range, image from thumbnail, title using map()
// --> Get the title <span> inside the image <span>


//?? NOTE (Always give "alt" attribute in <img> tag and key while using map() ) :-
// --> Always give "alt" attribute for <img> tag and "key" inside map()
// --> Else interview will cut marks

{
  <>
    {products.length > 0 && <div className="products-container">
      {
        products.map((item) => {
          return <>
            <span key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          </>
        })
      }
    </div>}
  </>
}

//?? NOTE :-
//--> No need of slice() here, as we will be getting the products in chunks and we have to display them whole
//--> Only starting_index we had to calculate and provide to the URL 



//! Step 8 (Implement Pagination below the products):-
// --> Below the products, create buttons for all the pages
// --> Create a div, only if our State variable is not empty

products.length > 0 && <div className="pagination"></div>

//  --> Total buttons = Total pages = Total records / limit
//  --> Total no. of records come from "total" State variable
//? --> Math.ceil(total/limit)


//?? Why Math.ceil() ?
// --> So that it gives one page extra if leftover remainder products are left


//? How to create those many buttons?

//? Option 1 (Using dump array):-
// --> We can create them my looping using a map
// --> We just need an array with no. of element = total pages
// --> To return those many buttons


//?? Making Dummy array :- 
// Array(a)   a is always an integer
// Array(5)  --> Makes 5 elements with empty spaces (but cannot be used)
// [...Array(5)] --> fills those empty spaces with "undefined"

[undefined, undefined, undefined, undefined, undefined]

{
  [...Array(Math.ceil(total / 10))].map((item, idx) => {
    return <span>{idx + 1}</span>
  })
}

// --> Remember to use Math.ceil() as it gives an integer


//?? Option 2 (Using Normal array and for loop ):-
// --> Initialize an empty array
// --> With the help of for-loop, enter dump elements
// --> Use map() to loop over the array and create the buttons



//! Step 9 (Add the onClick Handlers to every button):-
// --> Add the onClick handlers to every generated button
// --> Such that when clicked, we will change the page State to that button's no.   (index+1)

//? NOTE:-
// --> Make sure that the page is updated only when the button we are clicking != current page
// --> Hence, there is no point of fetching & rendering again

if (page !== idx + 1)
  setPage(idx + 1);


// E.g :-
{
  [...Array(Math.ceil(total / 10))].map((item, idx) => {
    return <button onClick={() => {
      if (page !== idx + 1)
        setPage(idx + 1)
    }}>{idx + 1}</button>
  })
}

// --> Once the page is updated, again the API call will be made and products will be updated





//! Step 10 (Highlight the current page button):-
// --> The user should get a glimpse of the current page through the no. buttons
// --> Whichever button no. matches the current page, highlight it
// --> While creating the buttons, check if their no. is matching the current page inside the className
// --> If YES, then add a class "current", else don't add
// --> Style the elements with class "current" with a different background color.

{
  [...Array(Math.ceil(total / 10)).map((_, idx) => {
    return <button className={idx + 1 == currentPage ? "current" : ""} onClick={() => {
      setCurrentPage(idx + 1)
    }} key={idx}>{idx + 1}</button>
  })]
}


//CSS file :-
// .current{
//   background-color: rgb(220,220,220)
// }




//! Step 11 (Add the prev button & new buttons) :-
//?? prev Button
// --> Add the previous button before the no. buttons
// --> Add the onClick Handler such that it subtracts 1 from current Page
// --> Again when the page is updated, the API call will be made and products will be updated

{
  <button onClick={() => { setPage(page - 1) }}>⏮️</button>
}


//?? next Button
// --> Add the next button after the no. buttons
// --> Add the onClick Handler such that it subtracts 1 from current Page
// --> Again when the page is updated, the API call will be made and products will be updated

{
  <button onClick={() => { setPage(page + 1) }}>⏭️</button>
}



//! Step 12 (Disable the prev button on 1st page & next buttons on last page) :-

// --> Disable the prev button when the current page is on the 1st page
// --> Disable the next button when the current page is on the last page


//?? How to disable button?

//? a) OPTION 1 :-
// --> Use the "disabled" attribute
// --> It takes a condition as value

//* For prev button
// --> condition for disabled to be true :- currentPage == 1
{
  <button disabled={currentPage == 1}>⏮️</button>
}

//* For next button
// --> condition for disabled to be true :- Math.ceil(total/10)
{
  <button disabled={currentPage == Math.ceil(total / 10)}>⏮️</button>
}



//? b) OPTION 2 :-
// --> Add a class to the button as "active" whenever a condition is true
// --> In the CSS file make the opacity = 0 for the "active" class

{
  <>
    {/*  previous button */}
    <button className={currentPage == 1 ? "prev-btn active" : "prev-btn"}>⏮️</button>

    {/* next button */}
    <button className={currentPage == Math.ceil(total / 10) ? "next-btn active" : "next-btn"}>⏮️</button>
  </>
}


// ? CSS file
// .active{
//   opacity: 0
// }



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Whole code :-
const App = () => {

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = res.data;
    setProducts(data.products);
    setTotal(data.total);
  }
  useEffect(() => {
    fetchData();
  }, [page])

  return (
    <>

      {
        products.length > 0 && <div className="products-container">
          {
            products.map((item) => {
              return <span>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            })
          }
        </div>
      }

      {
        products.length > 0 && <div className="pagination-container">

          <button disabled={page == 1} onClick={() => {
            setPage(page - 1)
          }}>⏮️</button>
          {
            [...Array(Math.ceil(total / 10))].map((_, idx) => {
              return <button onClick={() => {
                if (page !== idx + 1)
                  setPage(idx + 1)
              }}>{idx + 1}</button>
            })
          }
          <button disabled={page == Math.ceil(total / 10)} onClick={() => {
            setPage(page + 1)
          }}>⏭️</button>
        </div>

      }
    </>
  )
}



