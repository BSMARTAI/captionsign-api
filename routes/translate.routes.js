const express = require("express");

const router = express.Router();

const {
  generateAccessibilityResponse,
} = require("../services/watsonx");

router.post("/translate", async (req, res) => {

  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text input is required",
      });
    }

    const response =
      await generateAccessibilityResponse(text);

    res.json({
      success: true,
      input: text,
      output: response,
    });

  } catch (error) {

    console.error(
      "Translation route error:",
      error.message
    );

    res.status(500).json({
      success: false,
      error: "Translation request failed",
    });
  }
});

module.exports = router;
