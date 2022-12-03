const fs = require("fs/promises");

/*
Assume that we have a function that performs only one long taking async operation, or maybe multiple operations that depend on each other
(but not multiple operations that should be started at the same point in time)
if this is the case, i.e. if we only have one operation or if we have dependent operations
you can turn a function into an async function by writing async keyword in front of it
so this function will automatically return a promise without explicitly returning one
we can add the await keyword in front of any method that returns a promise
when we add await, we can get rid of then() and store the result directly in a variable
under the hood when using async await JA will add then() to the promise for you and it will provide the value which would otherwise be the input paramenter value to the function that is passed into then()
so JS will give you that value as if it was a synchronous operation even if it is not (it is transformed behind the scenes)
*/

async function readFile() {
  let fileData;

  // NB with async await try catch is available again!!
  try {
    fileData = await fs.readFile("data.txt");
    // NB code execution will stop here: only once this is completed it will go on
  } catch (error) {
    console.log(error);
  }

  // this would basically be the then() block
  console.log("File parsing done!");
  console.log(fileData.toString());
  console.log("Hi there!");
}

readFile();
