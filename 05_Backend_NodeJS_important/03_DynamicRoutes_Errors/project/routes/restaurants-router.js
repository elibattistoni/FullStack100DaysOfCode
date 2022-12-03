const uuid = require("uuid");
const express = require("express");
const resData = require("../util/restaurant-data"); // nb it has to have exports!

const router = express.Router();

// route for handling the request to the /recommend url
router.get("/recommend", function (request, response) {
  response.render("recommend");
});

// route for handling the POST request from the /recommend url
router.post("/recommend", function (request, response) {
  const restaurant = request.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();
  restaurants.push(restaurant);
  resData.storeRestaurants(restaurants);
  response.redirect("/confirm");
});

// route for handling the request to the /restaurants url
router.get("/restaurants", function (request, response) {
  let order = request.query.order;

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  const nextOrder = order === "asc" ? "desc" : "asc";

  const restaurants = resData.getStoredRestaurants();

  // sort restaurants by title
  restaurants.sort((resA, resB) => {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resA.name < resB.name)
    ) {
      return 1;
    }
    return -1;
  });

  response.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:restId", function (request, response) {
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
router.get("/confirm", function (request, response) {
  response.render("confirm");
});

module.exports = router;
