// require file system project which is needed for manging files
const fs = require("fs");
const path = require("path");

//==============================================================================
//# Create a server with ExpressJS (part 1: CREATE)
//==============================================================================

const express = require("express"); // this returns a function
const app = express(); // execute the function and store the result in a variable express application (which is an object) --> app object

app.use(express.urlencoded({ extended: false }));
// the .use() method allows us to handle incoming requests, but it does not care about what request, it is applied to all requests
// we could define a path but it is not required
// we can just add an extra handler that should be executed on all incoming requests
// NB these general handler functions which apply to more than one type of request are called "middleware function" because they are in the middle between Express seeing that request and our code handling that request.
// here we need a middleware function that will look if the incoming request has any kind of data and extract that data
// we will use Express for this, not the app;
// urlencoded is a method that will set up a body parser (i.e. an incoming request data parser) that will look at all the incoming requests and if they carry form data (i.e urlencoded looks for form data) and
// if they carry form data, it will parse that included data and transform it into a Javascript object
// {extended: false} is to avoid getting warnings

// app.listen(3000); // on this app we can call listen() // NB to do it after handling requests

//==============================================================================
//# Handle requests (with the get method)
// let Express (therefore, let Node) know what should happen
// for different requests that might be sent to different paths on our URL
//==============================================================================
// NB the get method allows us to define a request handler for incoming get requests
// a get request is the default kind of request that is sent by a browser if you just enter a URL and hit Enter in the browser
//NB the path is the part after the domain + prot number. For "localhost:3000/users", "localhost:3000" is the domain (including the port number) and the path is "/users"
/// app.get(path, function-to-be-executed-for-this-request)
///NOTE the combination of path and a request + response handler function (i.e. the inpu parameters of app.get()) is called a "route" or "route handler"
// NB do not need to set the status code because Express sets it to 200 as default (we can override it, but later)

app.get("/currenttime", function (request, response) {
  response.send(`<h1>${new Date().toISOString()}</h1>`);
}); // handle requests that are sent to localhost:3000/currenttime

app.get("/", function (request, response) {
  response.send(
    // in terms of form submission, you can set the path the request should be sent to and the method that should be used for that request
    // the method: usually you use a POST method for sending data from the browser to the server if the server should then store that data
    `<form action="/store-user" method="POST"><label>Your name: </label><input type="text" name="username"><button>Submit</button></form>`
  );
}); // handle requests that are sent to localhost:3000/

// now let's handle a POST request to the path /store-user
// with the method .post() you handle post requests
app.post("/store-user", function (request, response) {
  // parse the request data before use it in JS code (see app.use())

  const userName = request.body.username;
  // Step 1: log to console
  console.log(userName);
  response.send("<h1>Username stored!</h1>");
  // Step 2: store username in users.json file (which was created empty with only [] in it)
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // important sync method because it performs the operation instantly
});

/*
The great thing about HTML forms is that when used in a browser with the POST method, once the form is submitted, the browser will automatically send a POST HTTP request
to the path defined inaction="" on the current URL, and it will take all the fields that are in the form and add them as data to that outgoing request.
The attribute name="username" gives us a key that we can use to extract the data inserted into this input

NB when you submit a form with the POST method, the browser automatically reads all the form inputs that have a "name" attribute and adds their data to this request as so-called "Form Data"
*/

// add a new path that you can access through a get request where we extract the data that is stored in the file and send back some HTML content
app.get("/users", function (request, response) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  const markup =
    "<ul>" + existingUsers.map((user) => `<li>${user}</li>`).join("") + "</ul>";
  console.log(markup);
  response.send(markup);
});

//==============================================================================
//# Create a server with ExpressJS (part 2: LISTEN)
//==============================================================================

app.listen(3000);

// run:
/// node app.js to see it work
