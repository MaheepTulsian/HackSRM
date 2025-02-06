# 👨‍💻 ASSES.AI

## 📃 Overview

This project, developed at National Level Techno Hackathon held at SRM University AP, is a full-stack AI-powered application designed to automate various tasks related to education. It includes features such as intelligent assignment generation, automated evaluation, and an AI-driven Retrieval-Augmented Generation (RAG) chat system. The system is built with a combination of modern web technologies and AI Agentic frameworks, ensuring a seamless user experience and robust backend processing.

### Key Capabilities

- ✅ **AI-Generated Assignments:** Agents automatically creates assignments based on predefined topics or user inputs.
- ✅ **Solution Evaluation:** An AI-based agentic system that evaluates solutions and provides automated feedback.
- ✅ **Web Search Integration:** Leverages AI-driven agentic search capabilities to provide real-time information retrieval.
- ✅ **RAG-Based Chat System:** Integrates retrieval-augmented generation to enhance AI responses with relevant document retrieval.
- ✅ **User-Friendly UI:** A clean and interactive frontend built using React (Vite) for enhanced usability.
- ✅ **Scalable Backend:** Developed with Python (FastAPI) and Node.js (Express.js) for efficient API handling.

## 📂 Project Structure

```
📦 Project Root
├── 📂 backend/                     # Backend services
│   ├── 📂 constant/                # Constant values and configurations
│   ├── 📂 create_assignment/       # Assignment generation logic
│   ├── 📂 db/                      # Database-related files
│   ├── 📜 agents.py                # AI agent handling
│   ├── 📜 generate_assignment.py   # Assignment generator
│   ├── 📜 main.py                  # Main entry point for backend
│   ├── 📜 rag_chat.py              # RAG-based chat module
│   ├── 📜 solution_evaluator.py    # AI-based solution evaluator
│   ├── 📜 summerize_pdf.py         # PDF summarization utility
│   ├── 📜 task.py                  # Task handling
│   ├── 📜 tools.py                 # Utility tools
│   ├── 📜 web_search.py            # Web search functionality
│   ├── 📜 requirements.txt         # Python dependencies
│
├── 📂 frontend/                    # Frontend UI
│   ├── 📂 public/                  # Static assets
│   ├── 📂 src/                     # React source code
│   ├── 📜 index.html               # Main HTML file
│   ├── 📜 App.jsx                  # Main React component
│   ├── 📜 App.css                  # Stylesheet
│   ├── 📜 index.css                # Global styles
│   ├── 📜 main.jsx                 # Entry point for React
│   ├── 📜 package.json             # Frontend dependencies
│   ├── 📜 vite.config.js           # Vite configuration
│
├── 📂 server/                      # Express.js backend
│   ├── 📂 db/                      # Database connections
│   ├── 📂 middleware/              # Middleware functions
│   ├── 📂 models/                  # Data models
│   ├── 📂 Routes/                  # API routes
│   ├── 📂 utils/                   # Utility functions
│   ├── 📜 app.js                   # Express server setup
│   ├── 📜 index.js                 # Server entry point
│   ├── 📜 package.json             # Server dependencies
```

## 🤖 Installation

### 🔙 Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Run the backend:
   ```bash
   python main.py
   ```

### 🔝 Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run the frontend:
   ```bash
   npm run dev
   ```

### 🈂️ Server Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Run the server:
   ```bash
   node index.js
   ```

## 🪴 Usage

- Open the frontend in the browser.
- The backend handles AI-powered logic and APIs.
- The Express server manages API requests.

## 💥 Technologies Used

- **Frontend:** React (Vite)
- **Backend:** Python (Flask/FastAPI)
- **Server:** Node.js (Express.js)
- **Database:** MongoDB
- **AI Agents:** Crewai

## 🤳 Connect With Us

If you are interested in collaborating or have similar ideas to explore, feel free to connect with us. We welcome discussions, contributions, and innovative ideas to enhance this project further.

## 🤝 Contributors:

- 👨‍💻 **Avinash Yadav** [@avinashyadav16](https://github.com/avinashyadav16)
- 👨‍💻 **Govind Mohan Shah** [@govindmohan0](https://github.com/govindmohan0)
- 👨‍💻 **Maheep Tulsian** [@maheeptulsian](https://github.com/maheeptulsian)
- 👨‍💻 **Satyam Kumar** [@satyam2016](https://github.com/satyam2016)
- 👨‍💻 **Satyendra Singh** [@singhsatyendra8052](https://github.com/singhsatyendra8052)

---

---
