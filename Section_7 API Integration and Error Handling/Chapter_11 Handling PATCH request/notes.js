//?? 1) Difference between PUT & PATCH request :-

// --> In REST APIs, both are used to update resources

//#) PUT :-
// --> It is used to replace an entire resource (e.g all fields of an object from a list of objects)
// --> If the resource (object) doesn't exist, it can be used to create it at that URL

//#) PATCH :-
// --> It is used to apply partial modifications to a resource
// --> Means only updating specific fields & not the entire object


//***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************


//?? 2) Scenario for PATCH request :-

// --> Create another button "Update" beside the delete button for every user
// --> On clicking that button the name of the user should get an additional "updated" appended at the end


//?? Steps :-

//? a) First create the update button beside the delete button for every user
// --> In the onClick handler, pass the entire object whose field we want to update

{
  <table>
    <tbody>
      {
        users?.map((user) => {
          return <tr key={user.id}>
            <td><p key={user.id}>{user.name}</p></td>
            <td><button onClick={deleteUser(user.id)}>Delete</button></td>
            <td><button onClick={updateUser(user)}>Update</button></td>
          </tr>
        })
      }
    </tbody>
  </table >
}


//?? Create the updateUser fn()
// --> Such that the UI is updated first
// --> Then the PATCH request is made
// --> If it is successful, then no need to update in UI
// --> If rejected, then roll back using closures


const updateUser = (user) => {

  //  using spread operator to update only name field
  const updated_user = {
    ...user,
    name: user.name + " Updated"
  }

  setUser(users.map((item) => {
    return item.id === user.id ? updateUser : item
  }))

  axios.patch(`URL ${user.id}`, updated_user).then((res) => {
    console.log(res.data);
  })
    .catch((err) => {
      setError(err.message)
      setUser(users)
    })
}


//?? NOTE :-
// --> For patch request, send the entire updated Object to the URL unless specified otherwise