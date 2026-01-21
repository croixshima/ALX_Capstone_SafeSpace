import { useEffect, useState } from "react";
import { userService } from "../services/userContext";

function ProgressTracker({ totalTopics }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const viewedTopics = userService.getViewedTopics();
    const percentage = Math.round((viewedTopics.length / totalTopics) * 100);
    setProgress(percentage);
  }, [totalTopics]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        fontSize: "0.9rem"
      }}>
        <span>Your Learning Progress</span>
        <span style={{ fontWeight: "bold" }}>{progress}%</span>
      </div>
      <div style={{
        background: "#e0e0e0",
        borderRadius: "10px",
        height: "8px",
        overflow: "hidden"
      }}>
        <div style={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          height: "100%",
          width: `${progress}%`,
          transition: "width 0.3s ease"
        }} />
      </div>
      <p style={{
        marginTop: "0.5rem",
        fontSize: "0.85rem",
        color: "#666"
      }}>
        Keep learning! You're making great progress.
      </p>
    </div>
  );
}

export default ProgressTracker;
