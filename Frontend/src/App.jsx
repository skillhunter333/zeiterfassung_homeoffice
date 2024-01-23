import React, { useState } from "react";
import Login from "./Login";
import TimeTracker from "./TimeTracker";
import WorktimeOverview from "./WorktimeOverview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : showOverview ? (
        <WorktimeOverview onToggleOverview={handleToggleOverview} />
      ) : (
        <>
          <TimeTracker onToggleOverview={handleToggleOverview} />
          <button onClick={handleToggleOverview}>Übersicht</button>
        </>
      )}
    </div>
  );
}

export default App;
