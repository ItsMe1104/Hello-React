//?? 1) Client Server Architecture :-
// --> It is a common way where computers communicate over a network

// e.g :-
// --> When we open Instagram on our phone (client)
// --> The app sends a request to Instagram's backend (server)
// --> server returns posts, likes, comments, etc.


//?? Client
// --> A Client is the one who will make some request
// --> Request to get some data or services
// e.g :-
// Browser, Mobile App, React website, Postman, etc
//?? Responsibilities :-
// a) Request info
// b) Display data to the user
// c) Handle UI



//?? Server
// --> A server is the one which will send a response
// --> Response to provide data/services
// e.g :-
// whole machine, NodeJS backend software, Cloud service (AWS), etc
//?? Responsibilities :-
// a) Receive requests
// b) Process logic
// c) Interact with database
// d) Return response (data / success / error)


//?? Summary :-
// --> Client will send an HTTP request to the Server through UI using HTTP methods
// --> Server will receive that response
// --> Process it, get the data from database
// --> Send an HTTP response back to Client
// --> The response will be parsed by Client & show to the UI

// --> In Client side, the tech stack can be HTML,CSS,JS, React (Frontend)
// --> In server side, the tech stack can be NodeJS, Java, PHP, etc (Backend)

//?? NOTE :-
// --> Client cannot access DB directly for security reasons


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 2) Code wise (Client Server Architecture) :-
// Client :-
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(data => console.log(data));

// Server :-
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Hrithik" }]);
});


//?? Advantages :-
// i) Security as client cannot access DB directly
// ii) Scalability as Server can support many clients
// iii) Centralized control as Server manages everything


//?? Disadvantages :-
// i) Server failure affects all clients


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) HTTP request methods & status codes :-

// i) GET :- fetch data from server
// ii) POST :- submit data to server
// iii) PUT :- replace data from server
// iv) PATCH :- update specific data at server
// v) DELETE :- delete data from server


//?? NOTE :-
// --> The Backend APIs are also made for specific HTTP methods
// --> Hence, specific response are sent

//?? Difference between PUT and PATCH :-
// PUT :- Replaces the entire object
// PATCH :- Updates only the fields you send

//?? NOTE :-
// --> For PUT request if any field is missing in the body, it is usually treated as null or removed.
// --> But it is not compulsory rule, it depends on backend implementation


//? e.g (Stored data) :-
// {
//   "id": 1,
//   "name": "Hrithik",
//   "age": 25,
//   "city": "Mumbai"
// }


//?? PUT request :-
// {
//   "name": "Hrithik Kumar"
// }


//?? PATCH request :-
// {
//   "name": "Hrithik Kumar"
// }


//?? Result (from PUT) :-
// {
//   "id": 1,
//   "name": "Hrithik Kumar",
//   "age": null,
//   "city": null
// }


//?? Result (from PATCH) :-
// {
//   "id": 1,
//   "name": "Hrithik Kumar",
//   "age": 25,
//   "city": "Mumbai"
// }


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 3) Important HTTP status codes :-
// --> 200 :- Success/OK
// --> 404 :- Not Found
// --> 502 :- Bad Gateway
// --> 503 :- Service Unavailable
// --> 504 :- Gateway Timeout


//?? Bad Gateway :-
// --> We reached a server
// --> That server depends on other server/service
// --> That second server failed
// --> So first server returns Bad Gateway