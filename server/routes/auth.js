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

router.post("/test", verifyToken, (req, res) => {
  res.json("test");
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  console.log('Body', req.body);
  mysqlConnection.query(
    "SELECT * FROM users where username=? OR email=?",
    [username, username],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          if (rows[0].password === password) {
            const token = jwt.sign({ id: rows[0].id, username: rows[0].username, rol_id: rows[0].rol_id }, process.env.JWT_KEY, {
              expiresIn: "1h",
            });
            res.json({
              token: token,
              user: rows[0],
            });
          } else {
            res.status(401).json("Wrong password");
          }
        } else {
          res.json("Wrong Username / Password combination!");
        }
      } else {
        console.log("Ups", err);
      }
    }
  );
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json("Unauthorized");
  const token = req.headers.authorization.substr(7);
  console.log(token);
  if (!!token) {
    const content = jwt.verify(token, process.env.JWT_KEY);
    req.data = content;
    next();
  } else {
    res.status(401).json("Empty token");
  }
}

module.exports = router;
