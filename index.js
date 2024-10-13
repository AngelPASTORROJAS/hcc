const {app, environemment} = require('./app/app');

const DatabaseBuilder = require("./databaseBuilder");
console.log(process.env.ROUTE_MY_DATABASE);
new DatabaseBuilder(process.env.ROUTE_MY_DATABASE);
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré en http://localhost:3000,
  http://localhost:3000/Adherent`);
});