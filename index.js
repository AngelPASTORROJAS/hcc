/* The above code is importing the express and sqlite3 modules. */
const express = require("express");
const sqlite3 = require("sqlite3");

/* Creating an instance of the express module. */
const app = express();

/* Creating a new database called mydatabase.db. */
const db = new sqlite3.Database("mydatabase.db");

/* Creating a table called users with two columns, id and name. */
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
/* Inserting a new row into the users table. The first argument is the SQL statement, and the second
argument is an array of values to be inserted into the statement. */
db.run("INSERT INTO users (name) VALUES (?)", ["John Doe"]);

/* This is a route handler. It is a function that is executed when a request is made to the /users
route. The first argument is the route, and the second argument is the function that is executed
when the route is requested. The function takes two arguments, req and res. The req argument is the
request object, and the res argument is the response object. The response object has a method called
json, which is used to send a JSON response. The db.all method is used to execute a SQL statement
and return all rows from the result. The first argument is the SQL statement, and the second
argument is a callback function that is executed when the statement is completed. The callback
function takes two arguments, err and rows. The err argument is an error object, and the rows
argument is an array of rows returned from the statement. The res.json method is used to send a JSON
response containing the rows. */
app.get("/users", (_req, res) => {
  db.all("SELECT * FROM users", (_err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
