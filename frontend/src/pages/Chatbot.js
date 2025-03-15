import React, { useState } from "react";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to InvestEase, your personalized investment coach. Let's begin your journey!",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    setTimeout(() => {
      let botReply =
        "Thank you! I will now analyze your input and provide personalized recommendations.";

      if (userInput.toLowerCase().includes("investment")) {
        botReply =
          "Great! Are you looking for short-term or long-term investment strategies?";
      } else if (userInput.toLowerCase().includes("risk")) {
        botReply =
          "On a scale of 1 to 10, how comfortable are you with taking risks?";
      } else if (userInput.toLowerCase().includes("portfolio")) {
        botReply =
          "I can help you create a balanced investment portfolio. What is your preferred asset mix?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 1000);
  };

  return (
    <div style={styles.chatbox}>
      <div style={styles.chatboxHeader}>
        InvestEase - Personalized Investment Guidance
        <button style={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }
          >
            <p style={styles.messageText}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbox: {
    width: "360px",
    height: "500px",
    position: "fixed",
    bottom: "80px",
    right: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    border: "2px solid #3f51b5",
  },
  chatboxHeader: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "15px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: "10px",
    top: "5px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  messages: {
    flexGrow: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#e8f0fe",
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#bbdefb",
    padding: "10px",
    borderRadius: "20px",
    maxWidth: "70%",
    margin: "5px 0",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#c5cae9",
    padding: "10px",
    borderRadius: "20px",
    maxWidth: "70%",
    margin: "5px 0",
  },
  messageText: {
    margin: 0,
    fontSize: "14px",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#ffffff",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
  },
  sendButton: {
    padding: "10px 15px",
    backgroundColor: "#3f51b5",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "10px",
    fontSize: "14px",
  },
};

export default Chatbot;
