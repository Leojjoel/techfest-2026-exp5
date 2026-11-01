import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store JWT token
        localStorage.setItem("token", data.token);

        // Store user information
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userRole", data.role);

        // Go to events page after successful login
        navigate("/events");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to server.");
    }
  };

  return (
    <div className="page">
      <h1>TechFest 2026</h1>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>

      {message && <p className="error-msg">{message}</p>}

      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;