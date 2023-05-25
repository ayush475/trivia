import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Homepage = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Redirect to the next page with the user's name
    window.location.href = `/trivia?name=${name}`;
  };

  return (
    <div className="container mx-auto mt-10 py-11">
      <h1 className="text-4xl text-center">TRIVIA APP HOMEPAGE</h1>

      <form onSubmit={handleSubmit} className="mt-4 text-center justify-center">
        <input
          type="text"
          placeholder="Please Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-xl shadow-sm border border-blue-500 focus:border-indigo-300 focus:ring-indigo-300 focus:ring-offset-2 focus:outline-none py-2 px-5 mr-1 text-xl"
        />

        <button
          type="submit"
          className="mt-4 text-white bg-indigo-500 rounded-md shadow-sm py-2 px-4 text-xl"
        >
          Submit
        </button>
      </form>

      <div className="mt-10 flex flex-wrap">
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold">Submitted By</h2>
          <p>
            this column will have all the users who submitted this project sorry
            for my bad english
          </p>
          {/* Content for the "Submitted By" column */}
        </div>
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold">Rules</h2>
          <ul className="list-disc pl-6 mt-4 justify-center">
            <li className="mb-2">
              The <span className="text-red-600 underline">name</span> is required to start the Trivia.
            </li>
            <li className="mb-2">
              The participant needs to <span className="text-red-600 underline">select an answer before proceeding</span>  to the next question.
            </li>
            <li className="mb-2">Each <span className="text-red-600 underline">correct</span> answer will earn you <span className="text-red-600 underline">points</span>.</li>
            <li className="mb-2">
              The Trivia page has <span className="text-red-600 underline">Timer</span> that will start as soon as the Trivia starts and will stop when the Trivia ends.
            </li>
        <li className="mb-2">
          The final page will display the <span className="text-red-600 underline">participant's name, score, and time taken </span>to complete the Trivia.
        </li>
        <li className="mb-2">
          The <span className="text-red-600 underline">top 5 participants</span> will be displayed on the final page.
        </li>
           
          </ul>
          {/* Content for the "Rules" column */}
        </div>
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold">Random Quotes</h2>
          <p>this column will have all the random quotes</p>
          {/* Content for the "Lorem Ipsum" column */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
