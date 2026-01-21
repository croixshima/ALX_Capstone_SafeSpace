import { getAgeGroupInfo } from "../services/contentEngine";

function AgeGroupBadge({ ageGroup }) {
  const info = getAgeGroupInfo(ageGroup);

  return (
    <div style={{
      display: "inline-block",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "bold",
      marginBottom: "1rem"
    }}>
      {info.icon} {info.label} Content
    </div>
  );
}

export default AgeGroupBadge;
