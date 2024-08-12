import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Example response (replace this with actual logic)
    const response = { text: 'I can help you with information on our e-learning courses!', sender: 'hi' };
    setMessages([...newMessages, response]);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatbot}>
        🎓 {/* E-learning icon */}
      </div>
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>Course Assistant</h4>
            <button onClick={toggleChatbot} className="chatbot-close-btn">X</button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-intro">
              <p>Hi there! I'm here to help you with information about our e-learning courses. Ask me anything!</p>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={`chatbot-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a course..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
