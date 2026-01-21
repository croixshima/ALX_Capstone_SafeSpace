import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Learn from "./pages/learn";
import Talk from "./pages/talk";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/talk" element={<Talk />} />
    </Routes>
  );
}

export default App;
