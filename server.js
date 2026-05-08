require("dotenv").config();

const express = require("express");
const { generateAccessibilityResponse } = require("./services/watsonx");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "CaptionSign API Running"
  });
});

app.post("/process", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text input required"
    });
  }

  try {
    const aiResult = await generateAccessibilityResponse(text);

    res.json({
      status: "success",
      originalText: text,
      aiResponse: aiResult
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`CaptionSign API running on port ${PORT}`);
});
