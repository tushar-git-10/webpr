import React, { useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

function App() {
  const [imgURL, setImgURL] = useState("");
  const [result, setResult] = useState("Click Predict");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgURL(URL.createObjectURL(file));
    }
  };

  const predict = async () => {
    const img = document.getElementById("img");

    const model = await mobilenet.load(); // load when button clicked
    const predictions = await model.classify(img);

    setResult("Result: " + predictions[0].className);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>AI Predictor 🤖</h2>

      <input type="file" onChange={handleImage} />

      <br /><br />

      {imgURL && (
        <img id="img" src={imgURL} alt="preview" width="250" />
      )}

      <br /><br />

      <button onClick={predict}>Predict</button>

      <h3>{result}</h3>
    </div>
  );
}

export default App;