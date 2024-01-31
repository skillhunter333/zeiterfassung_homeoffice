import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });
      onLogin();
    } catch (err) {
      setError("Login fehlgeschlagen");
    }
  };

  return (
    <div className="ansicht-container">
      <div className="ansicht-header">
        <h1>HomeOffice CheckIn - Login</h1>
      </div>
      <div className="ansicht-content">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
