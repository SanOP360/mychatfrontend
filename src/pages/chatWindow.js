
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatWindow.css";

const ChatWindow = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const saveMessagesToLocal = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const getMessagesFromLocal = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  };

  
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("chattoken");
      if (!token) {
        console.error("No JWT token available");
        return;
      }

      const response = await axios.get("http://localhost:5000/chat/message", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const newMessages = response.data.messages;
        const storedMessages = getMessagesFromLocal();
        const allMessages = [...storedMessages, ...newMessages].slice(-10); 
        setMessages(allMessages);
        saveMessagesToLocal(allMessages); 
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  
  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("chattoken");
      if (!token) {
        console.error("No JWT token available");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/chat/message",
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


   useEffect(() => {
     fetchMessages();
     const interval = setInterval(fetchMessages, 1000);
     return () => clearInterval(interval);
   }, [fetchMessages]);

  
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
