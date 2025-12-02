//?? 1) Sending POST request from Client to Server :-

// --> Sending data from client to server
// --> In the Backend, server will process it and store the data in the database

//--> Mainly the form fields (like input, button,etc) are used to send POST request


//?? Steps :-
// --> On Button click
// --> Take the value from the input field
// --> Now create a new object and store that received value
// --> For "id" property we can keep the updated length of the already available data array

// --> Add that in already received data array from API
// --> Update the new data array in the UI
// --> Now make a post API call, and send the new object
// --> Update the new data array received from the API


//?? Two ways of updating UI during POST request :-

//? a) Optimistic (Recommended)
// --> First update the UI with new data
// --> Then make the POST request for adding that data in the database
// --> Update the data again


//? b) Pessimistic
// --> First make the POST request and update in the database
// --> Then update in the UI after getting the new data

//?? NOTE :-
// --> The optimistic method will make the user feel that the data was instantly updated in the UI



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 2) Steps to make a POST request :-

// a) Create the input & button fields
{
  <>
    <input type="text" />
    <button onClick={addUser}></button>
  </>
}


// b) Extract the value from input field using onChange
{
  const [newUser, setNewUser] = useState("");
  <>
    <input type="text" onChange={(e) => {
      setNewUser(e.target.value)
    }} />
    <button onClick={addUser}></button>
  </>
}



// b) Create the addUser object 

{
  const [newName, setNewName] = useState("");

  const [users, setUsers] = useState([]);  // will contain the API data

  const addUser = () => {
    const newUser = {
      name: newName,
      id: users.length + 1
    }
  }

  <>
    <input type="text" onChange={(e) => {
      setNewName(e.target.value)
    }} />
    <button onClick={addUser}></button>
  </>
}



// c) Update the existing API data in the UI inside addUser()

{
  const addUser = () => {
    const newUser = {
      name: newName,
      id: users.length + 1
    }
    setUsers([...users, newUser])
  }
}


// d) Now make the POST API call inside addUsers() only

//?? How to make a post request using Axios?
// --> Instead of using axios.get(), use axios.post()
// --> Pass the data we want to send as the second argument of axios.post()

{
  const addUser = () => {
    const newUser = {
      name: newName,
      id: users.length + 1
    }
    setUsers([...users, newUser])

    axios.post("URL", newUser).then((res) => {
      console.log(res.data);
    })
  }
}

//?? To verify :-
// --> Go to the Network tab of Dev tools
// --> See the request method and request URL in the "Headers" tab
// --> See the data that we sent inside the "Payload" tab
// --> See the response tab, to get the updated data from backend after updating in the server



// e) Now update the UI again with the response of POST API call

//?? Why this is done?
// --> Even though we hae updated the data in the UI before making the API call
// --> Still if the API call got rejected and data could not be updated in the database, then we have to roll back

{
  {
    const addUser = () => {
      const newUser = {
        name: newName,
        id: users.length + 1
      }
      setUsers([...users, newUser])

      axios.post("URL", newUser).then((res) => {
        console.log(res.data);

        setUsers([res.data, newUser])
      })
    }
  }

}



// f) If any error comes, handle it in catch and then roll back to the earlier AI data

{
  {
    const addUser = () => {
      const newUser = {
        name: newName,
        id: users.length + 1
      }
      setUsers([...users, newUser])

      axios.post("URL", newUser).then((res) => {
        console.log(res.data);

        setUsers([res.data, ...newUser])
      })
        .catch((err) => {
          setErrors(err.message);
          setUsers(users)
        })
    }
  }
}


//?? How did the UI rolled back on API rejection?
// --> Even though we update the user data before the API call, still the rollback will work

//? #) Expectation :-
// --> Since we try to update the UI before the API call
// --> Hence the users variable got updated with new user object
// --> Hence, when we rollback inside catch{} , the old users cannot be brought back as it is already updated


//? #) Reality :-
// --> Before clicking Add button, let's say
users = ["A", "B"]

