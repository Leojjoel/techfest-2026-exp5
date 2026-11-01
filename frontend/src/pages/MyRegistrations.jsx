import { useEffect, useState } from "react";
import { API } from "../api.js";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");

  const getRegistrations = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/registrations/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRegistrations(data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to server.");
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  const cancelRegistration = async (registrationId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API}/api/registrations/${registrationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration cancelled successfully.");
        getRegistrations();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Could not connect to server.");
    }
  };

  return (
    <div className="page">
      <h1>My Registrations</h1>

      {message && <p>{message}</p>}

      {registrations.length === 0 ? (
        <p>You have no registrations.</p>
      ) : (
        registrations.map((registration) => (
          <div className="event-card" key={registration._id}>
            <h2>{registration.event.name}</h2>

            <p>
              <strong>Category:</strong>{" "}
              {registration.event.category}
            </p>

            <p>
              <strong>Fee:</strong> ₹{registration.event.fee}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(registration.event.date).toLocaleDateString()}
            </p>

            <button
              onClick={() =>
                cancelRegistration(registration._id)
              }
            >
              Cancel Registration
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;