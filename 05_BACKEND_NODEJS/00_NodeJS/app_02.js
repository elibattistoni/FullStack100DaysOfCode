//==============================================================================
// # SENDING BACK TWO OR MORE RESPONSES
//==============================================================================

const http = require("http");

function handleRequest(request, response) {
  // welcome page:
  // localhost:3000 (also with /, does not matter, i.e. localhost:3000/ )
  // localhost:3000/currenttime
  // If I enter this url in the browser, I want to display the current time on the page
  // NB the path should be lowercase with no special characters other than dashes; it should also describe the content of the page that can be expected

  // request.url; // property that holds the final part of the path
  // so we create an if else statement and in each block we define the code that should be executed for a specific request
  console.log(request.url);
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end(`<h1>${new Date().toISOString()}</h1>`);
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Hello world!</h1>");
  }
  // console.log(response);
  /*
  NB if the user enters another path that is not defined here,
  the page will keep on loading and ultimately it will crash because this function executes but never produces a valida response
  eventually the request will timeout because it never gets a response (NB you might want to handle those scenarios as well)
  */
}

const server = http.createServer(handleRequest);

server.listen(3000);