// --> Clicking on the button, addUser() runs
// --> Inside addUser(), the JS variables used inside it from outer function will be captured as a closure, the moment fn() was created

//#) Due to closures :-
// --> Even if the outer scope changes later
// --> the inner fn() keeps the old values it captured until it reruns

//?? NOTE :-
// --> Here even on re-renders due to State change, the addUser() will not re-run
// --> As it can only run on button click


//?? Due to Closures :-
// 🔹 BEFORE API CALL

users = ["A", "B"]

// 🔹 UI UPDATE (optimistic)

// React state becomes = ["A", "B", "C"]
// but closure still has = ["A", "B"]

// 🔹 API FAIL(catch runs)

// setUsers(users) → uses the old closure value only
// so UI resets to = ["A", "B"]




//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */

//?? 3) Better way of getting the rollback :-

//? 1st, while new object creation, give any random id like Date.now()

//? 2nd while updating UI, use the concept of prevState inside set()
//--> So that the actual State variable doesn't get affected by concurrent updates

//? 3rd, while again updating the UI from the response data on API success
// --> Use the map() on the already updated users array (before API call) & check which of its item's id === to the id we gave to the newUser
// --> Replace that object with our response data

//? 4th, Inside catch{} , filter on the already updated users array (before API call)
// --> Don't include the item, where its id === the newUser id


//?? NOTE :-
// --> Its better to use the concept of prevState while updating user State
// --> So that we can handle concurrent State updates



//?? Whole addUser() :-

const addUser = () => {
  const newUser = {
    id: Date.now(), // temp id
    name: newName
  };

  // 1️⃣ Optimistic update
  setUsers(prevUsers => [...prevUsers, newUser]);

  // 2️⃣ API call
  axios.post("URL", newUser)
    .then(res => {
      const savedUser = res.data;

      // Replace temp user with real user
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === newUser.id ? savedUser : u
        )
      );
    })
    .catch(err => {
      setErrors(err.message);

      // 3️⃣ Rollback the optimistic user
      setUsers(prevUsers =>
        prevUsers.filter(u => u.id !== newUser.id)
      );
    });
};


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ */


//?? 4) Whole code with both GET and POST request :-

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //For POST request
  const [newName, setNewName] = useState("")

  useEffect(() => {
    setIsLoading(true);
    axios.get("ENDPOINT")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
  }, [])


  const addUser = () => {
    const newUser = {
      name: newName,
      id: Date.now()
    }

    setData((prevState) => {
      return [...prevState, newUser]
    })

    // API call 
    axios.post("URL", newUser).then((res) => {
      setData((prevState) => {
        return (prevState.map((item) => {
          return item.id === newUser.id ? res.data : item
        }))
      })
    })
      .catch((err) => {
        setError(err.message)
        setData((prevState) => {
          return (prevState.filter((item) => {
            return item.id != newUser.id
          }))
        })
      })
  }

  return (
    <>
      <h1>List of Data</h1>
      {isLoading && <Loader />}
      {error && <em>{error}</em>}

      {/* Adding User */}

      <input type="text" onChange={(e) => { setNewName(e.target.value) }} />
      <button onClick={addUser}>Add User</button>

      {/* Showing users */}
      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </>
  )
}


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************* */


//?? 5) Async await version of making POST API call :-


// --> Here is the async await version of the addUser fn()
const addUser1 = async () => {
  const newUser = {
    id: Date.now(),   // temporary id
    name: newName
  };

  // 1️⃣ Optimistic UI update
  setData(prev => [...prev, newUser]);

  try {
    // 2️⃣ API call
    const res = await axios.post("URL", newUser);

    // 3️⃣ Replace temporary user with real server object
    setData(prev =>
      prev.map(item => item.id === newUser.id ? res.data : item)
    );

    setNewName(""); // Clear input

  } catch (err) {
    setError(err.message);

    // 4️⃣ Rollback optimistic update
    setData(prev =>
      prev.filter(item => item.id !== newUser.id)
    );
  }
};
