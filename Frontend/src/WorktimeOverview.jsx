import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { ImArrowLeft } from "react-icons/im";

export default function WorktimeOverview({ onToggleOverview }) {
  const [date, setDate] = useState(new Date());
  const [worktime, setWorktime] = useState([]);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/username`
        );
        setDisplayName(response.data.displayName);
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzernamens:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleDateChange = async (newDate) => {
    setDate(newDate);

    //Datum im Format YYYY-MM-DD
    const dateString =
      newDate.getFullYear() +
      "-" +
      ("0" + (newDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + newDate.getDate()).slice(-2);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/overview?date=${dateString}`
      );
      setWorktime(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Arbeitszeiten:", error);
    }
  };

  return (
    <div className="ansicht-container">
      <div className="ansicht-header">
        <h1>HomeOffice CheckIn - Übersicht für {displayName}</h1>
      </div>
      <div className="ansicht-content">
        <button onClick={onToggleOverview}>
          <ImArrowLeft /> Start/Stop
        </button>
        <h3>Datum wählen</h3>
        <Calendar onChange={handleDateChange} value={date} />
        <div>
          {worktime.map((time, index) => (
            <div key={index}>
              {new Date(time.start).toLocaleTimeString()} Uhr -{" "}
              {time.end ? new Date(time.end).toLocaleTimeString() : "Läuft"} Uhr
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
