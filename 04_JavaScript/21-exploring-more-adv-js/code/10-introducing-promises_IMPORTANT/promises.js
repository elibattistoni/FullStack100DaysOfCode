const fs = require("fs/promises");
// NB this gives us the promises version of the file system methods

function readFile() {
  let fileData;

  // the following line now returns a Promise (because we imported the promise version) on which you can then call the .then() method
  fs.readFile("data.txt").then(function (fileData) {
    // NB this function is executed when the reading of the file is done
    console.log("File parsing done!");
    console.log(fileData.toString());
  });

  console.log("Hi there!"); // this is executed just after the fs.readFile starts (and continues in the background)
}

// NB the advantage of using promises is that this allows us to write code in a more structured way
// NB if you e.g. want to have another asynchronous operation that you wanbt to trigger
// NBfrom inside the first callback function, you can return another async operation
// NB and add another then block with another anonymoyus function that will execute once hte async operation is finished

/*
function readFile() {
  let fileData;

  fs.readFile("data.txt").then(function (fileData) {
    console.log(fileData.toString());
    return anotherAsyncOperation
  }).then(function(){ callback to be executed once anotherAsyncOperation is finished})

  console.log("Hi there!");
}
*/

readFile();
