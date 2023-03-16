/* The above code is importing the express and sqlite3 modules. */
const express = require("express");
const sqlite3 = require("sqlite3");

/* Creating an instance of the express module. */
const app = express();

/* Creating a new database called mydatabase.db. */
const db = new sqlite3.Database("mydatabase.db");

this.db.serialize(()=>{ //execute de manière séquentiel les db.run:
    //...
    
})
/* Creating a table called users with two columns, id and name. */
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
/* Inserting a new row into the users table. The first argument is the SQL statement, and the second
argument is an array of values to be inserted into the statement. */
db.run("INSERT INTO users (name) VALUES (?)", ["John Doe"]);

app.get("/users", (_req, res) => {
  /* Selecting all the rows from the users table and returning them as JSON. */
  db.all("SELECT * FROM users", (_err, rows) => {
    res.json(rows);
  });
});

/* Telling the server to listen on port 3000. */
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
