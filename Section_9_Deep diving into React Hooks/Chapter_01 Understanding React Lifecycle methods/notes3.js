//?? 1) Binding of "this" :-

// --> In the class component, if we are using any eventHandler in some button or other tag


//? Condition 1 (anonymous function):-
// --> If we are passing normal anonymous function inside that eventHandler :-
// --> then we can't access or update State variables or props using "this"
// --> It will give error

class notes3 extends Component {
  constructor() {
    this.state = { count: 0 }
  }

  render() {
    const { count } = this.state;
    return (
      <>
      // Will give error
        <button onClick={function () {
          this.setState({ count: count + 1 })
        }}>Increment</button>
      </>
    )
  }
}

//?? Reason :-
// --> This is because "this" inside normal functions point to undefined.
// --> Hence, it doesn't point to the class Component itself so that we can use its state and props


//?? Solution :-
// --> If using the anonymous function, just use the bind() on it to bind it with "this"
// --> As "this" is used in the render() method, it will point to the class itself 

// --> We can use the anonymous function directly with bind() or use bind() with function expression



//?? What bind does?
// --> bind() takes an object as an argument.
// --> bind returns a method
// --> The method will be a copy of the function where we called the bind
// --> But this copy function's "this" will point to the object passed in the argument of bind()


class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  render() {

    const handleClick = function () {
      this.setState({
        count: this.state.count + 1
      })
    }

    return (
      <>
        // using anonymous function directly with bind()
        <button onClick={function () {
          this.setState({ count: this.state.count + 1 })
        }.bind(this)}>Increment</button>

        // using function expression with bind()
        <button onClick={handleClick.bind(this)}>Increment</button>

      </>
    )
  }
}


//******************************* */


//? Condition 2 (arrow function):-
// --> If we are passing arrow function inside the eventHandler of classComponent:-
// --> It will work fine and then we can access or update State variables or props using "this"

class notes3 extends Component {
  constructor() {
    this.state = { count: 0 }
  }
  render() {
    const { count } = this.state;
    return (
      <>
        <button onClick={() => {
          this.setState({ count: count + 1 });
        }}>Increment</button >
      </>
    )
  }
}

//?? Reason :-
// --> This is because arrow functions don't have their own "this".
// --> They borrow the "this" of their parent
// --> Hence, the parent of that arrow function is render()
// --> Since render() is a class method, hence its "this" points to the class itself

//?? Therefore, arrow function's "this" points to the class itself when put inside the event handler.


//?? NOTE:-
// --> It will work same for the arrow function expression

// e.g :-

class notes3 extends Component {
  constructor() {
    this.state = { count: 0 }
  }
  render() {
    const { count } = this.state;
    // arrow function expression
    const handleClick = () => {
      this.setState({ count: count + 1 });
    }
    return (
      <>
        <button onClick={handleClick}>Increment</button >
      </>
    )
  }
}


//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) (OPTIONAL) Binding the function in constructor :-

// --> We can also bind the function in the constructor as a variable
// --> Then we can use that variable using "this" inside the eventHandler
// --> But then we have to define the function as a class method


class notes3 extends Component {
  constructor() {
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { count } = this.state;

    return (
      <>
      // using this.handleClick from constructor()
        <button onClick={this.handleClick}>Increment</button >
      </>
    )
  }
}


//?? NOTE :-
// Here ,
this.handleClick = this.handleClick.bind(this)

// --> the handleClick on LHS is the attribute for the class object

// --> The handleClick on RHS is the handleClick() method defined in class as bind() can only be called by a function


