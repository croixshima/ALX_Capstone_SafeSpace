import { useState, useEffect } from "react";
import { getRecommendedTopics } from "../services/contentEngine";
import { userService } from "../services/userContext";

function TopicRecommendation({ content, onSelectTopic }) {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const viewedTopics = userService.getViewedTopics();
    const topics = getRecommendedTopics(content, viewedTopics);
    setRecommended(topics);
  }, [content]);

  if (recommended.length === 0) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "1.5rem",
      borderRadius: "10px",
      marginBottom: "2rem"
    }}>
      <h3>📚 Recommended for You</h3>
      <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
        Based on your learning journey
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {recommended.map((topic, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTopic(topic)}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
              {topic.title}
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              {topic.readTime || "5 min"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicRecommendation;
