//?? 1) Props (props stands for properties) :-

// --> Whenever we want to send some data from the parent component to child component.
// --> We do it through props
// --> It can only be sent from parent -> child but not vice versa


//? React props can be of any data type including object, arrays, etc


//?? How to pass the data from parent to child?
// --> When a parent component is rendering a child component

const notes = () => {
  return (
    <div>
      <Card />       // child  component
    </div>
  )
}

// --> Props are passed to child components as attributes (same like in HTML tags)
// --> If the value of that attribute is in string, then give the hardcoded value
// --> Else if we want to use the variable for dynamic value, we have to enclose in {} 

<div>
  <Card name="Hrithik" />       // child  component
  <Card name={val} />       // child  component
</div>



//?? How to receive prop data in child component? :-
// --> They are received as the arguments to their own component function.

//? Process :-
// --> Every prop data passed through attribute for that particular child component will be put in an object
// --> That final object is received as argument in the child component.


//?? Note :- best practice is to name that argument as "props" 

// e.g :-
// Child component
const Card = (props) => {
  return (
    <div>
    </div>
  )
}


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Different ways to extract data from prop argument :-


//?? Note :-
// --> Whatever data we extract from props
// --> It will be extracted from JS objects
// --> That can only be used inside {}, if we are using them inside JSX


//? Way 1 (use dot operator)
// --> Since the data is passed as key-value pair in the prop object
// key = attribute_name
// value = attribute_value

// --> We can use the dot operator on the object to get the value of any key

//?? e.g :-

// In parent
<Card2 name="Hrithik" city="CCU" />

// In child :-
const Card2 = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.city}</p>
    </div>
  )
}


// *********************************


//? Way 2 (destructuring on the go) :-
// --> destructure the objects on the go
// --> then use the destructured variables directly 
// --> the names for variables can be different than the attribute names but against best practice


// In parent :-
<Card3 name="Hrithik" city="CCU" />

// In child :-
const Card3 = ({ name, city }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{city}</p>
    </div>
  )
}


// *********************************


//? Way 3 (destructuring the objects normally) :-

// --> Destructure the objects 

// In parent :-
<Card4 name="Hrithik" city="CCU" />

// In child :-
const Card4 = (props) => {
  const { name, city } = props;
  return (
    <div>
      <h1>{name}</h1>
      <p>{city}</p>
    </div>
  )
}


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Why do we use props?

//? a) Firstly, Data Sharing
// --> It allow components to receive data from their parent.

//? b) Reusability
// --> We can use same component again and again with different data

const note3 = () => {
  return (
    <>
      <Card name="abc" />
      <Card name="345" />
      <Card name={val0} />
    </>
  )
}


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Disadvantage of Props :-

// a) We can only send the data from parent to child component and not vice versa


// b) prop drilling
// --> Let's say we have to send data from the parent --> child1 --> child2 --> ... --> childN

// --> It results in performance issue hence, we use Context API




//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Some rules about props :-

// --> Although State in React is mutable in nature
// --> Props should be immutable in nature accoridng to best practice
// --> Though we can update or change them in our child component but its not a good practice

// e.g :-
const notes5 = ({ name, city }) => {
  name = "Vikash"    // Bad practice
  return (
    <div>

    </div>
  )
}


//?? Fallback plan :-
// --> Suppose if we don't send the value for a particular prop from parent
// --> But in the child component we require it
// --> Then assign a default value to that prop while destructuring in the child component

// e.g :-

// In parent :-
<>
  <Card5 name="Hrithik" city="CCU" />
  <Card5 city="CCU" />
</>

// In child :-
const Card5 = ({ name = "Default name", city }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{city}</p>
    </div>
  )
}

// --> THe default value for "name" prop will only be shown
// --> if the "name" attribute is nor passed from parent


//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 7) BONUS :- JSX to Vanilla JS :-

// --> Browsers doesn't understand modern JS syntax
// --> Browsers only understand vanilla JS

// --> Babel transpile the JSX into a particular modern JS syntax at least if not vanilla JS
// --> But still to convert it into Vanilla JS, bundlers like web pack or parcel will do it while bundling.
