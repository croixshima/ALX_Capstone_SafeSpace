import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userContext";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [interests, setInterests] = useState([]);

  const availableInterests = [
    "Relationships",
    "Mental Health",
    "Self-Confidence",
    "Communication",
    "Boundaries",
    "Self-Care",
    "Emotions",
    "Friendship"
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleInterest(interest) {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    userService.saveUser(form);
    userService.updateInterests(interests);
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Create your SafeSpace account</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "2px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            required
            min="13"
            max="100"
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "2px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "2px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "2px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "1rem", fontWeight: "bold" }}>
            📌 What are you interested in learning about? (Optional)
          </label>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem"
          }}>
            {availableInterests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                style={{
                  padding: "0.75rem 1rem",
                  border: interests.includes(interest) ? "2px solid #667eea" : "2px solid #ddd",
                  borderRadius: "5px",
                  background: interests.includes(interest) ? "#e8eaf6" : "white",
                  color: interests.includes(interest) ? "#667eea" : "#666",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.2s ease"
                }}
              >
                {interests.includes(interest) ? "✓" : ""} {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "5px",
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
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
