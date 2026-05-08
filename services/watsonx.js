require("dotenv").config();

const axios = require("axios");

const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_PROJECT_ID = process.env.IBM_PROJECT_ID;
const IBM_URL = process.env.IBM_URL;

async function getAccessToken() {
  const response = await axios.post(
    "https://iam.cloud.ibm.com/identity/token",
    new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: IBM_API_KEY,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

async function generateAccessibilityResponse(text) {
  const token = await getAccessToken();

  const response = await axios.post(
    `${IBM_URL}/ml/v1/text/generation?version=2023-05-29`,
    {
      input: `Optimize this text for ASL accessibility clarity: ${text}`,
      model_id: "ibm/granite-3-3-8b-instruct",
      project_id: IBM_PROJECT_ID,
      parameters: {
        decoding_method: "greedy",
        max_new_tokens: 80,
        min_new_tokens: 10,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

module.exports = {
  generateAccessibilityResponse,
};
