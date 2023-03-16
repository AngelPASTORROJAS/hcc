/* The above code is importing the express and sqlite3 modules. */
const express = require("express");
/* Creating an instance of the express module. */
const app = express();

/* Importing the databaseBuilder module. */
const DatabaseBuilder = require("./databaseBuilder");
/* Creating a new database called database.db. */
const db = new DatabaseBuilder("autre.db");


/* Inserting a new row into the users table. The first argument is the SQL statement, and the second
argument is an array of values to be inserted into the statement. */
// db.run("INSERT INTO users (name) VALUES (?)", ["John Doe"]);

app.get("/Adherent", (_req, res) => {
  db.all("SELECT * FROM Adherent", (_err, rows) => {
    res.json(rows);
  });
});

app.get("/Validation", (_req, res) => {
  db.all("SELECT * FROM Validation", (_err, rows) => {
    res.json(rows);
  });
});

app.get("/Match", (_req, res) => {
  db.all("SELECT * FROM Match", (_err, rows) => {
    res.json(rows);
  });
});

app.get("/Inscription", (_req, res) => {
  db.all("SELECT * FROM Inscription", (_err, rows) => {
    res.json(rows);
  });
});

/* Telling the server to listen on port 3000. */
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
