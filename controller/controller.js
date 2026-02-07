const { connectDB, getDB } = require("../db");
await connectDB();

const db = getDB();

const startups = await db.collection("startups").find({}).toArray();
const investors = await db.collection("investors").find({}).toArray();

console.log(startups.length, investors.length);
