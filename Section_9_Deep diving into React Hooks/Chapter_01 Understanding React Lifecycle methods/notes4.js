//?? 1) Shortcut to create class component :-

// --> For functional component we use "rafce"
// --> For class component we use "rcc"

//?? NOTE :- Make sure ES Lint is installed in VS Code


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 2) prevState and prevProps in class Components :-

// --> These  are parameters available within certain lifecycle methods, primarily componentDidUpdate().
// --> They represent the component's props and state before the most recent update.

class notes4 extends Component {
  constructor() { }
  componentDidUpdate(prevProps, prevState) { }
  render() { }
}

//?? preProps :-
// --> It holds an object containing all the props that were passed to the component before current render cycle


//?? prevState :-
// --> It holds an object containing all the State variables of the component before the current render cycle.


// e.g :-
class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={() => {
          this.setState({ count: this.state.count + 1 })
        }}>Increment</button>
      </div>
    )
  }
}

// --> Similarly we can use prevProps also to compare the prevProps and the new Props after Component re-render


