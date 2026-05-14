require("dotenv").config();

const axios = require("axios");



const IBM_API_KEY =
process.env.IBM_API_KEY;

const IBM_PROJECT_ID =
process.env.IBM_PROJECT_ID;

const IBM_URL =
process.env.IBM_URL;



/*
|--------------------------------------------------------------------------
| GET IBM ACCESS TOKEN
|--------------------------------------------------------------------------
*/

async function getAccessToken() {

  const response = await axios.post(

    "https://iam.cloud.ibm.com/identity/token",

    new URLSearchParams({

      grant_type:
      "urn:ibm:params:oauth:grant-type:apikey",

      apikey: IBM_API_KEY

    }),

    {

      headers: {

        "Content-Type":
        "application/x-www-form-urlencoded"

      }

    }

  );



  return response.data.access_token;

}



/*
|--------------------------------------------------------------------------
| GENERATE ACCESSIBILITY RESPONSE
|--------------------------------------------------------------------------
*/

async function generateAccessibilityResponse(
  text,
  mode
) {

  try {

    const token =
    await getAccessToken();



    const prompt = `

You are CaptionSign AI.

You transform spoken or written communication
into Deaf-accessible visual language output.

Your job is to optimize communication for:

- ASL accessibility
- Deaf comprehension
- emergency communication clarity
- visual readability
- real-time caption understanding
- multimodal accessibility systems
- public safety alerts
- transportation announcements
- telecom accessibility
- enterprise accessibility infrastructure

Rules:

- preserve original meaning
- simplify complex language
- prioritize visual clarity
- remove unnecessary filler words
- improve emergency readability
- optimize for ASL comprehension
- structure output for visual delivery
- maintain urgency for safety alerts
- support Deaf-first communication systems

Accessibility mode:
${mode}

Input:
${text}

`;



    const response = await axios.post(

      `${IBM_URL}/ml/v1/text/chat?version=2024-05-31`,

      {

        model_id:
        "ibm/granite-3-8b-instruct",

        project_id:
        IBM_PROJECT_ID,

        messages: [

          {
            role: "user",
            content: prompt
          }

        ]

      },

      {

        headers: {

          Authorization:
          `Bearer ${token}`,

          "Content-Type":
          "application/json",

          Accept:
          "application/json"

        }

      }

    );



    return response.data;



  } catch (error) {

    console.error(

      "IBM Watsonx Error:",

      error.response?.data ||
      error.message

    );



    throw error;

  }

}



module.exports = {
  generateAccessibilityResponse
};
