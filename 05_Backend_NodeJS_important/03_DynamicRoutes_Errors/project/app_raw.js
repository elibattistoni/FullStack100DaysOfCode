// NB this is the code before the refactoring of app.js

const path = require("path");
const fs = require("fs");

/// third party package for creating unique ids: npm install uuid
const uuid = require("uuid");

// require express and create app
const express = require("express");
const { log } = require("console");
const app = express();
// set path to views folder
app.set("views", path.join(__dirname, "views"));
// set path to static files folder
app.use(express.static("public"));
// set EJS as template engine
app.set("view engine", "ejs");
// middleware for extracting data from JSON format
app.use(express.urlencoded({ extended: false }));

// route for handling the request to the index/homepage
app.get("/", function (request, response) {
  response.render("index");
});

// route for handling the request to the /recommend url
app.get("/recommend", function (request, response) {
  response.render("recommend");
});
// route for handling the POST request from the /recommend url
app.post("/recommend", function (request, response) {
  const restaurant = request.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  response.redirect("/confirm");
});

// route for handling the request to the /restaurants url
app.get("/restaurants", function (request, response) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  response.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:restId", function (request, response) {
  const id = request.params.restId;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  const selectedRestaurant = storedRestaurants.filter((r) => r.id === id)[0];

  /// ERROR HANDLING
  // send back a response if you don't find a restaurant
  if (!selectedRestaurant) response.status(404).render("404");
  // send response if found
  response.render("restaurant-detail", { restaurant: selectedRestaurant });
});

// route for handling the request to the /confirm url
app.get("/confirm", function (request, response) {
  response.render("confirm");
});

// route for handling the request to the /about url
app.get("/about", function (request, response) {
  response.render("about");
});

//==============================================================================
//# Serving the restaurant detail page: dynamic routes
//==============================================================================
/*
/ What are dynamic routes and why do we need them?
Restaurants are dynamic user generated data (we have a varying amout of restaurants and new restaurants can be added at any time, therefore we don't know in advance how many results we have)
/ Therefore every restaurant whould have a unique identifier and then we could use the same template with different data for different restaurants
/ we want to define one route in our express which has some dynamic segment in the path
*/

//==============================================================================
//# ERROR HANDLING: restaurant not found
//==============================================================================
// what happens if in the dynamic route we try to get a restaurant that does not exist?
// if I manually change the ID in the URL with an ID that does not exist in our dataset

// 404 is the defgault status code that servers return if a requested soure (page) has not been found (200 was the SUCCESS status code)
// so we create a 404.ejs file

//==============================================================================
//# ERROR HANDLING: urls not found (e.g. typo in the url)
//==============================================================================
// NB this is a feature that we want to add to all our websites because we want to show some standard error page
// for this kind of issue, you cannot define all possible cases for throwing errors
// therefore you should define a GENERAL CATCH ALL ROUTE that catches all requests that have not been handled by other routes up to this point
// there are many ways for handling this, but the most common is to define your own custom middleware
// NB middleware is a functionality that executes on multiple incoming requests or maybe on every incoming requests
// NB and very often it is not the last step in handling that request but only one step of many
// NB we want to add our own middleware that handles all requests that have not been handled up to this point and sends back the 404.ejs page for all of them
// IMPORTANT you should add it AT THE BOTTOM OF THE FILE JUST BEFORE app.listen()
// because all requests are processed by the middleware functions that we wrote at the top of the page, and then the requests are processed by the different routes that is designed to handle it
// and we want to send back our 404 page only if no route has handled that request

// app.use allows us to register a function that executes for every incoming request
// and we can pass our custom handling function to app.use()
// NB app.use() would still allows us to add a URL which acts as a filter, e.g. app.use("/admin", function(){}) which handles requests that only start with "/admin" and other request would be ignored
// but this is not our case (commented because placed later just before app.listen())
// app.use(function (request, response) {
//   response.render("404");
// });

//==============================================================================
//# Error handling: 500
//==============================================================================
// 404 is just one kind of error that could occurr; it is an error caused by a user of the website because they entered an invalid url
// but we need to handle also the server side error
// e.g. in our app, one thing that could fail is reading or writing to the restaurants.json file
// if this was a real website hosted on some remote machine if too many visitors were visiting the page at the same time, there might be multiple conflicting read or write operations and hence one of these could fail
// (this is a scenario that we can prevent by using a proper database) but it is still one possible scenario where things can go wrong
// NB in web development you should never assume that things just work
// let's siumulate the error in reading or writing the data by renaming the restaurants.json file (it is not a realistic scenario, it just allows us to test if things work)
// and create a 500.ejs file (500 is the default error code for server-side errors)
// NB we are going to use again app.use() but this time the error handling function works a bit differently: you gave to pass in 4 parameters
// NB these 4 parameters tell Express that this is the special default error handler middleware function that should be invoked by Express if some error occurs anywhere in your Express application
// 4 PARAMETERS: 1. error object, 2. request, 3. response, 4. next
// the error object is generated and populated automatically by Express and it simply contains more information about why the error occurred
// ( you could use that information for handling different errors in different ways)
// for the moment we will not use it but we need to accept all 4 parameters
// next is a parameter that you could accept in all your routes nd in the standard middleware (advanced topic)
// next allows you to have multiple middlewares that will work together, and when you call next() inside of a middleware, it allows the request ro move on to the next middleware or route handler in line

// commented and inserted below just after the error handling with 404
// app.use(function(error,request,response,next){
//   response.render("500")
// })

//==============================================================================
//# Working with STATUS CODES
//==============================================================================
/// 404 resource not found error (CLIENT SIDE ERROR)
/// 500 SERVER SIDE ERROR
// list of HTTP status codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// NB if you try tochange the id in the url, you will get "page not found" but the status codes in the network tab will still be 200ish or 300ish
// but this is an errore and we want to communicate the browser the correct status code (not 200 or 300) so that the browser knows that for this request we did not get a success response
// so you do:
/// app.use(function (request, response) {
///   response.status(404).render("404");
/// });
// and the .status() allows you to set a custome status code (the default is 200)
// adding this thing does not change anything to the user but it is important for us developers, and it can have an impact on optimizations that the browser might perform
// this is why we should be correct technically even if the user does not directly see the changed status code

//==============================================================================
//#
//==============================================================================

//==============================================================================
//#
//==============================================================================

// NB with the addition of .status() now these are technically correct ways of handling errors and sending error responses
app.use(function (request, response) {
  response.status(404).render("404"); // render the 404.ejs template that we prepared
});

app.use(function (error, request, response, next) {
  response.status(404).render("500"); // render the 500.ejs template that we prepared
});

app.listen(3000);
