import React from 'react';
import Chat from './Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Chatbot</h1>
        <p>Powered by Ollama (gemma3)</p>
      </header>
      <main className="App-main">
        <Chat />
      </main>
    </div>
  );
}

export default App;
