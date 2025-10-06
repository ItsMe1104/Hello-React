//? 1) Why the component's name should start with Caps :-

// --> The above should be followed, else React will throw an error
// --> This is because React might not understand it as a functional component

//? Note :- To maintain consistency, the file name of the component should match exactly with the component name and in same case (though its optional but best practice)



//? Summary :-
// --> The naming convention is that the component name should follow the camelCase but the first letter should also be in Caps
// e.g :- CreateToDo, CreateHello



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Role of Babel :-
// --> When we write jsx, the Browser doesn't understand it
// --> Browser only understands vanilla JS and not jsx
// --> Here Babel, comes in and works as a transpiler


//?? Babel :-
// --> It acts as a transpiler (or compiler) that converts modern JavaScript (and JSX) code into a form that browsers can understand.


//?? Process :-

// 1) React uses JSX (JavaScript XML) syntax — something browsers cannot understand directly.
const element = <h1>Hello, world!</h1>;


// 2) Babel converts it into regular JavaScript
// const element = React.createElement("h1", null, "Hello, world!");

// --> This allows browsers to execute the code properly.




// ?? QUESTION (Is React.createElement() vanilla JS) :-
// --> Yes — it is plain JavaScript.

// e.g :-
// const element = React.createElement("h1", null, "Hello, world!");

// --> React is a JavaScript object (imported from the React library).
// --> createElement is a function defined by React.
// --> "h1", null, and "Hello, world!" are just arguments to that function.


// ?? How does the browser handle it?

// --> When the Browser runs this :-
const element1 = React.createElement("h1", null, "Hello, world!");

// --> React.createElement() is called
// --> That function returns a JavaScript object (called a React element), something like:

/*
{
  type: "h1",
  props: { children: "Hello, world!" }
}
*/

// --> Later, React’s renderer (ReactDOM.render) takes that object and turns it into an actual DOM node on the screen.

ReactDOM.render(element, document.getElementById('root'));

// --> That’s when you actually see < h1 > Hello, world!</ > in the browser.



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) In detail how the Virtual Dom is created from JSX and the role of Babel :-


//? STEP 1 :-
// Suppose we write this JSX:

var element3 = (
  <div className="greeting">
    <h1 className="heading">Hello, world!</h1>
    <p>Welcome to React!</p>
  </div>
);


//? STEP 2 :-
// --> Babel transforms it into:

// React.createElement("tag_type", { attributes }, children1, children2)

var element3 = React.createElement(
  "div",
  { className: "greeting" },
  React.createElement("h1", { className: "heading" }, "Hello, world!"),
  React.createElement("p", null, "Welcome to React!")
);



//? Step 3: What React.createElement() actually does

// --> React.createElement() is just a function that returns a JS object describing the UI, often called a React Element or a Virtual DOM node.

// --> The returned object is in the form of :-

// {
//   type: "tag_name",
//     props: {
//     className: "class_name",          // if no classname, then omitted
//     id: "id_name",                    // if no id, then omitted
//     other_attribute : "attr_value"    // if no attribute, then omitted
//     children: ""     
//   }
// }

// --> type = the tag_name
// --> props = contains attributes like className, id, etc + children in the form of an object

//?? Note :- 
// --> if there are one or more children tags, then it will inside in an array
<h1>
  <h2>H2</h2>
  <h3>H3</h3>
</h1>


/* --> if only value is present, then it will be taken as a string
e.g :-
<h1> Hello </h1>
*/




// --> So calling (for children of parent div):
React.createElement("h1", { className: "heading" }, "Hello, world!");
React.createElement("p", null, "Welcome to React!")


// returns :-
// {
//   type: "h1",
//     props: {
//     className: "greeting",
//     children: "Hello, world!"
//   }
// }

// {
//   type: "p",
//     props: {
//     children: "Hello, world!"
//   }
// }


//? Step 4: For parent div


var element3 = React.createElement(
  "div",
  { className: "greeting" },
  React.createElement("h1", null, "Hello, world!"),
  React.createElement("p", null, "Welcome to React!")
);


// --> React.createElement() produces a nested object structure like this:

var element3 = {
  type: "div",
  props: {
    className: "greeting",
    children: [
      // h1
      {
        type: "h1",
        props: {
          className: "greeting",
          children: "Hello, world!"
        }
      },

      // p
      {
        type: "p",
        props: {
          children: "Welcome to React!"
        }
      }
    ]
  }
};


// --> That’s our virtual DOM — a lightweight, in -memory representation of what the real DOM should look like.


//?? Step 5: ReactDOM.render()
// --> React’s renderer (ReactDOM.render) takes that object and turns it into an actual DOM node on the screen.

ReactDOM.render(element, document.getElementById('root'));


//?? Excess info :-
// --> React does something like this internally to create nodes in actual DOM :

function render(element, container) {
  // If the element is a string or number → create a text node
  if (typeof element === "string" || typeof element === "number") {
    const textNode = document.createTextNode(element);
    container.appendChild(textNode);
    return;
  }

  // Create a DOM node of the given type
  const domNode = document.createElement(element.type);

  // Set props like className, etc.
  if (element.props) {
    for (let prop in element.props) {
      if (prop === "children") continue;
      domNode[prop] = element.props[prop];
    }
  }

  // Recursively render children
  const children = element.props.children;
  if (Array.isArray(children)) {
    children.forEach(child => render(child, domNode));
  } else if (children) {
    render(children, domNode);
  }

  // Append to container
  container.appendChild(domNode);
}


// --> This function walks through that virtual DOM object tree and creates actual DOM nodes.
// --> The browser displays the elements just like any regular HTML.



//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) To explore more on Babel :-

// --> Go to Babel.js
// --> Go to "try it out"
// --> Switch to "Classic" mode for React Runtime
// --> write the normal jsx in LHS
// --> See how the babel converts it into JS in RHS



//? Some more features on Babel :-


// --> JSX Conversion :-	Turns JSX into plain JS
// --> ES6+ Compatibility	:- Converts new JS features to older syntax
// --> Browser Support	:- Ensures React code runs in all browsers
// --> Integration	:- Works with Webpack and other build tools to transpile the JSX and modern JS codes before bundling


//?? Job of web pack :-
// --> Imagine our React project has many files
// --> webpack will Look at all these files.
// --> Follow every import / require dependency.
// --> Bundle them into one(or a few) files like bundle.js.
// --> Optimize them(minify, compress, etc.).
// --> Serve them to the browser efficiently.


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? For more details refer to the following vlog :-
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html 
