const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
require("dotenv").config(); // to get the env variables

//Settings
app.use(express.json()); //Body parser
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //Cross origins
app.use(morgan("dev"));

//Routes
app.use('/users', require('./routes/users'));
app.use("/auth", require("./routes/auth"));
app.use("/auth/test", require("./routes/auth"));
app.use("/auth/signin", require("./routes/auth"));


module.exports = app;