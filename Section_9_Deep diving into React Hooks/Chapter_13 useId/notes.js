//?? 1) useId() hook :-
// --> It is used for generating unique IDs


//?? Syntax :-
useId()

// --> No arguments
// --> Returns a string based unique ID


//?? Restrictions :-
//--> Hence only call it in the top level of components or custom hooks
//--> Not to be used inside loops or conditions
//--> It should not be used to generate keys of list


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Best use case of useId() :-

// --> Create an input tag and a label tag
// --> Get the <label> linked to the <input> 
// --> so that even if we click on <label>, the <input> is focused


//?? How :-
// --> In React we use the "htmlFor" attribute in label tag (In plain HTML, we use "for")
// --> Inside the "htmlFor" attribute, pass the "id" of the <input>

const App = () => {
  return (
    <>
      <input type="checkbox" name="" id="check" />
      <label htmlFor="check">Checkbox</label>
    </>
  )
}


//****************** */


//?? use of useId()
// --> The id we used to link <label> and <input>
// --> We can generate it from useId()

const App2 = () => {
  const check_id = useId();
  return (
    <>
      <input type="checkbox" name="" id="check_id" />
      <label htmlFor="check_id">Checkbox</label>
    </>
  )
}


//?? Advantages :-
// a) It remains consistent during re-renders

// b) If there are multiple same components rendered in a parent component
// --> Then id generated inside those components will be different from each other

// e.g :-
const Parent = () => {
  return (
    <>
      <Child />
      <Child />
    </>
  )
}

const Child = () => {
  const check_id = useId();
  console.log(check_id);

  return (
    <>
      <input type="checkbox" name="" id="check_id" />
      <label htmlFor="check_id">Checkbox</label>
    </>
  )
}


