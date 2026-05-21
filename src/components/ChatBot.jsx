import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm EventSphere AI. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot thinking
    setTimeout(() => {
      processMessage(input.toLowerCase());
    }, 600);
  };

  const processMessage = (text) => {
    let response = "";

    if (text.includes("kuchipudi")) {
      response = "Kuchipudi is one of the eight major Indian classical dances. It originated in a village named Kuchipudi in the Indian state of Andhra Pradesh. It is known for its graceful movements and strong narrative elements.";
    } else if (text.includes("techfest")) {
      response = "TechFest 2026 is our flagship technical festival featuring coding contests, hackathons, and robotics exhibitions. It's happening on May 10th at the Main Auditorium.";
    } else if (text.includes("concert") || text.includes("rahman")) {
      response = "The AR Rahman Live Concert is a premium entertainment event on May 18th. Expect a night of soulful music and high-energy performances!";
    } else if (text.includes("bharatanatyam")) {
      response = "Bharatanatyam is a major form of Indian classical dance that originated in Tamil Nadu. Our showcase on May 22nd features award-winning artists in a mesmerizing performance.";
    } else if (text.includes("spiritual") || text.includes("retreat")) {
      response = "Our Spiritual Retreat & Meditation Tour takes you to Rishikesh for 2 days of guided meditation, yoga, and nature walks starting June 1st.";
    } else if (text.includes("ai") || text.includes("ml") || text.includes("seminar")) {
      response = "The AI & ML Seminar 2026 on May 28th covers the latest trends in Artificial Intelligence and Machine Learning with expert guest speakers.";
    } else if (text.includes("cultural") || text.includes("night")) {
      response = "The Cultural Night Extravaganza on June 10th is a grand celebration with music, dance, and fashion shows by our talented students!";
    } else if (text.includes("price") || text.includes("cost")) {
      response = "Event prices vary from ₹99 to ₹2499. You can see the specific price on each event card in the main list.";
    } else if (text.includes("booking") || text.includes("book")) {
      response = "To book an event, simply click on an event card to see its details, then click 'Proceed to Book'.";
    } else if (text.includes("hello") || text.includes("hi")) {
      response = "Hi there! Feel free to ask me about any event or how to use EventSphere!";
    } else {
      response = "I'm not sure about that. Try asking about Kuchipudi, TechFest, or how to book an event!";
    }

    setMessages(prev => [...prev, { text: response, isBot: true }]);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>EventSphere Assistant</h3>
            <p>Always here to help</p>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Ask about events..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
