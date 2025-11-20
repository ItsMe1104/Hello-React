//? 1) Navigate component :-

// --> <Navigate /> is a component used to redirect the user to another route.
// --> It is a component, which when rendered, doesn't show any UI but only redirects


//?? When to use?
// --> When we want to automatically take a user to another route
// e.g :- after login, when page not available, etc



//?? Import :-
// --> Named import from "react-router-dom" package

import { Navigate } from "react-router-dom"



//?? Syntax :-
// --> Use the Navigate component's task
// --> It has a "to" attribute that redirects to the specified route

{
  <Navigate to="/somewhere" />
}


//******************************* */

//?? Use cases :-

// a) Basic Redirect
<Route path="/" element={<Navigate to="/home" />} />


// b) Redirect Based on Condition
function Admin() {
  const user = { role: "user" }

  if (user.role != "admin") {
    return <Navigate to="/" />;
  }

  return <>
    <h1>Admin Panel</h1>
  </>
}

// NOTE :-
// --> We need to return the <Navigate/> component
// --> As it will only redirect if it is rendered


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) useNavigate() Hook :-
// --> It returns a fn() that lets us to navigate instead of using JSX like <Link/> or <Navigate/>


//?? Import :-
// --> import "useNavigate" as named import from "react-router-dom" package

import { useNavigate } from "react-router-dom";


//?? Syntax :-
// --> No arguments required
// --> It returns a function
// --> Store it in a variable

const navigate = useNavigate()


//?? Why needed?
// --> Sometimes we can't use <Navigate/>
// e.g :-
// a) redirecting after button click
// b) After submitting a form
// c) Inside event Handlers or useEffect()


//******************************** */


//?? USE Cases :-

//? a) Navigating Back / Forward page

navigate(-1); // go back
navigate(1);  // go forward


// e.g :- On button click, we can move one page back/forward in the browser

const Admin = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  const handleForward = () => {
    navigate(1);
  }

  return (
    <div>
      <>
        <h1>Admin Panel</h1>
        <button onClick={handleBack}>Move Back</button>
        <button onClick={handleForward}>Move Forward</button>
      </>
    </div>
  )
}


//******************************************** */


//?? b) Navigating to some route :-

//--> We can also directly navigate to some specific route
//--> Base URL path is home route ("/")

//--> We need to pass the route as string inside navigate()

// e.g (Navigate to "/articles" on button click ):-


const Admin = () => {
  const navigate = useNavigate();

  const redirectToArticle = () => {
    navigate("/articles");
  }

  const redirectToArticle4 = () => {
    navigate("/articles/" + "4");
  }

  return (
    <div>
      <>
        <h1>Admin Panel</h1>
        <button onClick={redirectToArticle}>Move To Articles</button>
        <button onClick={redirectToArticle4}>Move To Article 4</button>
      </>
    </div>
  )
}

