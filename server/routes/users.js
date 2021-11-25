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

//get All
router.get("/readers", (req, res) => {
  mysqlConnection.query("SELECT * FROM users WHERE rol_id=3", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//get One
router.get("/reader/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    "SELECT * FROM users where id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//Update
router.put("/reader", async (req, res) => {
  const user = ({
    id,
    username,
    password,
    email,
    firstname,
    lastname,
    address,
    phone,
    rol_id,
  } = req.body);
  mysqlConnection.query(
    "UPDATE users SET password=?, email=?, firstname=?, lastname=?, address=?, phone=? where id=?",
    [password, email, firstname, lastname, address, phone, id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//Delete
router.delete("/readers/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    "DELETE FROM users where id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
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
