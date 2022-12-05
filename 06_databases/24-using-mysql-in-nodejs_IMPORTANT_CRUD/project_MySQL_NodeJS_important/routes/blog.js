const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts"); // NB redirect
});

/*
NB db.query(query) returns an array with 2 items
the first item is the result of the query, the second item contains some metadata
*/

//==============================================================================
//## Retrieve all posts (RETRIEVE OPERATION)
//==============================================================================
// IMPORTANT database: Retrieve data
router.get("/posts", async function (req, res) {
  // NB we also want to retrieve the name of the author (not its id)
  // this info is in the authors table whereas the information about the post is in the posts table
  // therefore you need to join the posts with authors
  // select all columns from posts but only the author name from authors
  const query = `
    SELECT posts.*, authors.name AS author_name FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
  `;
  const [posts] = await db.query(query); // next line only after this one has finished
  res.render("posts-list", { posts: posts });
});

//==============================================================================
//## Add new post (retrieve some data)
//==============================================================================
// IMPORTANT database: Retrieve data
// router that handles the click on a button to get a view
router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

//==============================================================================
//## Add new post (CREATE OPERATION)
//==============================================================================
// IMPORTANT database: Create data
// NB the first parameter "/posts" is the path we just defined as an action on our form in create-post.ejs
router.post("/posts", async function (req, res) {
  const data = [
    req.body.title, // nb this is name="" in the html
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
    // NB the second parameter is an array of arrays
    // the first array will replace the first ?
    // the second array will replace the second ?
    // and so on
    // the mysql package will automatically expand this attay into separate values
    /*
    you could also have had:
    db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?,?,?,?)",
    [data[0],data[1],data[2],data[3]])
    */
  );
  res.redirect("/posts");
});

//==============================================================================
//## Retrieve single post (RETRIEVE OPERATION)
//==============================================================================

// IMPORTANT :id in route, req.params.id for getting it
router.get("/posts/:id", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
  INNER JOIN authors ON posts.quthor_id = authors.id
  WHERE posts.id = ?
  `;
  const [posts] = await db.query(query, [req.params.id]);

  // handle the case in which there are no posts
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  // create a copy of the first post item
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

//==============================================================================
//## Update Posts (UPDATE OPERATION)
//==============================================================================
// route that handles the click on a button (therefore, get route)
// not a route that deals with the submission of data yet
router.get("/posts/:id/edit", async function (req, res) {
  const query = `
    SELECT * FROM posts WHERE id = ?
  `;
  const [posts] = await db.query(query, [req.params.id]);

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts[0] });
});

/*
NB
POST and GET don't trigger the same routes even if their name is the same,
because they are different types of requests
This is because the get request in post-item.ejs ("/posts/<%= post.id %>/edit")
is the same as the post request in update-post.ejs (action="/posts/<%= post.id %>/edit")
*/

/// route that deals with the submission of the updated data
router.post("/posts/:id/edit", async function (req, res) {
  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE id = ?
  `;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect("/posts");
});
//==============================================================================
//## Delete Posts (DELETE OPERATION)
//==============================================================================
router.post("/posts/:id/delete", async function (req, res) {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;
