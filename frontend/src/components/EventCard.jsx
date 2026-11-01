import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api.js";

function EventCard({ event }) {
  const [seatsLeft, setSeatsLeft] = useState(event.seats);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: event._id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSeatsLeft(seatsLeft - 1);
        setMessage("Registered successfully!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to server.");
    }
  };

  return (
    <div className="event-card">
      <h3>{event.name}</h3>

      <p>Category: {event.category}</p>

      <p>
        Fee: {event.fee === 0 ? "Free" : `Rs. ${event.fee}`}
      </p>

      <p>Seats left: {seatsLeft}</p>

      {seatsLeft === 0 ? (
        <button disabled>SOLD OUT</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EventCard;