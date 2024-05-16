import React, { useState, useEffect } from "react";
import "./chatWindow.css";

const ChatWindow = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  
  const sendMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("chattoken")}`, 
        },
        body: JSON.stringify({
          message,
        }),
      });
      if (response.ok) {
        console.log("Message sent successfully");
        
        setMessages([...messages, { message, sender: currentUser }]);
        setMessage(""); // Clear the input field
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/message");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
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
