import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './Chatbot.css'; // Import the CSS file for styling


const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', { // Your backend endpoint
        message: userInput
      });

      const botMessage = { sender: 'bot', text: response.data.message };
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      const errorMessage = { sender: 'bot', text: 'Failed to connect. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleInputChange = (e) => setUserInput(e.target.value);
  const handleKeyPress = (e) => { if (e.key === 'Enter') sendMessage(); };
  const clearChat = () => { setMessages([]); localStorage.removeItem('chatbotMessages'); };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="chatbot-message bot">Typing...</div>}
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          autoFocus
        />
        <button onClick={sendMessage}>➤</button>
      </div>
      <button onClick={clearChat} className="clear-chat-button">Clear Chat</button>
    </div>
  );
};

export default Chatbot;
