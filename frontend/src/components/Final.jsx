import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

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
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URI}/api/results/results/top`
      );
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
    <div className="   " >

    <div className="w-full max-w-md mx-auto mt-0 ">
      <h1 className="text-4xl text-center">Final Report Card</h1>
      <div className="mt-6 w-full border border-solid border-gray-500">
        <div className="flex bg-gray-100 border-b border-solid border-gray-500">
          <div className="py-2 px-4 w-1/2 font-bold">Name:</div>
          <div className="py-2 px-4 w-1/2">{name}</div>
        </div>
        <div className="flex border-b border-solid border-gray-500">
          <div className="py-2 px-4 w-1/2 font-bold">Score:</div>
          <div className="py-2 px-4 w-1/2">{score}</div>
        </div>
        <div className="flex bg-gray-100 border-b border-solid border-gray-500">
          <div className="py-2 px-4 w-1/2 font-bold">Total time:</div>
          <div className="py-2 px-4 w-1/2">{time}</div>
        </div>
      </div>

      <h2 className="mb-4 text-center text-2xl py-4 text-yellow-500">
        Top <span className="text-3xl text-blue-800">5</span> Participants:
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {topParticipants.slice(0, 5).map((participant) => (
          <div
            key={participant._id}
            className="border rounded-3xl border-solid border-gray-500 p-4 hover:bg-gray-100 transition duration-300"
          >
            <strong className="text-gray-900 font-bold">
              <span className="underline">Name</span>:{" "}
              {participant.participant}
            </strong>
            <span className="text-gray-500">
              <h1>Score: {participant.score}</h1>
              <h1>Time: {participant.totalTime} sec</h1>
            </span>
          </div>
        ))}
      </div>

      <span className="pt-4 mt-20  text-xl font-semibold text-center">
        Return to Homepage?{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          here
        </Link>
      </span>
    </div>
    </div>
  );
};

export default Final;
