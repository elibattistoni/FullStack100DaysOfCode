// document.body.children[1].children[0].href = 'https://google.com';

// console.dir(document);
// alert();
// window.alert();

let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

anchorElement = document.querySelector("p a"); // p a { color: red; }
anchorElement.href = "https://academind.com";

//==============================================================================
//# EXERCISE
//==============================================================================

// Exercise Time!

// 1. Select the <h1> element by "drilling into the DOM" and
//    save it in a variable with a name of your choice
const title = document.querySelector("h1");
console.log(title);

// 2. Use the variable from (1) and get access to the "parent"
//    element of the stored <h1> element (i.e. to the <body> element)
//    BONUS: Try using the variable from (1) to get access to the
//    sibling element (i.e. the <p> element next to the <h1> element)
const parent = title.parentElement;
console.log(parent);
const sibling = title.nextElementSibling;
console.log(sibling);

// 3. Select the <h1> element with getElementById and store in
//    the same or a new variable (up to you)
const titleId = document.getElementById("title");
console.log(titleId);

// 4. Select the second <p> element with querySelector (you might
//    need to add something in the HTML code, e.g. a class)
//    and store it in a new variable with a name of your choice
const paragraph = document.querySelectorAll("p")[1];
console.log(paragraph);

// 5. BONUS TASK: Try changing the text content of the <p> element
//    you selected in (4) and set it to any other text of your choice
paragraph.textContent = "Nuovo textContent";
