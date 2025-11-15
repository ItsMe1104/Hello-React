//?? 1) Handling invalid routes :-

// --> Handling a request through an invalid route for which we don't have any page in our App
// --> Like if the user requested /abc directly in the URL of the Browser
// --> Now we should show a page showing 404 Error Code.


//?? 404 Error Status Code :-
// --> It is a standard HTTP status code
// --> It means the server could not find the webpage we requested
// --> This usually happens when a page is moved, deleted, or the URL is mistyped.


//?? Solution :-
// a) First create a component where it renders that "specific page not found" and "404 Error code"

const NotFound = () => {
  return (
    <>
      <h2>Page Not Found :- 404 Error</h2>
    </>
  )
}


// b) In the component where we are building routes
// --> Make one more route using <Route>
// --> Inside the "path" attribute give the "*" value
// --> It means if no URL matched any Route's path, then the "*"" Route will be considered


// c) Inside the "element" attribute of the "*" Route pass the NotFound component tag

<Route paht="*" element={<NotFound />} />