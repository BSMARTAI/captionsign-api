require("dotenv").config();

const express = require("express");
const cors = require("cors");

const translateRoutes =
require("./routes/translate.routes");

const app = express();



/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());



/*
|--------------------------------------------------------------------------
| ROOT HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.json({

    platform: "CaptionSign API",

    status: "running",

    infrastructure: "active",

    version: "v1",

    accessibility: true,

    ai: "IBM watsonx"

  });

});



/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use("/v1", translateRoutes);



/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

  res.status(404).json({

    success: false,

    error: "Route not found"

  });

});



/*
|--------------------------------------------------------------------------
| GLOBAL ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    success: false,

    error: "Internal server error"

  });

});



/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `CaptionSign API running on port ${PORT}`
  );

});
