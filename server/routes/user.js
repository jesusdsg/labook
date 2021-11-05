const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection/database");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/signin", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  mysqlConnection.query(
    "SELECT * FROM users where username=? AND password=?",
    [username, password],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
