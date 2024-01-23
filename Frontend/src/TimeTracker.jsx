import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleStartStop = async () => {
    if (isLoading) return;

    try {
      if (isTracking) {
        await axios.post("http://localhost:4000/stop");
      } else {
        await axios.post("http://localhost:4000/start");
      }
      setIsTracking(!isTracking);
    } catch (err) {
      console.error("Fehler bei der Zeitverfolgung:", err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Lädt...</p>
      ) : (
        <button onClick={handleStartStop}>
          {isTracking ? "Stop" : "Start"}
        </button>
      )}
    </div>
  );
}
