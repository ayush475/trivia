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
  <table className="mt-6 w-full border border-solid border-gray-500">
    <tbody>
      <tr>
        <td className="py-2 px-4 border-b border-solid border-gray-500">Name:</td>
        <td className="py-2 px-4 border-b border-solid border-gray-500">{name}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border-b border-solid border-gray-500">Score:</td>
        <td className="py-2 px-4 border-b border-solid border-gray-500">{score}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border-b border-solid border-gray-500">Total time:</td>
        <td className="py-2 px-4 border-b border-solid border-gray-500">{time}</td>
      </tr>
    </tbody>
  </table>


      {/* <h2 className="mb-4 text-center">Top <span>5</span> Participants:</h2>
      <div className="grid grid-cols-3 gap-4">
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
      </div> */}
      <h2 className="mb-4 text-center text-4xl py-4 text-yellow-500">Top <span>5</span> Participants:</h2>
<div className="grid grid-cols-3 gap-4">
  {topParticipants.slice(0, 5).map((participant) => (
    <div key={participant._id} className="border border-solid border-gray-500 p-4 hover:bg-gray-100 transition duration-300">
      <strong className="text-gray-900 font-bold">
        <span className="underline">UserName</span>: {participant.participant}
      </strong>
      <span className="text-gray-500">
        <h1>Score: {participant.score}</h1>
        <h1>Time: {participant.totalTime} sec</h1>
      </span>
    </div>
  ))}
</div>

<span className="pt-4 mt-9 text-xl font-semibold text-center">
  Return to Homepage? <Link to="/" className="text-blue-500 hover:underline">here</Link>
</span>

    </div>
  );
};

export default Final;
