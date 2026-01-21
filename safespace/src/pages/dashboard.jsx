import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { content } from "../services/content";
import { getAgeGroup, getAgeGroupInfo } from "../services/contentEngine";
import { userService, chatService } from "../services/userContext";
import AgeGroupBadge from "../components/AgeGroupBadge";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [section, setSection] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [stats, setStats] = useState({
    topicsViewed: 0,
    messagesExchanged: 0,
    interests: []
  });

  useEffect(() => {
    const saved = userService.getCurrentUser();
    if (!saved) {
      navigate("/login");
      return;
    }

    setUser(saved);

    const userAgeGroup = getAgeGroup(saved.age);
    setAgeGroup(userAgeGroup);

    const contentMap = {
      teen: content.teen,
      young: content.young,
      adult: content.adult
    };

    setSection(contentMap[userAgeGroup]);

    // Calculate stats
    const viewedTopics = userService.getViewedTopics();
    const chatHistory = chatService.getChatHistory();
    const interests = userService.getUserPreferences().interests;

    setStats({
      topicsViewed: viewedTopics.length,
      messagesExchanged: Math.floor(chatHistory.length / 2),
      interests: interests
    });
  }, [navigate]);

  function handleLogout() {
    userService.clearUserData();
    navigate("/");
  }

  if (!user || !section || !ageGroup) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "2rem",
        borderRadius: "15px",
        marginBottom: "2rem"
      }}>
        <h1 style={{ margin: "0 0 0.5rem 0" }}>Welcome, {user.name}! 💙</h1>
        <p style={{ margin: "0", opacity: 0.9 }}>Age: {user.age}</p>
      </div>

      <AgeGroupBadge ageGroup={ageGroup} />

      <h2>{section.title}</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        SafeSpace is showing you personalized guidance that matches your stage of life.
        You're in good company—this community supports each other through everything.
      </p>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <div style={{
          background: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "10px",
          textAlign: "center",
          borderLeft: "4px solid #667eea"
        }}>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.topicsViewed}
          </p>
          <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
            Topics Learned
          </p>
        </div>

        <div style={{
          background: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "10px",
          textAlign: "center",
          borderLeft: "4px solid #764ba2"
        }}>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.messagesExchanged}
          </p>
          <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
            Conversations
          </p>
        </div>

        <div style={{
          background: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "10px",
          textAlign: "center",
          borderLeft: "4px solid #4caf50"
        }}>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
            {stats.interests.length}
          </p>
          <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
            Interests
          </p>
        </div>
      </div>

      {/* Interests Display */}
      {stats.interests.length > 0 && (
        <div style={{
          background: "#e8f5e9",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          borderLeft: "4px solid #4caf50"
        }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>🎯 Your Interests</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {stats.interests.map(interest => (
              <span
                key={interest}
                style={{
                  background: "#4caf50",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem"
                }}
              >
                ✓ {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <button
          onClick={() => navigate("/learn")}
          style={{
            padding: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          📚 Explore Learning
        </button>

        <button
          onClick={() => navigate("/talk")}
          style={{
            padding: "1rem",
            background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(76, 175, 80, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          💬 Talk to SafeSpace
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "#f5f5f5",
          color: "#666",
          border: "2px solid #ddd",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#eeeeee";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f5f5f5";
        }}
      >
        🚪 Log Out
      </button>
    </div>
  );
}

export default Dashboard;
