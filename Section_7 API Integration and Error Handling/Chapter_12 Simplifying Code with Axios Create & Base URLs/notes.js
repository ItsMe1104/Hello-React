//?? 1) Replacing common endpoint URLs with base URL

// --> We might use the same part of the URL, for all the different requests
// --> Hence, instead of writing it again and again
// --> We can use it as a base URL



//?? Steps :-

//? a) Setup :-
// a) Create a directory inside "src"
// b) Name it as utils
// c) Inside it create a file called "api-client.js"


//*************************** */

//? b) Using axios.create()
// --> Inside the "api-client.js" file
// --> import "axios" as named import from "axios"
// --> Then use the axios.create()

import { axios } from "axios"


//? axios.create()
// --> It will take an object as argument
// --> Inside the object, we can define the "baseURL" property
// --> And we can pass our repeated part of URL endpoint as the value to that property
// --> Export it 

export default axios.create({
  baseURL: "common URL"
})

//*************************** */

//?? c) Using baseURL from axios.create()

// --> import the axios.create() in component where we are making a request

//? Since it was a default export, we can give any name while importing

import apiClient from "../../src/api-client"


//***************** */

//?? For Using the baseURL :-
// --> Instead of using axios.get() or axios.put(), etc
// --> Replace axios with our imported axios.create() {here we have imported as apiClient}

// e.g :-
apiClient.get()
apiClient.post()
apiClient.patch()
apiClient.delete()

// --> Instead of writing the whole url
// --> Write the relative url only starting from our base URL

// e.g :-

apiClient.get("/users").then().catch()
apiClient.post(`/users`, newUser).then().catch()
apiClient.patch(`/users/${id}`, updatedUser).then().catch()
apiClient.delete(`/users/${id}`).then().catch()

