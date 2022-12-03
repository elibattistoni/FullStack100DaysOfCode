/// 1. require built in backages
// const fs = require("fs");
const path = require("path");
/// 2. require third party packages
// const uuid = require("uuid");
const express = require("express");
/// 3. require your own files
// NB if it was in the same folder, you can require it with "./restaurant-data" (this ./ tells node js that the js is a sibling; ./ means relative path)
// but since it is not in the same folder in our case:
// const resData = require("./util/restaurant-data"); // nb it has to have exports!
// resData will be an object with 2 methods
const defaultRoutes = require("./routes/default-router");
const restaurantRoutes = require("./routes/restaurants-router");
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

app.use("/", defaultRoutes);
//NB with use "/" does not check for exact match (like for .post and .get) but it checks only the BEGINNING of the incoming path
// therefore this will become active for all incoming requests

app.use("/", restaurantRoutes);

/// error handling
app.use(function (request, response) {
  response.status(404).render("404"); // render the 404.ejs template that we prepared
});

app.use(function (error, request, response, next) {
  response.status(404).render("500"); // render the 500.ejs template that we prepared
});

app.listen(3000);

//==============================================================================
//# Express router
//==============================================================================
// there is a feature offered by the Express package that allows you to group routes in different files by route or responsibility
// NB the express router allows us to group and split our toures so that the project is easier to maintain
// create a new folder named "routes" which will contain the route configuration

//==============================================================================
//# Query parameters
//==============================================================================
/*
e.g. you want to sort the restaurants in the page where they are listed.
Look at the code in restaurants.ejs

<form action="/restaurants" method="GET">
  <input type="hidden" value="asc" name="order">
  <button class="btn">Change order</button>
</form>

If you click on the button, in the URL will appear the query parameter ?order=asc
/ query parameter = extra optional value that can be added to a URL that will not change the page that is lodaded (typically)
/ but instead it might be used on the server-side code to change what shows up on the page and how things are displayed on the page

NB in the server side code we can access the query parameter value and e.g. change the sorting based on the query parameter value with
const order = request.query
.query is a special property of the request object, like .body (.body is only populated if the request was a post request)
.query is always accessible and holds any query parameter we might have (keep in mind that the query parameters are optional therefore we might not always have them)
*/
