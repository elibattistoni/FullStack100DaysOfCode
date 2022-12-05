const mysql = require("mysql2/promise"); // NB mysql2 supports promises

const pool = mysql.createPool({
  host: "localhost", // url of database server (the database server typically runs on port 3306)
  database: "blog",
  user: "root", // root is the default user that was created automatically when you created your database before
  password: "<your-pw>",
  // NB use the "user" and "password" you choose when you installed MySQL on your system (you were prompted to create such a "root" user there)
});

// NB pool creates a pool of connections and it is more efficient in handling a lot of concurrent requests reaching the server at the same time (more efficient than creating individual connections all the time)

module.exports = pool; // export the pool object on which you will run the queries against the db
// we will use this to send queries to the db
