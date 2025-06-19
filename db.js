// db.js
// const mysql = require("mysql2");

// Create MySQL connection
// const db = mysql.createConnection({
//   host: "b43nyqf9acugy1fihlr5-mysql.services.clever-cloud.com",
//   user: "uod2zv07nakjg9ll",
//   password: "R9Pd5kegXzZL6FomwyLc",
//   database: "suub43nyqf9acugy1fihlr5",
//   port: 3306, // default port
//   ssl: {
//     rejectUnauthorized: false, // <-- important for CleverCloud
//   },
// });
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "b43nyqf9acugy1fihlr5-mysql.services.clever-cloud.com",
  user: "uod2zv07nakjg9ll",
  password: "your_actual_password_here",
  database: "b43nyqf9acugy1fihlr5",
  port: 3306,
  ssl: {
    minVersion: "TLSv1.2", // ← force proper SSL
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected securely to CleverCloud MySQL");
    conn.release();
  }
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("✅ MySQL Connected");
// });

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
