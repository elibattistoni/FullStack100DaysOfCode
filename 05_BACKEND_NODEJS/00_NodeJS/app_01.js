//==============================================================================
// # Introduction to NodeJS
//==============================================================================
/// Node JS is a Javascript runtime that allows us to create responses programmatically with code that executes on the remote machine

// const userName = "Elisa Battistoni";

// console.log(userName);

/*
IMPORTANT NodeJS is just JavaScript (same syntax, same rules), but there are only some differences
/ e.g. since it does not execute in the browser, there is no DOM with which you can interact
/ (you CANNOT select and change HTML elements because it is decoupled from an HTML driven website)
NB with Node JS we write code that executes stand-alone on a computer, on a server
we might be dealing with HTML files to some extent but there is no tight coupling as we have in the browser

IMPORTANT how can we execute this file with NodeJS? we will use the tool node to invoke and execute this code
Open terminal and type:
NB $ node app.js

IMPORTANT creating a custom NodeJS Server: build a web server on our own
with netlify drop, we used a hosting provider that created a web server and hosted our files for us

"server side code" i.e. code that runs on a remote machine, which once you deploy your application, will be exposed to the worldwide web
and which will handle incoming requests from your visitors: this is what we need to write ourselves with NodeJS
so that in a second ste we can have full control over how requests are parsed, which data is extracted, and which data is sent back as a response
because we no longer just want to send back HTML files automatically
the idea of using NodeJS is that we have more control over what happens on the server

We will use certain features that are built into NodeJS.
Node JS comes with many packages that expose different features that you can use in your NodeJS code
e.g. http package that gives us certain functionalities that we can use in our code to listen to incoming requests and to send back responses
*/

//==============================================================================
// # Create a local web server
//==============================================================================

// TODO uncomment to see this work (but not necessary because it is integrated in later code)
// const http = require("http"); // to use the built in http package of node, and this will return an object with properties and methods
// const server = http.createServer(); // returns an object that has all the server functionality that is required

/*
if we want to host our node js driven website, we would still reach out to an external hosting provider 
(like we did with netlify)
but the only difference would be that we don't use a simple drag and drop hosting provider, but we will need a hosting provider that offers a computer (server) that
has already node js pre-installed

NB 1. we create a server that knows how to handle incoming requests and send back responses with
# const server = http.createServer()
NB 2. we start listening on a port number
# server.listen(3000)

/ PORTS
amazon.com => Send a request to Amazon's server
NB when working with a network, which is what we do when we send requests, then we also have the concept of ports

every computer has different ports, which are basically entry points to that computer that are either opened or closed
entry points for network traffic; http requests sent from your browser to some remote machine require such entrypoint in order to be handled by the server

by default, for most computers, most ports are clased by default for security reasons, because you want to have as little entry points as possible

by default, when you send a request to amazon.com, you send that to port 80 by default
amazon.com:80 (for uncrypted request)
amazon.com:443 (for encrypted request)
actually by defualt you typically use 443 because that uses SSL which sends the request in a encrypted secure way

the ports 80 and 443 are the default ports exposed (= opened) by all web servers to handle incoming traffic (= requests)
but when working with Node JS and creating your own server, you need to let Node JS know on which port you want to listen for incoming requests
the first parameter to .listen() is the port number and typically we use something like 3000, which is a port that typically is not opened
and during development, for playing around with our server and test whether everything works, we want to use such non default ports so that we don't clask with any other services
that might be running on our local dev machine
NB if we want to deploy the code and move it to a real remote machine, which we rented from some hosting provider, we would swap this 3000 with 80 or 443

IMPORTANT this server still has no isntructions for what to do if an actual request reaches it: HANDLING REQUESTS and CREATING CUSTOM RESPONSES
to add more instructions and tell node js what to do if we have a request coming in:
NB we can point at a function and pass a pointer at another function (i.e. insert a callback function) as a parameter value to createServer
so we create the handleRequest function and pass it to the createServer function
NB so that we let NodeJS know that the handleRequest function should be executed when there is an incoming request

*/

//==============================================================================
// # Sending back a response
//==============================================================================

const http = require("http");

// const handleRequest = function(){}

function handleRequest(request, response) {
  // NB the parameters will be passed in automatically by NodeJS
  // in this function we can work with this request and e.g. extract data from it, and/or prepare a response that should be sent back
  // NB you should send back a response: if you create a web server that does not send back responses to requests,
  // NB it will be an invalid web server and browsers will show errors when they try to talk to it
  // NB because a web server needs to send back responses for incoming requests
  response.statusCode = 200;
  // data that should be part of the response: e.g. the text or the HTML code that should be shown by the browser
  // before qe created HTML files for that, but here, since we control what happens on the server with node js,
  // we can define the HTML code that should be sent back, here in our js code (NB one of the main ideas of using server-side code is that you can generate HTML code dynamically
  // so that you write code that generates HTML code)
  response.end("<h1>Hello world!</h1>"); // .end() because you are ending the preparation of the response and you are about to send it to the client
  // this html here is temporary, we will use files again soon
}

const server = http.createServer(handleRequest);
// the values for request and response will be passed into this function once node js executes this function for us whenever a requesr is reaching that server

server.listen(3000);

/*
To test if everything worked:
node app.js
the local server keeps running (it is our own web server running on our local machine)

we can send requests to this server from inside our own computer since the server is running on our computer
so even withouth the network being opened up, we can still send the request to the server if we use a browser installed on the same computer

so go to your browser and enter
/ localhost:3000
localhost is an alias that refers to my local computer
*/
