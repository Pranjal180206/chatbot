# AI Chatbot with Ollama & React

A modern, full-stack chatbot application that leverages a local large language model (LLM) for private, offline conversations. This project features a beautiful, AI-assisted streaming chat interface built with React and a robust API backend with Flask.

![Chatbot Interface](https://img.shields.io/badge/Interface-Modern%20%26%20Responsive-3A8FB7?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20Ollama-2A1B3D?style=for-the-badge)

## Features

- ** Local AI Power:** Utilizes Ollama and the `gemma3` model for 100% private, offline inference. No API keys or internet required after setup.
- ** Real-Time Streaming:** Experience the AI typing responses in real-time using Server-Sent Events (SSE) for a seamless and engaging user experience.
- ** AI-Assisted Frontend Design:** The entire user interface, including its modern color scheme, gradients, and responsive layout, was designed with the assistance of AI tools to ensure a professional and aesthetically pleasing result.
- ** Responsive Design:** A polished, dark-themed UI that looks great on desktop, tablet, and mobile devices.
- ** Modern Chat UI:** Features message bubbles, a typing indicator, and auto-scrolling to the latest message.

## Tech Stack

- **Frontend:** React, JavaScript (ES6+), CSS3 with Custom Properties (Variables)
- **Backend:** Flask (Python), Flask-CORS
- **AI Engine:** Ollama (with `gemma3` model)
- **Communication:** HTTP, Server-Sent Events (SSE) for streaming

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher) & **npm** - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) & **pip** - [Download here](https://www.python.org/downloads/)
- **Ollama** - [Download & Installation Guide](https://ollama.ai/)

## Project Structure
├── 📁 backend/
│ ├── app.py # Flask backend server & API routes
│ └── requirements.txt # Python dependencies
├── 📁 frontend/
│ ├── 📁 node_modules/ # Auto-generated (do not edit)
│ ├── 📁 public/ # Static assets
│ ├── 📁 src/
│ │ ├── App.css # Comprehensive styles for the entire app
│ │ ├── App.js # Main React application component
│ │ ├── Chat.js # Core chat component with streaming logic
│ │ └── index.js # React application entry point
│ ├── package-lock.json # Auto-generated (exact dependency tree)
│ └── package.json # Frontend dependencies and scripts
└── 📄 README.md # This file


## Installation & Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Set Up the AI Backend (Ollama)

First, pull the required model using Ollama:
```bash

ollama pull gemma3
```

Then, start the Ollama service (it usually runs in the background after installation).

### 3. Set Up the Python Backend

#### 1. Navigate to the backend directory:
``` bash

cd backend
```

#### 2. (Recommended) Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

#### 3. Install Python dependencies:
```bash
pip install flask flask-cors ollama
```

#### 4. Run the Flask server:
```bash
python app.py
```
The backend API will start on http://localhost:8000. Keep this terminal window open.

### 4. Set Up the React Frontend

#### 1. Open a new terminal window and navigate to the frontend directory.
```bash
cd ../frontend
```
    
#### 2. Install npm dependencies:
```bash
npm install
```

#### 3. Start the development server:
```bash
npm start
```
The frontend will start on `http://localhost:3000` and should automatically open in your browser.

## Usage

1. Ensure both your backend (`http://localhost:8000)` and frontend (`http://localhost:3000`) servers are running.

2. Open your browser and go to `http://localhost:3000`.

3. Type a message in the input field at the bottom and press "Send" or hit `Enter`.

4. Watch as the AI streams its response back in real-time!

