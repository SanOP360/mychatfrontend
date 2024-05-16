
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatWindow.css";

const ChatWindow = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

const sendMessage = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/chat/message",
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("chattoken")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Message sent successfully");
      setMessages([...messages, { message, sender: currentUser }]);
       setTimeout(() => {
         setMessage(""); // Clear the input field after a short delay
       }, 100);// Clear the input field
    } else {
      console.error("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chat/message", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chattoken")}`, 
        },
      });
      if (response.status === 200) {
        setMessages(response.data.messages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-window">
      <div className="header">
        <h2>
          {currentUser ? `${currentUser} is logged in` : "Welcome to the Chat"}
        </h2>
      </div>
      <div className="messages">
        {/* Display received messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
