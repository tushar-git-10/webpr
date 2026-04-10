import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';

function App() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
        setModel(loadedModel);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading model:", err);
      }
    };
    loadModel();
  }, []);

  // Setup Webcam
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Webcam error:", err));
    }
  }, []);

  // Real-time Prediction
  useEffect(() => {
    let animationFrameId;
    const predict = async () => {
      if (model && videoRef.current && videoRef.current.readyState === 4) {
        const preds = await model.classify(videoRef.current);
        setPredictions(preds);
      }
      animationFrameId = requestAnimationFrame(predict);
    };

    if (model) {
      predict();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [model]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Vision <span>AI</span></h1>
        <p>Real-time Object Detection with TensorFlow.js</p>
      </header>

      <main className="main-content">
        <div className="scanner-container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Loading Deep Learning Model...</p>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="video-stream"
          />
          {!isLoading && <div className="scan-line"></div>}
        </div>

        <div className="predictions-panel">
          <h2>Live Analysis</h2>
          <div className="predictions-list">
            {predictions.length > 0 ? predictions.map((pred, idx) => (
              <div key={idx} className="prediction-item">
                <div className="pred-header">
                  <span className="pred-name">{pred.className.split(',')[0]}</span>
                  <span className="pred-prob">{(pred.probability * 100).toFixed(1)}%</span>
                </div>
                <div className="prob-bar">
                  <div className="prob-fill" style={{ width: `${pred.probability * 100}%` }}></div>
                </div>
              </div>
            )) : (
              <p className="no-preds">{isLoading ? 'Initializing tensor graph...' : 'Awaiting visual input...'}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
