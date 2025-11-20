
//?? 1) Nested Routes :-

// --> A route rendered inside another route.

// e.g :-
//  /admin
//  /admin/sellers
//  /admin/sales


//?? Need :-
// --> to build UI layouts where some parts stay the same (like headers, sidebars, dashboards)
// --> only a section of the page changes based on the URL

// e.g :-
// --> The <Admin/> component has a Navbar
// --> And has 2 links :- Sellers & Sales



//?? When we click on the either link :-
// a) The route should change to nested one
// e.g :- /admin --> /admin/seller

// b) Corresponding component should load inside the <Admin/> only, beneath the links


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) Steps to build nested routing :-

//? a) First go the Parent component (here <Admin/>) & prepare the links for nested routes
// --> Provide the correct URL paths to the <Link> tag

// e.g :-

const Admin = () => {
  return (
    <>
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/sales">Sellers</Link></li>
        <li><Link to="/admin/sellers">Sales</Link></li>
      </ul>
    </>
  )
}


//******************************** */


//? b) Create the components, to render for those links

// Sellers.jsx
const Sellers = () => {
  return (
    <>
      <h1>Sellers :-</h1>
    </>
  )
}

// Sales.jsx
const Sales = () => {
  return (
    <>
      <h1>Sellers :-</h1>
    </>
  )
}


//******************************** */


//? b) Create the nested Routes :-

// --> Go to the component, where we declared the route for our Parent Component (Admin.jsx)
// --> In our case (its App.jsx)


//?? Changes to the Parent Route (Admin)
// --> For our Admin Route
// --> Change it from self-closing tag to opening & closing tag
// --> Inside the opening & closing tag, add the nested children Routes as self-closing tags 


//?? "path" attribute for nested routes :-
// --> The URL path of child routes will not start relative to home route ("/")
// --> It will start relative to its the parent route
// --> Hence only put the last part of the route without "/" in the "path" attribute

// /admin + sellers = /admin/sellers
// /admin + sales   = /admin/sales

//?? NOTE :-
// --> If we add "/" before "sellers" or "sales"
// --> It is treated as an absolute route
// --> It becomes /sellers instead of /admin/sellers



//?? "element" attribute for nested routes :-
// --> Just pass the <component> tag we want to render


// e.g
//?? Earlier
{
  <Route path={"/admin"} element={<Admin />} />
}


//?? Current 
{
  <Route path={"/admin"} element={<Admin />}>

    <Route path={"sellers"} element={<Sellers />} />
    <Route path={"sales"} element={<Sales />} />
  </Route >
}


//********************************* */


//?? c) Use the <Outlet/> component tag

// --> To show where our children component should appear in the Parent component
// --> Use the <Outlet/> component tag from "react-router-dom"


//?? Steps :-
// a) Import "Outlet" as named import from "react-router-dom"

import { Outlet } from "react-router-dom"

// b) Place the "Outlet" component tag
// --> wherever we want our Child components (Sales & Sellers) from Child routes 
// --> to appear in the Parent component (Admin.jsx)

const Admin3 = () => {
  return (<>
    <h1>Admin Page</h1>
    <ul>
      <li>
        <Link to="/admin/sellers" >Sellers</Link>
      </li>
      <li>
        <Link to="/admin/sales">Sales</Link>
      </li>
    </ul>

    // Here we want our child components
    <Outlet />
  </>)
}


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) Total Code :-

// Creating Links and rendering <Outlet/> :-

const Admin4 = () => {
  return (<>
    <h1>Admin Page</h1>
    <ul>
      <li>
        <Link to="/admin/sellers" >Sellers</Link>
      </li>
      <li>
        <Link to="/admin/sales">Sales</Link>
      </li>
    </ul>

    // Here we want our child components
    <Outlet />
  </>)
}


// Defining Child Routes :-

const App = () => {
  return (
    <div className='app'>
      <Navbar />

      <main className='app_main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/admin" element={<Admin />} >
            <Route path={sellers} element={<Sellers />} />
            <Route path={sales} element={<Sales />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </main>
    </div >
  );
};




//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */

//?? 4) BONUS TIP (Defining all the routes in a separate component):-
// --> Instead of messing up App.jsx with so many routes
// --> Just create a directory called "Routes" & create component inside & create all the routes there
// --> While importing, check the new path of all required components
// --> Use that component's tag in our App.jsx to render all those routes