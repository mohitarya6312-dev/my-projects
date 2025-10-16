import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (name && message) {
      const timestamp = new Date().toLocaleTimeString();
      socket.emit("send_message", { name, message, timestamp });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "40px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Real-Time Chat</h2>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <div
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          background: "#f9f9f9",
          borderRadius: "5px",
          marginBottom: "10px"
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.name}</strong> [{msg.timestamp}]: {msg.message}
          </p>
        ))}
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "8px 15px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
