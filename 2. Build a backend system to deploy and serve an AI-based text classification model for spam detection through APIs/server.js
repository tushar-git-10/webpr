const express = require("express");
const app = express();

// list of spam words
const spamWords = ["win", "free", "offer", "money", "prize"];

// API
app.get("/predict", (req, res) => {

  // get text from URL (default = "win")
  let text = req.query.text;

  text = text.toLowerCase();

  // check spam manually
  let spam = false;

  for (let i = 0; i < spamWords.length; i++) {
    if (text.includes(spamWords[i])) {
      spam = true;
    }
  }

  let result;
  if (spam) {
    result = "Spam 🚫";
  } else {
    result = "Not Spam ✅";
  }

  // send response
  res.json({
    input: text,
    result: result
  });

});

// start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});




