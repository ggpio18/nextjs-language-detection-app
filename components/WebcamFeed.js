"use client";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { aslGestures } from "../utils/aslGestures";
import "@tensorflow/tfjs-backend-webgl";

export default function WebcamFeed() {
  const webcamRef = useRef(null);
  const [gesture, setGesture] = useState("Waiting...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadModel() {
      try {
        console.log("Loading Handpose model...");
        const net = await handpose.load();
        console.log("Model loaded successfully!");

        setInterval(() => detectHand(net), 200);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Failed to load hand recognition model.");
      }
    }
    loadModel();
  }, []);

  const detectHand = async (net) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      try {
        const video = webcamRef.current.video;
        const hand = await net.estimateHands(video);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator(Object.values(aslGestures));
          const estimatedGestures = GE.estimate(hand[0].landmarks, 8.5);

          if (estimatedGestures.gestures.length > 0) {
            const detectedGesture = estimatedGestures.gestures.reduce(
              (prev, current) => (prev.confidence > current.confidence ? prev : current)
            );
            setGesture(detectedGesture.name);
          } else {
            setGesture("Hand detected, but no gesture recognized.");
          }
        } else {
          setGesture("No Hand Detected");
        }
      } catch (err) {
        console.error("Error detecting hand:", err);
        setError("Error processing hand gesture.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Live ASL Recognition</h1>

      <div className="border-4 border-green-500 rounded-lg overflow-hidden">
        <Webcam
          ref={webcamRef}
          className="w-[640px] h-[480px] bg-black"
          style={{ borderRadius: "10px" }}
        />
      </div>

      <h2 className="text-xl mt-4 text-green-400">{gesture}</h2>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
