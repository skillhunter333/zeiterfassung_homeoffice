import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

export default function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCurrentTrackingStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/checkCurrentTracking"
        );
        setIsTracking(response.data.isTracking);
        setIsLoading(false);
      } catch (err) {
        console.error("Fehler beim Abrufen des Tracking-Status:", err);
        setIsLoading(false);
      }
    };

    checkCurrentTrackingStatus();
  }, []);

  const handleStart = async () => {
    if (isLoading || isTracking) return;

    try {
      await axios.post("http://localhost:4000/start");
      setIsTracking(true);
    } catch (err) {
      console.error("Fehler beim Starten:", err);
    }
  };

  const handleStop = async () => {
    if (isLoading || !isTracking) return;

    try {
      await axios.post("http://localhost:4000/stop");
      setIsTracking(false);
    } catch (err) {
      console.error("Fehler beim Stoppen:", err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Lädt...</p>
      ) : (
        <>
          <button id="start" onClick={handleStart} disabled={isTracking}>
            <IoPlayCircleOutline />
          </button>
          <button id="stop" onClick={handleStop} disabled={!isTracking}>
            <IoStopCircleOutline />
          </button>
        </>
      )}
    </div>
  );
}
