import React, { useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

export default function App() {
  // 1. Create variables to store the image and the result
  const [img, setimg] = useState();
  const [ans, setans] = useState("Click predict");

  // 2. Function to run the AI logic
  const runai = async () => {
    // Load the pre-trained MobileNet model
    const model = await mobilenet.load();
    
    // Tell the model to look at the image with id "pic"
    const res = await model.classify(document.getElementById("pic"));
    
    // Save the best result (index 0) into our state
    setans(res[0].className);
  };

  return (
    <div>
      {/* 3. Input to select a file and convert it to a URL */}
      <input 
        type="file" 
        onChange={e => setimg(
          
          URL.createObjectURL(e.target.files[0]))
        
        } 
      />
      
      {/* 4. Display the selected image with a specific ID */}
      <img id="pic" src={img} width="200" />
      
      {/* 5. Button to trigger the AI function */}
      <button onClick={runai}>Predict</button>
      
      {/* 6. Show the final prediction result */}
      <p>{ans}</p>
    </div>
  );
}

