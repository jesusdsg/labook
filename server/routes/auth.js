const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection/database");
const helpers = require("../lib/helpers");

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

router.post("/signout", (req, res) => {
  jwt.destroy(req.data.token);
  res.json({msg: "Logged out"});
});


router.post("/test", verifyToken, (req, res) => {
  res.json("test");
});

//Sign in
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  mysqlConnection.query(
    "SELECT * FROM users where username=? OR email=?",
    [username, username],
    async (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          const match = await helpers.matchPassword(password, rows[0].password);
          if (match) {
            const token = jwt.sign(
              {
                id: rows[0].id,
                username: rows[0].username,
                rol_id: rows[0].rol_id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            res.json({
              token: token,
              user: {
                username: rows[0].username,
                rol: rows[0].rol_id,
                name: rows[0].firstname,
              },
            });
          } else {
            res.status(401).json({ msg: "Your Password is incorrect" });
          }
        } else {
          res.json({ ms: "Wrong Username / Password combination!" });
        }
      } else {
        console.log("Ups", err);
      }
    }
  );
});

//Checking the Token
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

//Sign up
router.post("/signup", async (req, res) => {
  const user = ({
    username,
    password,
    email,
    firstname,
    lastname,
    address,
    phone,
    rol_id
  } = req.body);
  const hash = await helpers.encryptPassword(user.password); //Encryting password
  mysqlConnection.query(
    "SELECT * FROM users where username=? OR email=?",
    [username, email],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.json({msg: "User already exists"});
        } else {
          mysqlConnection.query(
            "INSERT INTO users (username, password, email, firstname, lastname, address, phone, rol_id) VALUES (?,?,?,?,?,?,?,?)",
            [username, hash, email, firstname, lastname, address, phone, rol_id],
            async (err, rows, fields) => {
              if (!err) {
                res.json({ msg: "User created", status: true });
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
