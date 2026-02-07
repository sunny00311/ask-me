const mongoose = require("mongoose");
require("dotenv").config();

let db = null;
const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("❌ MONGODB_URI is undefined. Check .env file location.");
}
async function DB() {
  if (db) return db;

  const conn = await mongoose.connect(url);
  console.log("✅ MongoDB Connected:", conn.connection.host);

  db = mongoose.connection.db;
  return db;
}

module.exports = DB;
