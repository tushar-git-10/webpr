const express = require("express");
const app = express();

app.use(express.json());

const spamWords = ["win", "free", "offer", "money", "prize"];

// Common logic
const checkSpam = (text = "") =>
  spamWords.some(word => text.toLowerCase().includes(word));

// POST API
app.post("/predict", (req, res) => {
  const text = req.body.text || "";
  res.json({
    input: text,
    result: checkSpam(text) ? "Spam 🚫" : "Not Spam ✅"
  });
});

// GET (for browser testing)
app.get("/predict", (req, res) => {
  const text = req.query.text || "";
  res.json({
    input: text,
    result: checkSpam(text) ? "Spam 🚫" : "Not Spam ✅"
  });
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));