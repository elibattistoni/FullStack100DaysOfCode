const userName = "Elisa Battistoni";

console.log(userName);

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

const http = require("http"); // to use the built in http package of node, and this will return an object with properties and methods
const server = http.createServer(); // returns an object that has all the server functionality that is required

/*
if we want to host our node js driven website, we would still reach out to an external hosting provider 
(like we did with netlify)
but the only difference would be that we don't use a simple drag and drop hosting provider, but we will need a hosting provider that offers a computer (server) that
has already node js pre-installed

NB 1. create a server that knows how to handle incoming requests and send back responses with
# const server = http.createServer()
NB 2. listening on a port number
*/

server.listen();
