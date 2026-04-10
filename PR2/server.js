const express = require("express");
const app = express();

const spamWords = ["win","free","offer","money","prize"];

app.get("/predict", (req, res) => {
  const text = (req.query.text || "win").toLowerCase();
  const spam = spamWords.some(w => text.includes(w));
  res.json({ input: text, result: spam ? "Spam 🚫" : "Not Spam ✅" });
});

app.listen(3000, () => console.log("http://localhost:3000"));