//?? 1) What are Route Parameters :-

//--> Route params are dynamic parts of the URL that act like variables
//--> They alow us to pass values inside the URL path itself
// --> not after "?" like query params

//? e.g :-
// ==> /users/42
// ==> /users/53
// ==> /users/411

// Here, 42,53,411 are route parameters usually representing some ID


//?? Use :-
// --> Let's say on a route "/products" we have a component "Products"
// --> Inside that we have multiple products links with <a> or <Link>
// --> These <a> are pointing to URLS with different route parameters based on id

//? e.g :-
// Product 1  --> /products/42
// Product 2  --> /products/53
// Product 3  --> /products/411


//?? On clicking, we either want :-

//?? Scenario 1 :- dynamic product info inside a single component
// --> Whenever we click on a link, a component renders
// --> Inside that we can see the details of that specific product dynamically
// --> Based on the route param


//?? Scenario 2 :- dynamic components for each link based on the route param
// --> Here we will load different components for different products based on the route params


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Creating the scenarios :-

// --> Go to the component, where we want the items to be listed (here Product.jsx)
// --> Create different <a> or <Link> tags inside <ul> for different items (here products)
// --> Inside the "href" or "to" attribute, pass the URLs relative to base URL (/) along with query params  

const Products = () => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        <li>
          <Link to="/products/42">Product 1</Link>
        </li>
        <li>
          <Link to="/products/53">Product 2</Link>
        </li>
        <li>
          <Link to="/products/411">Product 3</Link>
        </li>
      </ul>
    </div>
  );
};


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Scenario 1 :- dynamic product info inside a single component


// STEPS :-

//? a) Create a component that will load when we click on any of the <Link> of specific products 

const SingleProduct = () => {
  return (
    <div>
      <h2>SingleProduct</h2>
    </div>
  );
};




//? b) Now first we need to create routes for all the product items
// --> Since all routes will load the same component
// --> Put that component's tag inside the "element" attribute for all the routes


//? For path attribute :-

//?? Way 1 (Not recommended)
// --> Either create individual routes for all Product items and hardcode the routes with route params

//  <Route path="/users/:42" element={<User />} />
//  <Route path="/users/:53" element={<User />} />



//?? Way 2 (Correct way)
// --> Use a "route param name" in the URL for "path" attribute
// --> It will store the route param for that specific item
// --> Use ":any_name"
<Route path="/users/:id" element={<User />} />

// ==> Here "id" is the route param name

//?? Benefit?
// --> This "route param name" can be accessed by our component using useParam() hook
// --> So that our component can show specific product data based on that route param

{
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<SingleProduct />} />
    </Routes>
  </>
}



//?? c) Now use useParams() inside our created component to access the route param from the URL

// --> Inside our SingeProduct component
// --> Import useParams() as a named import from "react-router-dom" package
import { useParams } from "react-router-dom"


// --> It returns an object which has all the "route param names" as keys
// --> Destructure & extract our required "route param name" to access the specific id of the product item 

const SingleProduct1 = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>SingleProduct - {id}</h2>
    </div>
  );
};

//?? NOTE :-
// --> We can extract & destructure multiple route params name using useParams()
// e.g :-

<Route path="/products/:productId/reviews/:reviewId" element={<Review />} />

// Inside component
const { productId, reviewId } = useParams()







//?? d) Load Data for That ID's product
// --> Once the id is received via route param through useParams()
// --> Fetch the product info from API for that id
// --> Show the details in the component

const SingleProduct2 = () => {
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.example.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);
  return (
    <>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </>
  );
};


//?? NOTE :-
// --> Fetch that API inside useEffect()
// --> Pass the "id" inside the dependency array
// --> Because we are sing the same component, so whenever a new id comes, useEffect runs


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 4) Scenario 2 :- dynamic components for each link based on the route param

//?? Way 1 (switch case):-
// --> First Create a component which will extract the id from useParam()
// --> And also render the different components for each route param
// --> Use a switch case to switch between the components based on the received id

const { id } = useParams();

switch (id) {
  case "1":
    return <TaskOne />;
  case "2":
    return <TaskTwo />;
  default:
    return <NotFoundTask />
}

//********************** */


//?? Way 2 (object instead of switch case):-

const componentMap = {
  "1": <TaskOne />,
  "2": <TaskTwo />
};

export default function TaskLoader() {
  const { id } = useParams();
  return componentMap[id] || <NotFoundTask />;
}


//************************** */


//?? Way 3 (Dynamically Import Components Based on ID):-
// --> If we have many components
// --> Use Lazy Loading

export default function TaskLoader() {
  const { id } = useParams();

  const LazyComponent = lazy(() =>
    import(`./tasks/Task${id}.jsx`).catch(() => import("./NotFoundTask.jsx"))
  );

  return (
    <Suspense fallback={<h1>Loading Task...</h1>}>
      <LazyComponent />
    </Suspense>
  );
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 5) BONUS (Snippet to Enable Emmet in React Files):-

// --> Open VS Code
// --> Press  Ctrl + Shift + P (Windows)
// --> Type: Preferences: Open Settings (JSON) and press Enter
// --> Inside the JSON file, paste the following snippet(or merge if emmet.includeLanguages already exists):

/*
"emmet.includeLanguages": {

  "javascript": "javascriptreact",

    "javascriptreact": "html"

}
*/