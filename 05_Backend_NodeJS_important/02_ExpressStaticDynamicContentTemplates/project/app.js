const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

//==============================================================================
//# Set up express for using template files
//==============================================================================
// tell express where it can find out template files that we want to process with the templating engine
app.set("views", path.join(__dirname, "views"));
// with "view engine" we tell express that we want to use a template engine for processing our view files before we send them back as HTML
// the second parameter is the name of the template engine
app.set("view engine", "ejs");
// NB now you have to change the extension of .html files in the views folder to .ejs files (but youdon't need to change the content of the files!)

/*
Here we want to transform the static site (HTML, CSS, Javascript code) into a dynamic site that is served by app.js.
We want to define a few routes (or paths) that can be reached with GET requests for returning different HTML pages
*/

//==============================================================================
//# Serve static files
//==============================================================================

/// let's register a special middleware function that helps us serving static files
// express.static() sets up a request handler that will be executed on every incoming request that checks if this is a request for a static file (JS or CSS) and
// checks if it is able to deliver that file from some folder in the project folder
// and we need to pass in a parameter, i.e. the path to the folder that contains the static files (here "public")
app.use(express.static("public"));
/// withi this line of code we are telling Express that for every incoming request, it should check if it is a request to a file that can be found in the public folder
/// and if it is, then the file will be returned as a response, and if it is not, the request will be forwarded to other routes
/// and if we don't have any route that handler the request, the request will fail
// NB this is how we can serve static files along with our server-side routes

//==============================================================================
//# Middleware for extracting incoming data
//==============================================================================
app.use(express.urlencoded({ extended: false }));

//==============================================================================
//# Define routes for handling requests
//==============================================================================
// root route (used for serving index.html)
app.get("/", function (request, response) {
  //# before using .ejs templates:
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // response.sendFile(htmlFilePath);

  //# with .ejs templates:
  response.render("index"); // you don't have to explicitly write the .ejs extension because it already knows that is an ejs file (we use ejs as engine therefore it will automatically look for ejs files)
  //NB render is a method that is available on the response object and it renders a template (i.e. it receives a template files from a template engine and converts it into HTML which is then sent to the browser)
});

// route for showing a list of restaurants
/// moved in another section which deals with injecting dynamic content in templates

app.get("/recommend", function (request, response) {
  //# before using .ejs templates:
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // response.sendFile(htmlFilePath);

  //# with .ejs templates:
  response.render("recommend");
});

app.get("/confirm", function (request, response) {
  //# before using .ejs templates:
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // response.sendFile(htmlFilePath);

  //# with .ejs templates:
  response.render("confirm");
});

app.get("/about", function (request, response) {
  //# before using .ejs templates:
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // response.sendFile(htmlFilePath);

  //# with .ejs templates:
  response.render("about");
});

// NB change these paths also in the HTML code!!

//==============================================================================
//# Handling user input when form is submitted
//==============================================================================
// we need to handle an incoming POST request
// because if a form is submitted with the intention of that data to be stored on the server
// we want a post request so that the data can be merged with the request body

// best practice this should be just after the .get("/recommend") because it means that the two routes are connected
// NB you can use the same path (i.e. /recommend) for different routes as long as they are associated to different HTTP methods
app.post("/recommend", function (request, response) {
  // we store it again in a file because we don't know yet how to work with databases
  const restaurant = request.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  /// redirect to different page!
  response.redirect("/confirm"); // this does not change when we use templates, we still want to redirect
});

//==============================================================================
//# Generate HTML code dynamically with the help of template files
//==============================================================================
/// generate HTML content dynamically on the server side with a feature called template that allows to write regular HTML code in HTML files with some dynamic placeholders inside the HTML file.
// in Express we have a few populare template enginges, and one of the most popular ones is EJS which is a package that we have to install
// NB now the HTML content that is received by the browser is actually generated dynamically with the help of template engine on the server
// why is this helpful? because now we can inject logic and dynamic content into these files so that the HTML content can be generated dynamically on the server and can therefore change over time

//==============================================================================
//# Inject dynamic content
//==============================================================================
// In the restaurant.ejs file you can insert dynamic content with
/// <%= numberOfRestaurants %>
// NB the equal sign performs "escaping": it escapes the value that it outputs, i.e. it translates it into text
// useful for outputting user-generated content (and not fit for including some HTML code that we store in a different file)
// then here, in the request handler that uses that file:

// route for showing a list of restaurants
// in the function you want to return the restaurants.HTML file
app.get("/restaurants", function (request, response) {
  //# before using .ejs templates:
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // response.sendFile(htmlFilePath);
  // NB the sendFile function will look into the file and see if that file contains HTML content
  // and it will return this file such that the browser automatically understands that it received HTML content

  // get number of restaurants
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  //# with .ejs templates:
  response.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// NB in EJS you can output simple values but you can also use a slightly different syntax to write your JS logic inside an ejs file
// e.g. loopring through all the restaurants and repeating the list item "restaurant-item" for every restaurant

//==============================================================================
//# Render conditional content
//==============================================================================
// cfr restaurants.ejs

//==============================================================================
//# Including partial content
//==============================================================================
// we can use templating engine to make our life easier i.e. to replace parts of code in the .ejs file (html) that are shared among several files
// i.e. the header and aside part are the same in every file
/// EJS has a feature called includes that does this
// NB an include is basically another EJS file that contains a part of a page which you then potentially can use on multiple pages
// NB and you can use includes to split your big HTML files into smaller & more manageable pieces
/// create a folder "inlcudes" inside the "views" folder (NB the name does not have to be includes but it is a common choice)
// in this folder you can create a header.ejs file with the content of the header
// in order to include a piece of html (ejs) into another ejs you use:
/// <%- %>
/// the injected content will be treated and rendered as HTML content (not raw text like with <%= %>)
//# <%- include("includes/header", {}) %>
// the second parameter is optional and it is an object with extra data that the included file needs in order to be rendered

//==============================================================================
//# Listen to a specific port
//==============================================================================
app.listen(3000);
