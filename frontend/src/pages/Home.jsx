function Home() {
  const announcements = [
    "Coding Contest registrations are now open.",
    "Web Development Workshop will be conducted on Day 1.",
    "Robotics Challenge has limited seats available.",
    "Cultural Night will be held on the final day.",
    "Football Tournament registrations are open.",
  ];

  return (
    <div className="page">
      <h1>Welcome to TechFest 2026</h1>

      <p>
        Three days of hackathons, workshops and competitions.
      </p>

      <h2>Announcements</h2>

      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;