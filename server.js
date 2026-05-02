const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "CaptionSign IBM Core Active" });
});

app.post("/transcribe", async (req, res) => {
  const { text } = req.body;

  res.json({
    received: text,
    provider: "IBM Cloud",
    status: "processing-ready"
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`CaptionSign API running on port ${PORT}`);
});
