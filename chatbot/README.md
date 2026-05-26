# Interactive Chatbot Architecture

The client-side AI Developer Assistant interface and conversation simulation nodes are configured under:

👉 **[src/components/Chatbot.jsx](../src/components/Chatbot.jsx)**
👉 **[src/data/chatbotData.js](../src/data/chatbotData.js)**

## System Characteristics

### 1. Predefined Conversation Nodes
Simulates response trees containing information about Mohammed Mubashir's:
- Core Tech Stack
- AI Prompt Maker details
- MUBIX OS capabilities
- Contact & Collaboration options
- Free-text conversational replies

### 2. Conversational UX Features
- **Typing Indicator**: Adds a realistic `...` delay to simulate thought latency.
- **Auto-scroll viewport**: Ensures the conversation panel scrolls to focus new bubble nodes.
- **Tactile suggestions**: Provides quick-click query suggestions to guide recruiter interactions.
