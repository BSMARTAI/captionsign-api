require("dotenv").config();

const {
  runWatsonxInference,
} = require("../adapters/watsonx.adapter");

async function generateAccessibilityResponse(text) {

  try {

    const response =
      await runWatsonxInference([
        {
          role: "user",

          content:
            `Optimize this text for accessibility clarity: ${text}`,
        },
      ]);

    return response;

  } catch (error) {

    console.error(
      "Accessibility generation error:",
      error.message
    );

    throw error;
  }
}

module.exports = {
  generateAccessibilityResponse,
};
