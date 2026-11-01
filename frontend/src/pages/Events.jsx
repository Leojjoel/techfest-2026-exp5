import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { API } from "../api.js";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load events");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Could not load events from server.");
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const nameMatches = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatches =
      category === "All" || event.category === category;

    return nameMatches && categoryMatches;
  });

  return (
    <div className="page">
      <h1>Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>

      {loading && <p>Loading events...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <EventList events={filteredEvents} />
      )}
    </div>
  );
}

export default Events;