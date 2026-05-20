import { useEffect, useRef, useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { chatbotIntro, quickReplies, getBotResponse } from "../data/chatbotData.js";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{ role: "bot", text: chatbotIntro }]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(text);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Bot size={18} />
            </div>
            <div className="chatbot-header-info">
              <strong>Mubix AI</strong>
              <span>Ask me anything</span>
            </div>
            <button
              className="chatbot-close"
              onClick={handleClose}
              aria-label="Close chatbot"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                {msg.role === "bot" && (
                  <div className="chatbot-msg-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className="chatbot-msg-bubble">
                  {msg.text.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg-avatar">
                  <Bot size={14} />
                </div>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {!isTyping && messages.length <= 1 && (
              <div className="chatbot-quick-replies">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    className="chatbot-chip"
                    onClick={() => handleQuickReply(q)}
                    type="button"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Chat message input"
            />
            <button
              className="chatbot-send"
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        className={`chatbot-fab ${isOpen ? "chatbot-fab--active" : ""}`}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        type="button"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
    </div>
  );
}
