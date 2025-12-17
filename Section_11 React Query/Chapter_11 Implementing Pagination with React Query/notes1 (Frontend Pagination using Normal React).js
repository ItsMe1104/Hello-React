//?? 1) Frontend Pagination :-

const { useEffect } = require("react")

//?? What Backend will give?
// --> Total one API
// --> No. of records per page  (limit)


//?? How is it different from backed pagination?
// --> There, the backend will provide the total no. of records


//?? Solution :-
// --> We will fetch all the data of the API at once
// --> Then based on the total no. of records & no. of records per page, we will count no. of pages that can be built
// --> From total data, we will slice the array and only present the selected data in their corresponding page



//?? NOTE :-
// --> The most important thing in frontend pagination is "Page" (which page we are currently in)


//********************************* */

//?? Steps :-

//! Step 1 (Create State variable for Page):-
// --> First create the State variable for Page
// --> This will control, which set of products will be shown in the current page
const [currentPage, setCurrentPage] = useState(1)



//! Step 2 (Create State variable for storing API data) :-
// --> Create another State variable to store all the API data
// --> This is what we do usually while calling API
const [products, setProducts] = useState([]);



//! Step 3 (Fetch API data and store in State variable):-
// --> Fetch the whole data inside usEffect() only on first render
// --> Then update State variable with products array using data.products
// --> Before setting API data in our State variable, check if data is there

const fetchAPI = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=102");
  const data = await res.json();


  // API data :-  { products:[] }
  if (data && data.products) {
    setProducts(data.products);
  }
}

useEffect(() => {
  fetchAPI();
})



//! Step 4 (Render all products using map()) :-
// --> As a security check, first render all the products
// --> Create a div, only if our State variable is not empty

products.length > 0 && <div className="products-container"></div>

// --> Inside the div, render all the records, image from thumbnail, title using map()
// --> Get the title <span> inside the image <span>


//?? NOTE (Always give "alt" attribute in <img> tag and key while using map() ) :-
// --> Always give "alt" attribute for <img> tag and "key" inside map()
// --> Else interview will cut marks

{
  <>
    {products.length > 0 && <div>
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



//! Step 5 (Render sliced products):-
// --> Now instead of rendering all the products
// --> Slice them to apply pagination using currentPage variable
// --> Remember array.slice() ignores the ending index

//?? Note :- limit given by backend = 10

//? Page No. --> Indexes of products
//  1st page --> 0 - 9                     [ 1*10 - 10, [1*10 - 10} + 10 )
//  2nd page --> 10 - 19                   [ 2*10 - 10, [2*10 - 10]
//  3rd page --> 20 - 29
//  4th page --> 30 - 39

//? Starting index --> current_page * limit - limit
//? Ending index   --> starting index + limit


// Instead of products.map()
// Use products.slice.map()

products.slice(currentPage * 10 - 10, currentPage * 10).map((item) => {
  return <span key={item.id}>
    <img src={item.thumbnail} alt={item.title} />
    <span>{item.title}</span>
  </span>
})

// --> If no. of indices in the array are less than the end_index of slice()
// --> It will not give error and show only the products available in the range




//! Step 6 (Implement Pagination below the products):-
// --> Below the products, create buttons for all the pages
// --> Create a div, only if our State variable is not empty

products.length > 0 && <div className="pagination"></div>

// --> Total buttons = Total pages
// --> --> Math.ceil(products.length/limit)

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
  [...Array(Math.ceil(products.length / 10))].map((item, idx) => {
    return <span>{idx + 1}</span>
  })
}

// --> Remember to use Math.ceil() as it gives an integer


//?? Option 2 (Using Normal array and for loop ):-
// --> Initialize an empty array
// --> With the help of for-loop, enter dump elements
// --> Use map() to loop over the array and create the buttons



//! Step 7 (Add the onClick Handlers to every button):-
// --> Add the onClick handlers to every generated button
// --> Such that when clicked, we will change the page State to that button's no.   (index+1)


{
  [...Array(Math.ceil(products.length / 10))].map((item, idx) => {
    return <button onClick={() => { setPage(idx + 1) }}>{idx + 1}</button>
  })
}


//! Step 8 (Add the prev button & new buttons) :-
//?? prev Button
// --> Add the previous button before the no. buttons
// --> Add the onClick Handler such that it subtracts 1 from current Page
{
  <button onClick={() => { setPage(page - 1) }}>⏮️</button>
}


//?? next Button
// --> Add the next button after the no. buttons
// --> Add the onClick Handler such that it subtracts 1 from current Page
{
  <button onClick={() => { setPage(page + 1) }}>⏭️</button>
}


//! Step 9 (Disable the prev button on 1st page & next buttons on last page) :-

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
// --> condition for disabled to be true :- Math.ceil(products.length/10)
{
  <button disabled={currentPage == Math.ceil(products.length / 10)}>⏮️</button>
}



//? b) OPTION 2 :-
// --> Add a class to the button as "active" whenever a condition is true
// --> In the CSS file make the opacity = 0 for the "active" class

{
  <>
    {/*  previous button */}
    <button className={currentPage == 1 ? "prev-btn active" : "prev-btn"}>⏮️</button>

    {/* next button */}
    <button className={currentPage == Math.ceil(products.length / 10) ? "next-btn active" : "next-btn"}>⏮️</button>
  </>
}


// ? CSS file
// .active{
//   opacity: 0
// }



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Whole code :-
const App = () => {

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("https://dummyjson.com/products/?limit=66");
    const data = res.data;
    setProducts(data.products);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>

      {
        products.length > 0 && <div className="products-container">
          {
            products.slice(page * 10 - 10, page * 10 - 10 + 10).map((item) => {
              return <span>
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
            return <button onClick={() => { setPage(idx + 1) }}>{idx + 1}</button>
          })
        }
        <button disabled={page == Math.ceil(products.length / 10)} onClick={() => {
          setPage(page + 1)
        }}>⏭️</button>
      </div>

    </>
  )
}



