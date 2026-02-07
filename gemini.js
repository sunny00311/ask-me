const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const DB = require("./db");

//const db = DB();
const { getInvestorById, getStartupById } = require("./controller/getdata");
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const geminiJSON = async (content) => {
  console.log("checkgemini");
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: content,
  });
  const text = response.text;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
};

async function aimatchmakerforstartup(startupData) {
  const db = await DB();
  const investors = await db.collection("startups").find({}).toArray();

  const template = `
you are a business and startup matchmaker.
analyze the given startup and match it with suitable investors.
consider market trends, domain, funding stage, and compatibility.
response as arry object that has matched userid and simple explaination why matches for each  .

startup=${JSON.stringify(startupData)}
investors=${JSON.stringify(investors)}
`;

  return await geminiJSON(template);
}

async function aimatchmakerforinvestor(investorData) {
  console.log("check1");
  const db = await DB();

  //console.log("investorData :>> ", investorData);
  const startups = await db.collection("startups").find({}).toArray();
  // console.log("startups :>> ", startups);
  const template = `
you are a business and startup matchmaker.
analyze the given investor and match with suitable startups.
consider market trends, domain interest, funding capacity, and stage.response as arry object that has matched userid and simple explaination why matches for each


investor=${JSON.stringify(investorData)}
startups=${JSON.stringify(startups)}
`;
  //console.log("template :>> ", template);
  return await geminiJSON(template);
}

module.exports = {
  geminiJSON,
  aimatchmakerforstartup,
  aimatchmakerforinvestor,
};
