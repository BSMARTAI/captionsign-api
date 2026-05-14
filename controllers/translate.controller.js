const {
  generateAccessibilityResponse
} = require("../services/watsonx");



async function processTranslation(req, res) {

  const {
    text,
    mode = "asl-accessibility"
  } = req.body;



  if (!text) {

    return res.status(400).json({

      success: false,

      error: "Text is required"

    });

  }



  try {

    const response =
      await generateAccessibilityResponse(
        text,
        mode
      );



    res.json({

      success: true,

      platform: "CaptionSign",

      mode,

      input: text,

      output: response

    });



  } catch (error) {

    console.error(
      error.response?.data ||
      error.message
    );



    res.status(500).json({

      success: false,

      error: error.message

    });

  }

}



module.exports = {
  processTranslation
};
