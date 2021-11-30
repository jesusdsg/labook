const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection/database");

router.get("/categories", (req, res) => {
  mysqlConnection.query("SELECT * FROM categories", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/authors", (req, res) => {
    mysqlConnection.query("SELECT * FROM authors", (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
