import React, { useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

export default function App() {
  const [img, setImg] = useState();
  const [result, setResult] = useState("Click Predict");

  const predict = async () => {
    const model = await mobilenet.load();
    const res = await model.classify(document.getElementById("img"));
    setResult(res[0].className);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>AI Image Predictor 🤖</h2>

      <input type="file" onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))} />

      {img && <img id="img" src={img} width="200" alt="preview" />}

      <br /><br />

      <button onClick={predict}>Predict</button>

      <p>{result}</p>
    </div>
  );
}