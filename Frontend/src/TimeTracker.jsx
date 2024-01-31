import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

export default function TimeTracker({ onToggleOverview }) {
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCurrentTrackingStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/checkCurrentTracking`
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
      await axios.post(`${import.meta.env.VITE_API_URL}/start`);
      setIsTracking(true);
    } catch (err) {
      console.error("Fehler beim Starten:", err);
    }
  };

  const handleStop = async () => {
    if (isLoading || !isTracking) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/stop`);
      setIsTracking(false);
    } catch (err) {
      console.error("Fehler beim Stoppen:", err);
    }
  };

  return (
    <div className="ansicht-container">
      <div className="ansicht-header">
        <h1>HomeOffice CheckIn - {isTracking ? "Stop" : "Start"}</h1>
      </div>
      <div className="ansicht-content">
        {isLoading ? (
          <p>Lädt...</p>
        ) : (
          <>
            <div className="button-group">
              <button id="start" onClick={handleStart} disabled={isTracking}>
                <IoPlayCircleOutline />
              </button>
              <button id="stop" onClick={handleStop} disabled={!isTracking}>
                <IoStopCircleOutline />
              </button>
            </div>
            <button className="overview-button" onClick={onToggleOverview}>
              Übersicht
            </button>
          </>
        )}
      </div>
    </div>
  );
}
