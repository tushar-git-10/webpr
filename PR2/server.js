const express = require("express");
const app = express();

app.use(express.json());

// Simple spam words list
const spamWords = ["win", "free", "offer", "money", "prize"];

// API
app.post("/predict", (req, res) => {
  const text = req.body.text.toLowerCase();

  let isSpam = false;

  // Check if any spam word exists
  for (let word of spamWords) {
    if (text.includes(word)) {
      isSpam = true;
      break;
    }
  }

  res.json({
    input: text,
    result: isSpam ? "Spam 🚫" : "Not Spam ✅"
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});