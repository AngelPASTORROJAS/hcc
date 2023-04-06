/* The above code is importing the express and sqlite3 modules. */
const express = require('express');
const morgan = require('morgan');

/* Creating an instance of the express module. */
const app = express();

app.use(express.json());
app.use(morgan('dev'));

/* These lines of code are importing the `dotenv` module and `dotenv-expand` module.
The `dotenv` module loads environment variables from a `.env` file into `process.env`.

The `dotenv-expand` module is used to expand any environment variables found in the loaded `.env` file.
This allows the application to access environment variables defined in the `.env` file,
which can be used to configure the application. */
var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
// require('dotenv-expand').expand(require('dotenv').config()); //en une requête

/* Importing the databaseBuilder module. */
const DatabaseBuilder = require('./databaseBuilder');
/* Creating a new database called database.db. */
const db = new DatabaseBuilder(process.env.ROUTE_MY_DATABASE);

const adherentRoute = require('./app/Adherent/routes/adherent.route');

app.use('/Adherent', adherentRoute.routes);

app.get('/Validation', (_req, res) => {
  db.all('SELECT * FROM Validation', (_err, rows) => {
    res.json(rows);
  });
});

app.get('/Match', (_req, res) => {
  db.all('SELECT * FROM Match', (_err, rows) => {
    res.json(rows);
  });
});

app.get('/Inscription', (_req, res) => {
  db.all('SELECT * FROM Inscription', (_err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log(`Serveur démarré en http://localhost:3000,
  http://localhost:3000/Validation,
  http://localhost:3000/Match,
  http://localhost:3000/Adherent,
  http://localhost:3000/Inscription,
  `);
});
