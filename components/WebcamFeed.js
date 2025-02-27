"use client";

import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import { drawHand } from "../utils/drawHand";
import { aslGestures } from "../utils/aslGestures";

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState("Waiting...");

  useEffect(() => {
    const runHandpose = async () => {
      await tf.setBackend("webgl");
      const net = await handpose.load();
      console.log("Handpose model loaded.");

      setInterval(() => {
        detect(net);
      }, 100);
    };

    runHandpose();
  }, []);

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const hands = await net.estimateHands(video);

      if (hands.length > 0) {
        const hand = hands[0];
        if (hand.landmarks) {
          try {
            const aslGestureArray = Object.values(aslGestures).filter(Boolean);
            const GE = new fp.GestureEstimator(aslGestureArray);

            if (aslGestureArray.length === 0) {
              console.warn("No gestures available for recognition.");
              return;
            }

            const estimatedGestures = GE.estimate(hand.landmarks, 7.5);
            console.log("Detected Gestures:", estimatedGestures.gestures);

            if (estimatedGestures.gestures.length > 0) {
              const maxConfidenceGesture = estimatedGestures.gestures.reduce(
                (prev, current) =>
                  prev.confidence > current.confidence ? prev : current
              );
              setGesture(maxConfidenceGesture.name);
            } else {
              setGesture("No gesture detected");
            }
          } catch (error) {
            console.error("Error estimating gesture:", error);
          }
        }
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) drawHand(hands, ctx);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Webcam
        ref={webcamRef}
        style={{
          width: 640,
          height: 480,
          borderRadius: "10px",
          border: "3px solid #fff",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 640,
          height: 480,
        }}
      />
      <p className="mt-4 text-2xl font-semibold text-yellow-300">
        ASL Gesture: {gesture ? gesture : "No gesture detected, try again!"}
      </p>
    </div>
  );
};

export default WebcamFeed;
