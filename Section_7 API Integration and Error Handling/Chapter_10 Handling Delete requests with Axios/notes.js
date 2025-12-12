//?? 1) Delete request with Axios

// --> Here all the Users will have a delete button attached with them
// --> If we click on a delete button, the specific user should be deleted from the list


//?? NOTE :-
// --> It is same as POST request
// --> We will just pass the id of the specific user, we want to delete in our deleteUser fn()


//? In our delete fn() :-
// --> We will first update in the UI
// --> Then make the delete API request and pass the id in the URL itself (mostly it happens)
// --> For success, no need to update in the UI again
// --> For rejection, just rollback


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Steps to Make a Delete API Request :-

//? a) Setup :- First create a delete button beside every user from the list
//--> Instead of putting them as independent divs
//--> Instead of <ul> can create a table, and put the users and a delete button as table rows, with the help of map()

//?? NOTE :-
// --> There is no issue in using <ul> also

{
  <table>
    <tbody>
      {
        users?.map((user) => {
          return <tr key={user.id}>
            <td><p key={user.id}>{user.name}</p></td>
            <td><button onClick={deleteUser(user.id)}>Delete</button></td>
          </tr>
        })
      }
    </tbody>
  </table >
}

//NOTE :-
// --> Always pass a key in table rows for better performance



//? b) Create the deleteUser fn()
// --> First filter out the initial user array & choose only those users whose id does not match the id passed in the argument of deleteUser()

// --> Then update in the UI using set()
// --> Then send the Delete Request to update in the database

//?? If request resolved :-
// --> do nothing as the UI is already updated

//?? If rejected :-
// --> do the rollback using the closure concept




const deleteUser = (delete_id) => {

  setUser(users.filter((item) => { return item.id !== delete_id }));

  axios.delete(`URL/${delete_id}`).then((res) => {
    // Do nothing
    console.log(res.data);
  }).catch((err) => {
    setErrors(err.message);
    setUsers(users);                // using concept of closures
  })
}


//?? NOTE :-
// --> Instead of using closures, we can also store the initial users array reference in a backup variable before updating in UI
// --> Then using that backup variable, we can roll back 

const deleteUser2 = (delete_id) => {

  const backup = data;
  setUser(users.filter((item) => { return item.id !== delete_id }));

  axios.delete(`URL/${delete_id}`).then((res) => {
    // Do nothing
    console.log(res.data);
  }).catch((err) => {
    setErrors(err.message);
    setUsers(backup);                // using backup variable
  })
}



//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Using the async-await method (Modern way) :-

const deleteUser1 = async (id) => {
  // 1️⃣ Save previous state for rollback
  const backup = data;

  // 2️⃣ Optimistic removal
  setData(prev => prev.filter(item => item.id !== id));

  try {
    // 3️⃣ API call
    await axios.delete(`URL/${id}`);

    // Success → nothing else needed

  } catch (err) {
    setError(err.message);

    // 4️⃣ Rollback on failure
    setData(backup);
  }
};


//***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

