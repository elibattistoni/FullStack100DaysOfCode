const fs = require("fs");

function readFile() {
  let fileData;
  //NB before it was fs.ReadFileSync() Sync meaning synchronously i.e. the reading operation must be completed before the following code can be started and executed
  // the opposit is asynchronous, i.e. an asyncrhonous operation can be executed simultaneously with other operations (it does not block the execution of following code)
  // the process of reading a file can take a while depending on its size
  fs.readFile("data.txt", function (error, fileData) {
    console.log("File parsing done!");
    console.log(fileData.toString());
  });

  console.log("Hi there!");
  console.log("log fileData 1", fileData);
}

readFile();
