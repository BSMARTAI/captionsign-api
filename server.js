app.post("/process", async (req, res) => {
  const { text, mode } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input required" });
  }

  try {
    let output;

    if (mode === "fingerspell") {
      output = {
        letters: text.split("").map(c => c.toUpperCase())
      };
    } else {
      output = {
        caption: text
      };
    }

    res.json({
      status: "success",
      mode: mode || "caption",
      modelVersion: "watsonx-v1",
      timestamp: new Date().toISOString(),
      output
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});
