//?? 1) Javascript Expressions and JS statements :-

//? JavaScript expression :-
// JS expression is any piece of code that produces a value.
// --> We can evaluate it — it returns something (a number, string, boolean, array, JSX element, etc).

// e.g :-
5 + 3                      // → 8
"user".toUpperCase()       // → "USER"
x > 10                     // → true or false
[1, 2, 3].map(n => n * 2)  // → [2, 4, 6]
isLoggedIn ? "Hi" : "Bye"  // → "Hi" or "Bye"
sayHi()                    // function call returns a value
var_abc                   // variable reference
// () => { };              // arrow function


//*********************** */


//? What is not a JS expression ?
// --> A JS statement is not a JS expression
// --> A statement is an instruction that does something, but doesn’t itself produce a value directly.

if (x > 5) { }                      // ❌ statement
for (let i = 0; i < 10; i++) { }    // ❌ statement
function sayHi() { }                // ❌ statement
let num = 10;                       // ❌ declaration


//?? Note :-
// --> function declaration is not an expression
// --> But when we assign it to some variable this declaration becomes an expression

const func = function () { return 2; }
// --> But as a whole, variable declaration is not JS expression


//********************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 2) What if the if-else statement returns some value?

// --> Even though an if-else conceptually can returns a single value
// --> In JavaScript syntax, an if-else block is a statement, not an expression.
// --> This is because if-else and loops are not designed to return a value

// e.g :-
if (true)
  return "Yes"
else
  return "No";


// const result = if (true) { "Yes" } else { "No" };  
// --> This will give error as if-else is not designed to become an expression



//?? Solution (Ternary Operator) :-
// --> Instead use a ternary operator
// --> This is because its an expression

const result = true ? "Yes" : "No";  // works!

//********************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 3) JSX and JS expressions :-

// --> In React JSX, we can only embed JS expressions, literals, variable reference to get some dynamic value
// --> Inside { ... }, JSX expects any valid JS expression, literals or variable reference.


//? e.g 1 (dynamic calculation inside jsx):-

// (static value) :-
//   <div>
//     <h1>65+78</h1>
//   </div>

// O/p :-
// 65+78



// (dynamic value):-
<div>
  <h1>{65 + 78}</h1>
</div>


// O/p :-
// 143


//********************* */


//? e.g 2 (dynamic data inside variable in jsx):-

const notes1 = () => {
  const task = 4;    // Declaring variable inside component
  return (
    <div>
      <h1>Tasks : {task}</h1>  // using variable inside jsx
    </div>
  )
}


//********************* */


//? e.g 3 (function call inside jsx):-

const notes = () => {
  function tasks() {
    const task = 4;
    return task;
  }

  return (
    <div>
      <h1>Tasks : {tasks()}</h1> // function() inside jsx
    </div>
  )
}


//********************* */


//? e.g 3 (ternary/conditional operator inside jsx):-

const notes2 = () => {
  const task = 0;
  return (
    <div>
      <h1>Tasks : {task === 0 ? "No task available" : `Task : ${task}`}</h1>
    </div>
  )
}


//********************* */


//? e.g 4 ( map() inside jsx):-

function FruitsList() {
  const fruits = ["Apple", "Banana", "Mango"];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}



//********************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 4) What is not allowed inside JSX  :-

// --> JS statements are not allowed inside JSX
// --> if-else, normal loops, function definition, variable declarations

// e.g :-
/*
const notes3 = () => {
  return (
    <div>
    { if (isLoggedIn) { return 5 } }
    </div>
  )
}
*/


//?? NOTE :-
// --> For loop is not allowed but map(), filter() are allowed as they return a single array
// --> reduce() is also allowed as it returns a single value


//********************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 5) How to use JS statements inside jsx?

// --> We can use JS statements like if-else, for-loops, etc also inside jsx
// --> For that we have to wrap it inside an IIFE
// --> IIFE --> Immediately Invoked Function Expression
// --> But that IIFE should return a single value or array or object.


//?? How to make an IIFE?
// --> Make an arrow function
() => { }
// --> Enclose it in parentheses
// --> Then give the calling parentheses

(() => { })()


//?? Using if-else and loops inside IIFE :-

// if-else
function Greeting({ }) {
  return (
    <div>
      {
        // IIFE
        (() => {
          if (user) return <h1>Welcome Admin</h1>;
          else return <h1>Hello Guest</h1>;
        })()
      }
    </div>
  );
}


// for-loop
function Greeting({ }) {
  return (
    <div>
      {
        (() => {
          const arr = []
          for (let i = 0; i < 6; i++) {
            arr.push(i);
          }
          return arr;
        })()
      }
    </div>
  );
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 6) Bonus : Template Literal :-

// --> Template literals use backticks (`) and support:
// --> Multiline strings
// --> String interpolation (inserting variables or expressions)

//?? Note insert a variable or expression :-
// --> Use $ followed by curly braces
// --> Insert the variable or expression inside curly braces

// e.g 1 :-
const greeting = `Hello, ${name}! How are you?`;

// e.g 2 (Multiline):-

const poem = `
Roses are red,
Violets are blue.
JS is awesome,
And so are you.
`;





