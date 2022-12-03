const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");
// console.log(filePath);

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// you can expose (or export) functions and variables / constants
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
