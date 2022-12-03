const express = require("express");

const router = express.Router();

// route for handling the request to the index/homepage
router.get("/", function (request, response) {
  response.render("index");
});

// route for handling the request to the /about url
router.get("/about", function (request, response) {
  response.render("about");
});

module.exports = router;
