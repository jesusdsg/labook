const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection/database");

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM books", (err, rows, fields) => {
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
    isbn,
    cover,
    year,
    category_id,
    author_id,
  } = req.body);
  mysql.query(
    "SELECT * FROM books where isbn=?",
    [isbn],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.json({msg: "Book already exists"});
        } else {
          mysql.query(
            "INSERT INTO books (title, isbn, cover, year, category_id, author_id) VALUES (?,?,?,?,?,?)",
            [title, isbn, cover, year, category_id, author_id],
            async (err, rows, fields) => {
              if (!err) {
                res.json({ msg: "Book created", status: true });
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
    "UPDATE books SET title=?, isbn=?, cover=?, year=?, category_id=?, author_id=? where id=?",
    [title, isbn, cover, year, category_id, author_id, id],
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
