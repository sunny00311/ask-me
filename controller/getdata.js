const DB = require("../db");

const { ObjectId } = require("mongodb");

async function getInvestorById(id) {
  const db = await DB();

  const investor = await db
    .collection("investors")
    .findOne({ _id: new ObjectId(id) });

  return investor;
}
// getInvestorById("697ba144b93973c0dac8fa2d")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(console.error);
async function getStartupById(id) {
  const db = await DB();

  const startup = await db
    .collection("startups")
    .findOne({ _id: new ObjectId(id) });

  return startup;
}

module.exports = { getInvestorById, getStartupById };
