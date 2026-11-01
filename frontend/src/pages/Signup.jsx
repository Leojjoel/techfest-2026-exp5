import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api.js";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    if (!name || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully. Please login.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

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

      <button onClick={signup}>Sign Up</button>

      {message && <p>{message}</p>}

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;