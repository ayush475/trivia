import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation, Link } from "react-router-dom";

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
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-4xl text-center">Final Report Card</h1>
      <h2 className="mb-4">Name: {name}</h2>
      <h2 className="mb-4">Score: {score}</h2>
      <h2 className="mb-4">Total time: {time}</h2>

      <h2 className="mb-4 text-center">Top <span>5</span> Participants:</h2>
      <ul className="flex-row">
        {topParticipants.map((participant) => (
          <li key={participant._id } className="">
            <strong className="text-gray-900 font-bold">
              <span className="underline">UserName</span>:{participant.participant}
            </strong>
            <span className="text-gray-500">
              <h1>score:{participant.score}</h1>
              <h1>Time:{participant.totalTime}sec</h1>
              
            </span>
          </li>
        ))}
      </ul>
      <span className="pt-4 mt-9 text-xl font-semibold text-align-center">Return to Homepage? <Link to='/'>here</Link> </span>
    </div>
  );
};

export default Final;
