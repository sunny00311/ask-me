const { geminiJSON } = require("./gemini");

async function investorcoach(investorData) {
  const template = `
you are an elite investor coach.
analyze investor profile, strategy, and portfolio goals.
give clear, actionable, market-aligned guidance.
respond strictly in JSON.

investor=${JSON.stringify(investorData)}
`;

  return await geminiJSON(template);
}

async function startupcoach(startupData) {
  const template = `
you are an elite startup coach.
analyze startup idea, market fit, traction, and risks.
give actionable advice for growth, funding, and execution.
respond strictly in JSON.

startup=${JSON.stringify(startupData)}
`;

  return await geminiJSON(template);
}

module.exports = {
  investorcoach,
  startupcoach,
};
