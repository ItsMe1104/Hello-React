//?? 1) Building a SPA (Single Page Application) :-

// --> Whenever we route to any other component
// --> Our page reloads
// --> But we don't want it to happen
// --> This seems like traditional multi-page app



//?? Solution (Link & NavLink) :-

//a) Go to the component where the anchor tags are defined (For us Navbar)

//b) Then import "Link" as a named import from "react-router-dom"

import { Link } from "react-router-dom"

// --> It is like a HTML tag

//c) Replace all the anchor tags <a> with the opening and closing <Link> tag

//d) Now replace the "href" attribute with the "to" attribute (value will be same as URL path)

<nav>
  <Link to="/articles">Articles</Link>
  <Link to="/contact">Contact Us</Link>
  <Link to="/admin">Admin</Link>
  <Link to="/">Home</Link>
</nav>


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 2) NavLink in react-router-dom

// --> It is a specialized version of Link
// --> Behind the scenes it uses the <a> tag
// --> When its "to" attribute matches the current URL, it applies a CSS class "active" to it
// --> The class is automatically removed when the URL changes

//?? Use :-
// --> It is used for highlighting the currently active page in navigation menus


//?? How to use?

// a) Import "NavLink" as a named import from "react-router-dom"

import { NavLink } from "react-router-dom"

// b) Replace the opening and closing tags of <Link> with <NavLink>

<nav>
  <NavLink to="/articles">Articles</NavLink>
  <NavLink to="/contact">Contact Us</NavLink>
  <NavLink to="/admin">Admin</NavLink>
  <NavLink to="/">Home</NavLink>
</nav>

// c) Now in the CSS file, apply valid CSS style to the <a> tag having a class "active" inside <Navbar>

/*
.navbar_list a.active {
  font-weight: 500;
  color : blue;
}
*/