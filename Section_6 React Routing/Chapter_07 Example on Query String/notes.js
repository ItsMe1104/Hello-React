//?? 1) Sort the data based on category & pass the query string in URL :-

// Data :-
const dummyArticles = [
  { id: 1, title: "Laptop Review", views: 250, category: "Electronics" },
  { id: 2, title: "Running Shoes", views: 250, category: "Fashion" },
  { id: 3, title: "Washing Machine Guide", views: 250, category: "Electronics" },
  { id: 4, title: "Utensils", views: 250, category: "Cutlery" },
  { id: 5, title: "Smartphone", vies: 250, category: "Electronics" },
]

// --> We have to sort the data for the category = "electronics" based on views


//******************************* */

//?? Solution :-
//? a) First copy the data into a separate array
// --> so that we can roll back to original array if needed

const filtered_array = dummyArticles;



//? b) Now initially display all the articles first when no filters are selected

<ul>
  {
    filtered_array.map((item) => {
      return <li key={item.id}>{item.title} - {item.views} views ({article.category})</li>
    })
  }
</ul>



//?? c) Now sort the data based on the views

// --> First create a button, that will filter the records of category "electronics"
// --> Create second button that will sort the records
// --> On clicking first button it should add the query string with key-value (keeping others same):-
//*) category : "electronics"

// --> On clicking second button it should add the query string with key-value (keeping others same):-
//*) sortByView : "true"


function handleCategory() {
  const old_obj = Object.fromEntries(searchParams.entries())
  setSearchParams({
    ...old_obj,
    category: "electronics",
  })
}

function handleSort() {
  const old_obj = Object.fromEntries(searchParams.entries())
  setSearchParams({
    ...old_obj,
    sortByView: "true",
  })
}

{
  <>
    <button onClick={handleCategory}>Filter Category - Electronics</button>
    <button onClick={handleSort}>Sortby views</button>
  </>
}

// --> First, extract the query strings
// --> Then in the component define two conditions
// --> which will run only if the required values are present in query strings

//?? NOTE :- they won't run on initial renders

// i) filter for "electronics" category
// ii) Sort based on views

const category_name = searchParams.get("category")
const sortBy = searchParams.get("sortByView")


// Condition 1 :-
if (category_name) {
  filtered_array = filtered_array.filter((item) => {
    return item.category === category_name
  })
}


// Condition 2 :-
if (sortBy === true) {
  filtered_array = filtered_array.sort((a, b) => {
    return a.views - b.views;
  })
}

//?? NOTE :-
// --> To sort in descending order
// --> use ==> b.views - a.views

//?? NOTE (Not required):-
// --> We can also use spread operator to get the elements from filtered_array to a new array
filtered_array = [...filtered_array].sort()


//****************************************** */

// Total Solution :-

const App = () => {
  let filtered_array = dummyArticles;
  const [searchParams, setSearchParams] = useSearchParams();
  const category_name = searchParams.get("category")
  const sortBy = searchParams.get("sortByViews")

  const handleCategory = () => {
    const current = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...current,
      category: "Electronics"
    })
  }

  const handleSort = () => {
    const current = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...current,
      sortByViews: true,
    })
  }

  if (category_name) {
    filtered_array = filtered_array.filter((item) => {
      return item.category === category_name
    })
  }

  if (sortBy === "true") {
    filtered_array = filtered_array.sort((a, b) => {
      return a.views - b.views;
    })
  }

  return (
    <>
      <h1>SortBy : {sortBy === true ? "Views" : "None"} Category : {category_name ?? "all"}</h1>

      <ul>
        {
          filtered_array.map((item) => {
            return <li key={item.id}>{item.title} - {item.views} ({item.category})</li>
          })
        }
      </ul>
      <button onClick={handleCategory}>Filter By : Electronics</button>
      <button onClick={handleSort}>Sort By : Views</button>
    </>
  )
}


//?? Critical parts :-
// --> Here while setting one query Parameter, we are keeping the other ones as it is
// --> Hence, used entries() & Object.fromEntries() to get all key-value pairs of searchParams in an object


//?? NOTE :-
// --> React rerenders the component, every time the query parameters are updated in URL