//?? 1) Sending POST request from Client to Server :-

// --> Sending data from client to server
// --> In the Backend, server will process it and store the data in the database

//--> Mainly the form fields (like input, button,etc) are used to send POST request


//?? Steps :-
// --> On Button click
// --> Take the value from the input field
// --> Now create a new object and store that value
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