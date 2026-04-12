const express = require("express");
const app = express();

const spamWords = ["win", "free", "offer", "money", "prize"];

app.get("/predict", (req, res) => {

  const text = (req.query.text || "").toLowerCase();

  let spam = false;

  for (let word of spamWords) {
    if (text.includes(word)) {
      spam = true;
      break;
    }
  }

  if (spam) {
    res.json({ result: "Spam 🚫" });
  } else {
    res.json({ result: "Not Spam ✅" });
  }

});

app.listen(3000, () => console.log("Server running 🚀"));
