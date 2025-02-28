"use client";
import { useState } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { aslGestures } from "../utils/aslGestures";
import "@tensorflow/tfjs-backend-webgl";

export default function ImageUpload() {
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
    recognizeSigns(files);
  };

  const recognizeSigns = async (files) => {
    try {
      const net = await handpose.load();
      let recognizedGestures = [];

      for (const file of files) {
        const image = await loadImage(file);
        const hand = await net.estimateHands(image);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator(Object.values(aslGestures));
          const estimatedGestures = GE.estimate(hand[0].landmarks, 8.5);
          if (estimatedGestures.gestures.length > 0) {
            const detectedGesture = estimatedGestures.gestures.reduce(
              (prev, current) => (prev.confidence > current.confidence ? prev : current)
            );
            recognizedGestures.push({ file, gesture: detectedGesture.name });
          } else {
            recognizedGestures.push({ file, gesture: "No sign detected" });
          }
        } else {
          recognizedGestures.push({ file, gesture: "No hand detected" });
        }
      }
      setResults(recognizedGestures);
    } catch (err) {
      console.error("Error processing images:", err);
    }
  };

  const loadImage = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
    });

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload ASL Sign Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 p-2 bg-gray-700 rounded"
      />

      <div className="mt-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-center mt-2">
            <img src={URL.createObjectURL(result.file)} alt="Sign" className="w-16 h-16 mr-4" />
            <p className="text-green-400">{result.gesture}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
