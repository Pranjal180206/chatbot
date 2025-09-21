import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  // State for managing messages and input
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format message content with proper line breaks
  const formatMessage = (content) => {
    if (!content) return '';
    
    // Add line breaks for bullet points
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle bullet points with asterisks
    formattedContent = formattedContent.replace(/\* (.*?)(?=\n|$)/g, '<br/>• $1');
    
    // Handle numbered lists
    formattedContent = formattedContent.replace(/(\d+)\. (.*?)(?=\n|$)/g, '<br/>$1. $2');
    
    // Handle line breaks
    formattedContent = formattedContent.replace(/\n/g, '<br/>');
    
    return formattedContent;
  };

  // Handle sending messages to backend
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message to chat immediately
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';

      // Add initial bot message placeholder
      setMessages(prev => [...prev, { type: 'bot', content: '' }]);

      // Read stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.response) {
                botMessage += data.response;
                // Update the last message (bot message) with accumulated content
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { 
                    type: 'bot', 
                    content: botMessage 
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip malformed JSON chunks
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Messages Area */}
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            Welcome! Start a conversation with the chatbot.
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div 
              className="message-content"
              dangerouslySetInnerHTML={{ 
                __html: message.type === 'bot' ? formatMessage(message.content) : message.content 
              }}
            />
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="input"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;