// db.js
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "suu",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

function insertEntry(name, email, message, callback) {
  const query = "INSERT INTO entry (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], callback);
}

function getdata(callback) {
  const query = "select * from entry";
  db.query(query, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
}

module.exports = { insertEntry, getdata };
