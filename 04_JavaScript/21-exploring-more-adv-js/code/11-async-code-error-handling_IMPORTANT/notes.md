IMPORTANT try will NOT catch errors caused by asynchronous operations when working with callback functions

### .catch()
promises have a method for handling the success case (.then())
and a method for catching to handle any error that might have occurred in a previous promises
the catch method takes in a function which gets as input the error object

**promises have the .catch() method**
```
function readFile() {
  let fileData;

  fs.readFile("data.txt")
  .then(function (fileData) {
    console.log(fileData.toString());
    return anotherAsyncOperation
  })
  .then(function(){ callback to be executed once anotherAsyncOperation is finished})
  .catch(function(error){console.error("throw error")})

  console.log("Hi there!");
}
```