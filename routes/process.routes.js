const express = require("express");
const router = express.Router();

const {
  processAccessibilityRequest,
} = require("../controllers/process.controller");

router.post("/", processAccessibilityRequest);

module.exports = router;
