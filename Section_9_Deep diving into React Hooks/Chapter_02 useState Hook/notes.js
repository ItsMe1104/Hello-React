//?? 1) useState() Hook in React :-

// --> It helps us to create State variables in the component
// --> State variables are those which are always tracked by React and on updation lead to component re-render


//?? What is State :-
// --> React inbuilt object which holds data specific to the component and can change over time


//?? Need for State variables :-
// --> React doesn't allow us to touch the DOM like in vanilla JS
// --> Because React uses the concept of virtual DOM
// --> Hence, if we use normal variables
// --> Then on updating them, the UI won't update automatically even if it uses them.

// --> To make the UI get automatically updated when our variables update , we use State variables


//?? e.g (Won't work) :-

const notes = () => {
  let count = 10;
  const handleClick = () => {
    console.log("Clicked");
    count = count + 1;   // won't update the <h1> tag count
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

