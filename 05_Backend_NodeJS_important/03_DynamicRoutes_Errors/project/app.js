/// 1. require built in backages
// const fs = require("fs");
const path = require("path");
/// 2. require third party packages
const uuid = require("uuid");
const express = require("express");
/// 3. require your own files
// NB if it was in the same folder, you can require it with "./restaurant-data" (this ./ tells node js that the js is a sibling; ./ means relative path)
// but since it is not in the same folder in our case:
const resData = require("./util/restaurant-data"); // nb it has to have exports!
// resData will be an object with 2 methods

//
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
  const restaurants = resData.getStoredRestaurants();
  restaurants.push(restaurant);
  resData.storeRestaurants(restaurants);
  response.redirect("/confirm");
});

// route for handling the request to the /restaurants url
app.get("/restaurants", function (request, response) {
  const restaurants = resData.getStoredRestaurants();

  response.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.get("/restaurants/:restId", function (request, response) {
  const id = request.params.restId;
  const restaurants = resData.getStoredRestaurants();
  const selectedRestaurant = restaurants.filter((r) => r.id === id)[0];

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

/// error handling
app.use(function (request, response) {
  response.status(404).render("404"); // render the 404.ejs template that we prepared
});

app.use(function (error, request, response, next) {
  response.status(404).render("500"); // render the 500.ejs template that we prepared
});

app.listen(3000);
