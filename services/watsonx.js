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
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${IBM_URL}/ml/v1/text/chat?version=2024-05-31`,
      {
        model_id: "ibm/granite-3-8b-instruct",

        project_id: IBM_PROJECT_ID,

        messages: [
          {
            role: "user",
            content: `Optimize this text for ASL accessibility clarity: ${text}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "IBM Chat Error:",
      error.response?.data || error.message
    );

    throw error;
  }
}

module.exports = {
  generateAccessibilityResponse,
};
