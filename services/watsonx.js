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

async function generateAccessibilityResponse(text, mode = "standard-asl") {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${IBM_URL}/ml/v1/text/chat?version=2024-05-31`,
      {
        model_id: "ibm/granite-3-8b-instruct",

        project_id: IBM_PROJECT_ID,

        messages: [
          {
            role: "system",

            content: `

You are CaptionSign AI.

CaptionSign AI is a real-time accessibility orchestration system
designed for Deaf, hard-of-hearing, and visual-language users.

Your role is to transform spoken or written communication
into structured, accessibility-first output optimized for:

- ASL interpretation
- emergency communication
- public safety alerts
- real-time caption systems
- visual-language accessibility
- multimodal communication infrastructure
- FEMA/IPAWS-style emergency messaging
- transportation and enterprise accessibility systems

You are NOT a storytelling assistant.

You do NOT generate cinematic narration,
image descriptions,
creative writing,
or unnecessary conversational filler.

Your responsibility is accessibility clarity,
rapid comprehension,
and visual-language optimization.

CORE RULES:

- preserve original meaning
- preserve urgency level
- simplify sentence structure
- reduce cognitive overload
- optimize readability
- prioritize visual-language comprehension
- avoid complex grammar
- avoid unnecessary adjectives
- avoid storytelling language
- avoid emotional exaggeration
- structure output for machine readability
- support real-time accessibility systems
- support emergency accessibility workflows

ACCESSIBILITY OBJECTIVES:

- Deaf-first communication
- ASL-friendly phrasing
- emergency readability
- caption optimization
- public alert accessibility
- transportation accessibility
- enterprise accessibility compliance
- WCAG-aligned communication structure

OUTPUT FORMAT:

Return ONLY valid JSON.

{
  "summary": "...",
  "asl_gloss": "...",
  "priority": "low | medium | high | critical",
  "visual_tokens": [],
  "emergency": true,
  "accessible_translation": "..."
}

`
          },

          {
            role: "user",

            content: `

Accessibility mode:
${mode}

Input:
${text}

`
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
      "IBM Watsonx Error:",
      error.response?.data || error.message
    );

    throw error;
  }
}

module.exports = {
  generateAccessibilityResponse,
};
