const http = require('http');
const app = require('./app');

//Settings
app.set("port", process.env.PORT || 4000);
const server = http.createServer(app);

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});