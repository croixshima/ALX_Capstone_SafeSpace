import { useEffect, useState } from "react";
import { content } from "../services/content";
import { getAgeGroup, getAgeGroupInfo } from "../services/contentEngine";
import { userService } from "../services/userContext";
import TopicRecommendation from "../components/TopicRecommendation";
import ProgressTracker from "../components/ProgressTracker";
import AgeGroupBadge from "../components/AgeGroupBadge";

function Learn() {
  const [section, setSection] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (!user) return;

    const userAgeGroup = getAgeGroup(user.age);
    setAgeGroup(userAgeGroup);

    // Map age group to content
    const contentMap = {
      teen: content.teen,
      young: content.young,
      adult: content.adult
    };

    setSection(contentMap[userAgeGroup]);
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setExpandedTopic(topic.title);
    userService.addViewedTopic(topic.title);
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setExpandedTopic(null);
  };

  if (!section || !ageGroup) return <p style={{ padding: "2rem" }}>Loading...</p>;

  // Detailed topic view
  if (selectedTopic) {
    return (
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
        <button
          onClick={handleBack}
          style={{
            background: "#667eea",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
        >
          ← Back to Topics
        </button>

        <AgeGroupBadge ageGroup={ageGroup} />

        <h2>{selectedTopic.title}</h2>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          ⏱️ Reading time: {selectedTopic.readTime || "5 min"} | 
          📊 Level: {selectedTopic.difficulty === "beginner" ? "Beginner" : "Intermediate"}
        </p>

        <div style={{
          background: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "10px",
          lineHeight: "1.8",
          marginTop: "1.5rem"
        }}>
          {selectedTopic.text}
        </div>

        <div style={{ marginTop: "2rem", padding: "1rem", background: "#e8f5e9", borderRadius: "10px" }}>
          <p style={{ margin: 0 }}>
            ✅ You've completed this topic! Continue learning to build your foundation.
          </p>
        </div>
      </div>
    );
  }

  // Main learn page with topics list
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <AgeGroupBadge ageGroup={ageGroup} />

      <h2>{section.title}</h2>

      <ProgressTracker totalTopics={section.topics.length} />

      <TopicRecommendation
        content={section}
        onSelectTopic={handleTopicSelect}
      />

      <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>📖 All Topics</h3>

      {section.topics.map((topic, index) => {
        const isViewed = userService.getViewedTopics().includes(topic.title);

        return (
          <div
            key={index}
            onClick={() => handleTopicSelect(topic)}
            style={{
              padding: "1.5rem",
              marginBottom: "1rem",
              border: isViewed ? "2px solid #4caf50" : "2px solid #ddd",
              borderRadius: "10px",
              cursor: "pointer",
              background: isViewed ? "#f1f8f4" : "#ffffff",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ margin: "0 0 0.5rem 0" }}>
                  {isViewed && "✅ "}{topic.title}
                </h4>
                <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                  {topic.text.substring(0, 100)}...
                </p>
                <p style={{ margin: "0.5rem 0 0 0", color: "#999", fontSize: "0.85rem" }}>
                  ⏱️ {topic.readTime || "5 min"} • 📊 {topic.difficulty === "beginner" ? "Beginner" : "Intermediate"}
                </p>
              </div>
              <div style={{ fontSize: "1.5rem" }}>→</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Learn;
