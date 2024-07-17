import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:3001");

const App: React.FC = () => {
  const [command, setCommand] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      setIsConnected(true);
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data.toString());
      if (data.error) {
        setError(data.error);
        setContent("");
      } else {
        setError("");
        setContent(data.content);
      }
    };

    client.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setError("WebSocket error");
      setIsConnected(false);
    };

    client.onclose = () => {
      console.log("WebSocket Client Disconnected");
      setIsConnected(false);
    };

    return () => {
      client.close();
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (command.trim() && isConnected) {
      client.send(JSON.stringify({ command }));
      setCommand("");
    } else if (!isConnected) {
      setError("WebSocket is not connected.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  return (
    <div className="App">
      <div className="console">
        <p className="error">{error}</p>
        <pre className="content">{content}</pre>
        <hr />
        <form
          name="commandForm"
          className="commandForm"
          onSubmit={handleSubmit}
          id="commandForm"
        >
          <input
            type="text"
            value={command}
            onChange={handleChange}
            placeholder="Enter ls command"
            required
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default App;
