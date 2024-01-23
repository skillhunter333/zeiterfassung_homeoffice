import React, { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

export default function WorktimeOverview({ onToggleOverview }) {
  const [date, setDate] = useState(new Date());
  const [worktime, setWorktime] = useState([]);

  const handleDateChange = async (newDate) => {
    setDate(newDate);

    //Datum im Format YYYY-MM-DD
    const dateString = newDate.toISOString().split("T")[0];
    try {
      const response = await axios.get(
        `http://localhost:4000/overview?date=${dateString}`
      );
      setWorktime(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Arbeitszeiten:", error);
    }
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      <div>
        {worktime.map((time, index) => (
          <div key={index}>
            {new Date(time.start).toLocaleTimeString()} Uhr -{" "}
            {time.end ? new Date(time.end).toLocaleTimeString() : "Läuft"} Uhr
          </div>
        ))}
      </div>
      <button onClick={onToggleOverview}>Zurück</button>
    </div>
  );
}
