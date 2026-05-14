const {
  generateAccessibilityResponse,
} = require("../services/watsonx");

exports.processAccessibilityRequest = async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    const response =
      await generateAccessibilityResponse(
        text,
        mode || "asl"
      );

    return res.json({
      success: true,
      mode: mode || "asl",
      input: text,
      output: response,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Processing failed",
    });
  }
};
