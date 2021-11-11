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

//Readers
router.get("/readers", (req, res) => {
  mysqlConnection.query("SELECT * FROM users WHERE rol_id=3", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.delete("/readers/:id", (req, res) => {
  console.log('Body', req.params);
  const id = req.params.id;
  console.log('id del eleminar', id)
  mysqlConnection.query(
    "DELETE FROM users where id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});


//End Readers

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
