//?? 1) Ways to render the Component Tag :-

// --> Normally we use the Component tag as a self closing tag
<Hello />

// --> But we can also use them as a opening and closing tag
// <Hello> </Hello>


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Passing data btw the component's opening & closing tags :-

// --> When we use the component as a opening & closing tag
// --> Then we can pass some data between them
// --> That data can be other string value, components, etc

// <Button> Hello </Button>

or

// <Button >
//     <Hello />
//     <Parent/>
//      Hiii
// </Button >




//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) What are children props :-

// --> When we use a component tag as a opening & closing tag
// --> Whatever data we pass between them
// --> It will be received as an array inside the props objects received in the component function   
// --> That array will be put as the "children" property

//?? We can destructure the "children" array from the props object or access it using (.)


// <Button >
//      Hey
//     <Hello />
//     <Parent/>
//      Hiii
// </Button >

const Button = (props) => {
  console.log(props.children);            // children prop
  return (
    <>
    </>
  )
}


//?? NOTE :-
//--> If we pass just 1 data btw the opening & closing tags
//--> Then it will come directly as a separate value inside the "children" property & not as an array

//--> If we don't pass any data, then the value will be undefined


//?? NOTE 2 :-
//--> For self closing component tags, the value for the children prop is undefined


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Passing objects, functions between the opening & closing tags

// --> We can even pass objects, functions, arrays inside the opening & closing tags of component tags
// --> Since that will be using JS inside JSX, we need to use curly braces for each object,function,array


// e.g 

const App2 = () => {
  return (
    <>
      <Parent>
        {
          // Object
          {
            name: "Hrithik",
            age: 25
          }
        }
        {
          // Function
          function Hello() {
            console.log("Hello");
          }
        }
        {
          // Array
          ["hello", true, 1]
        }
      </Parent>
    </>
  )
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Passing Components inside opening & closing tags :-

// --> We can even pass various Components in the form of Component tags inside the opening & closing Component tags

// --> We can render those Components directly using curly braces


//?? Note :-
//--> While rendering the children props
//--> It will be in the form of array containing components
//--> But React will itself extract all the elements from the array

// e.g :-

const App3 = () => {
  return (
    <>
      <Parent>
        <Child />
        <Child2 />
        <Child3 />
      </Parent>
    </>
  )
}


// Parent component

const Parent = (props) => {
  return (
    <>
      {props.children}
    </>
  )
}