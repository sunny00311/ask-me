const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { investorcoach, startupcoach } = require("./coach");
const { aimatchmakerforstartup, aimatchmakerforinvestor } = require("./gemini");

const app = express();
app.use(express.json());

app.post("/matchmaking-investor", async (req, res) => {
  try {
    const investorData = req.body.investorData;
    //console.log(investorData);
    const result = await aimatchmakerforinvestor(investorData);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "investor matchmaking failed" });
  }
});

app.post("/matchmaking-startup", async (req, res) => {
  try {
    const startupData = req.body.startupData;
    console.log("check1");
    const result = await aimatchmakerforstartup(startupData);
    console.log("check2");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "startup matchmaking failed" });
  }
});

app.post("/startup-coach", async (req, res) => {
  try {
    const startupData = req.body.startupData;
    const result = await startupcoach(startupData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "startup coaching failed" });
  }
});

app.post("/investor-coach", async (req, res) => {
  try {
    const investorData = req.body.investorData;
    const result = await investorcoach(investorData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "investor coaching failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "AI Matchmaking API running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
