const express = require("express");
const mysqlConnection = require("../connection/database");
const router = express.Router();
const mysql = require("../connection/database");

router.get("/", (req, res) => {
  //mysqlConnection.query("SELECT * FROM books", (err, rows, fields) => {
    mysqlConnection.query("SELECT b.*, a.name as author_name, c.name as category_name FROM books as b INNER JOIN authors as a ON b.author_id = a.id INNER JOIN categories as c ON b.category_id = c.id", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Books
//get One
router.get("/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    "SELECT * FROM books where id=?",
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

router.post("/", async (req, res) => {
  const book = ({
    id,
    title,
    description,
    isbn,
    cover,
    year,
    category_id,
    author_id,
  } = req.body);
  mysqlConnection.query(
    "SELECT * FROM books WHERE isbn=?",
    [isbn],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.json({msg: "User already exists"});
        } else {
          mysqlConnection.query(
            "INSERT INTO books (title, description, isbn, cover, year, category_id, author_id) VALUES (?,?,?,?,?,?,?)",
            [title, description, isbn, cover, year, category_id, author_id],
            async (err, rows, fields) => {
              if (!err) {
                res.json({ msg: "Book created"});
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

//Update
router.put("/", async (req, res) => {
  const book = ({
    id,
    title,
    isbn,
    cover,
    year,
    category_id,
    author_id,
  } = req.body);
  mysqlConnection.query(
    "UPDATE books SET title=?, description=?, isbn=?, cover=?, year=?, category_id=?, author_id=? where id=?",
    [title, description, isbn, cover, year, category_id, author_id, id],
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
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    "DELETE FROM books where id=?",
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


module.exports = router;
