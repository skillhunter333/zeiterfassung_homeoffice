import React, { useState } from "react";
import Login from "./Login";
import TimeTracker from "./TimeTracker";
import WorktimeOverview from "./WorktimeOverview";
import Wrapper from "./Wrapper";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  return (
    <Wrapper>
      <div className="App">
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : showOverview ? (
          <WorktimeOverview onToggleOverview={handleToggleOverview} />
        ) : (
          <TimeTracker onToggleOverview={handleToggleOverview} />
        )}
      </div>
    </Wrapper>
  );
}

export default App;
