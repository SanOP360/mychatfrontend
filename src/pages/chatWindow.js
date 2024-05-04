import React from "react";
import "./chatWindow.css"; // Import CSS file for styling

const ChatWindow = ({ currentUser }) => {
  return (
    <div className="chat-window">
      <div className="header">
        <h2>
          {currentUser ? `${currentUser} is logged in` : "Welcome to the Chat"}
        </h2>
      </div>
      <div className="messages">{/* Chat messages will go here */}</div>
      <div className="input-box">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
