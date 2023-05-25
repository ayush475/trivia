import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

const Final = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [topParticipants, setTopParticipants] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setName(searchParams.get("name"));
    setScore(searchParams.get("score"));
    setTime(searchParams.get("time"));

    fetchTopParticipants();
  }, [location]);

  const fetchTopParticipants = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/results/results/top");
      if (response.ok) {
        const data = await response.json();
        setTopParticipants(data);
      } else {
        console.log("Failed to fetch top participants.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl">Final Report Card</h1>
      <h2>Name: {name}</h2>
      <h2>Score: {score}</h2>
      <h2>Total time: {time}</h2>

      <h2>Top Participants:</h2>
      <ul>
        {topParticipants.map((participant) => (
          <li key={participant._id}>
            <strong>{participant.participant}</strong>
            <p>{participant.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Final;
