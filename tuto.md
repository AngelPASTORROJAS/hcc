1. Créez un nouveau projet Node.js et initialisez-le avec NPM en utilisant npm init.

2. Installez le module express et sqlite3 en utilisant la commande npm install express sqlite3 #Pour avoir la version exacte -E.

3. Dans votre fichier JavaScript principal, importez les modules express et sqlite3 :

const express = require('express');
const sqlite3 = require('sqlite3');

4. Créez une application Express :

const app = express();

5. Ouvrez une connexion à la base de données SQLite en utilisant la bibliothèque sqlite3 :

const db = new sqlite3.Database('mydatabase.db');

6. Utilisez la méthode db.run() pour exécuter des requêtes SQL sur la base de données. Par exemple, pour créer une table users, vous pouvez utiliser :

db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');

Vous pouvez également utiliser des paramètres pour éviter les injections SQL :

db.run('INSERT INTO users (name) VALUES (?)', ['John Doe']);

7. Pour récupérer des données de la base de données, vous pouvez utiliser la méthode db.all() :

db.all('SELECT * FROM users', (err, rows) => {
  // rows contient les données de la requête SELECT
});

8. Enfin, vous pouvez utiliser les méthodes d'Express pour créer des routes et renvoyer des données à partir de votre base de données SQLite.

Par exemple, pour renvoyer toutes les lignes de la table users en tant que réponse JSON, vous pouvez utiliser :

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    res.json(rows);
  });
});

Assurez-vous d'écouter les requêtes entrantes sur un port en utilisant la méthode app.listen() :

app.listen(3000, () => {
  console.log('Server listening on port 3000');
