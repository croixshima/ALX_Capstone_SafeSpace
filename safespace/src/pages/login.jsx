import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const user = userService.getCurrentUser();

      if (!user || user.email !== email || user.password !== password) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      navigate("/dashboard");
    }, 300);
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ margin: "0 0 0.5rem 0" }}>💙 SafeSpace</h1>
          <p style={{ margin: 0, color: "#666" }}>Your Safe Place to Talk</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#333"
            }}>
              Email
            </label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #ddd",
                borderRadius: "5px",
                fontSize: "1rem",
                boxSizing: "border-box",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#333"
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #ddd",
                borderRadius: "5px",
                fontSize: "1rem",
                boxSizing: "border-box",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: isLoading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#ffebee",
            color: "#c62828",
            borderRadius: "5px",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <div style={{
          marginTop: "1.5rem",
          textAlign: "center",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "5px"
        }}>
          <p style={{ margin: "0 0 0.5rem 0", color: "#666" }}>
            Don't have an account?
          </p>
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "white",
              color: "#667eea",
              border: "2px solid #667eea",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#667eea";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#667eea";
            }}
          >
            Sign Up Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
