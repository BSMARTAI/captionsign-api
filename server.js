require("dotenv").config();

const express = require("express");

const translateRoutes =
  require("./routes/translate.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    status: "CaptionSign API Running",
    infrastructure: "active",
  });
});

app.use("/v1", translateRoutes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `CaptionSign API running on port ${PORT}`
  );
});
