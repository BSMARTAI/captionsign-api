const express = require("express");

const router = express.Router();

const {
  processTranslation
} = require("../controllers/translate.controller");



/*
|--------------------------------------------------------------------------
| TRANSLATION ROUTES
|--------------------------------------------------------------------------
*/

router.post(
  "/translate",
  processTranslation
);



module.exports = router;
