import { useState, useEffect } from "react";
import { getAgeGroup } from "../services/contentEngine";
import { generatePersonalizedResponse } from "../services/contentEngine";
import { userService, chatService } from "../services/userContext";
import AgeGroupBadge from "../components/AgeGroupBadge";

function Talk() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [ageGroup, setAgeGroup] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (user) {
      setAgeGroup(getAgeGroup(user.age));
      setUserName(user.name);
      setChatHistory(chatService.getRecentMessages(10));
    }
  }, []);

  function send() {
    if (!message.trim()) return;

    setIsLoading(true);

    // Add user message to history
    chatService.addMessage(message, "user");

    // Generate personalized response
    setTimeout(() => {
      const response = generatePersonalizedResponse(message, ageGroup, { name: userName });
      setReply(response);

      // Add AI response to history
      chatService.addMessage(response, "safespace");

      // Update chat history
      const updatedHistory = chatService.getRecentMessages(10);
      setChatHistory(updatedHistory);

      setMessage("");
      setIsLoading(false);
    }, 500);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!ageGroup) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <AgeGroupBadge ageGroup={ageGroup} />

      <h2>Talk to SafeSpace</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        This is a safe, non-judgmental space to express what you're feeling.
        Your thoughts and emotions matter, and you deserve support.
      </p>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div style={{
          background: "#f9f9f9",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "2rem",
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #e0e0e0"
        }}>
          <h4 style={{ marginTop: 0, color: "#666" }}>Recent Conversation</h4>
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #eee",
                lastChild: { borderBottom: "none" }
              }}
            >
              <div style={{
                display: "inline-block",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                background: msg.sender === "user" ? "#667eea" : "#e8f5e9",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "90%",
                wordWrap: "break-word"
              }}>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{msg.text}</p>
                <p style={{
                  margin: "0.5rem 0 0 0",
                  fontSize: "0.75rem",
                  opacity: 0.7
                }}>
                  {msg.sender === "user" ? "You" : "SafeSpace"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{
        background: "#f5f5f5",
        padding: "1.5rem",
        borderRadius: "10px",
        marginBottom: "1.5rem"
      }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="5"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "2px solid #ddd",
            fontSize: "1rem",
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box"
          }}
          placeholder="Share what you're feeling... there's no judgment here. 💙"
          disabled={isLoading}
        />
        <button
          onClick={send}
          disabled={isLoading || !message.trim()}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: isLoading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>

      {/* Response Area */}
      {reply && (
        <div style={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)",
          padding: "1.5rem",
          borderRadius: "10px",
          borderLeft: "4px solid #4caf50",
          marginBottom: "1rem"
        }}>
          <p style={{ margin: "0 0 1rem 0", fontWeight: "bold", color: "#2e7d32" }}>
            💚 SafeSpace Response
          </p>
          <p style={{ margin: 0, lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {reply}
          </p>
        </div>
      )}

      {/* Resource Tips */}
      <div style={{
        background: "#fff3e0",
        padding: "1rem",
        borderRadius: "10px",
        marginTop: "2rem",
        fontSize: "0.9rem",
        borderLeft: "4px solid #ff9800"
      }}>
        <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>💡 Remember:</p>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Your feelings are valid and important</li>
          <li>Talking about emotions is a sign of strength</li>
          <li>Professional help is always available if you need it</li>
          <li>You're not alone in what you're experiencing</li>
        </ul>
      </div>
    </div>
  );
}

export default Talk;
