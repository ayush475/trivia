import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const totalSeconds = time + totalTime;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
  
    const resultData = {
      participant: name,
      score: score,
      totalTime: totalSeconds,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/results/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });
  
      if (response.ok) {
        // Result stored successfully
        window.location.href = `/final?name=${name}&score=${score}&time=${totalMinutes}m${remainingSeconds}s`;
      } else {
        console.error("Failed to store the result.");
      }
    } catch (error) {
      console.error("Failed to store the result:", error);
    }
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/questions/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // const handleOptionClick = (optionIndex) => {
  //   if (selectedOption === null) {
  //     setSelectedOption(optionIndex);
  //     const currentQuestion = questions[currentQuestionIndex];
  //     if (currentQuestion.answer === optionIndex) {
  //       setScore(score + 1);
  //     }
  //   }
  // };
  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answer === optionIndex) {
      setScore(score + 1);
    }
  };
  

  
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Last question, quiz completed
      setQuizCompleted(true);
    }
  };

  useEffect(() => {
    // Calculate the total time when quiz is completed
    if (quizCompleted) {
      setTotalTime((prevTotalTime) => prevTotalTime + time);
    }
  }, [quizCompleted]);

  return (
    <div>
     <h1 className="text-4xl text-center">Trivia Questions for {name}</h1>
{questions.length > 0 && !quizCompleted ? (
  <div className="w-full max-w-md mx-auto mt-10">
    <h2 className="mb-4">
      {questions[currentQuestionIndex].question}
    </h2>
    <ul className="list-disc list-inside">
      {questions[currentQuestionIndex].options.map((option, index) => (
        <li
          key={index}
          className={[
            selectedOption === index ? "selected" : "",
            "py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition ease-in-out duration-500",
          ]}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </li>
      ))}
    </ul>
    {selectedOption !== null && (
      <button className="mt-6 text-gray-900 font-bold bg-white hover:bg-gray-100 py-2 px-4 rounded  cu" onClick={handleNextQuestion}>
        Next Question
      </button>
    )}
    <p className="mt-4 text-gray-500">Time taken: {time} seconds</p>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto mt-10">
        <h2 className="text-center text-gray-500">Quiz Completed!</h2>
        <p className="text-gray-500">Your score: {score}</p>
        <p className="text-gray-500">Total time taken: {totalTime} seconds</p>
        <button className="mt-6 text-gray-900 font-bold bg-white hover:bg-gray-100 py-2 px-4 rounded cursor-pointer" onClick={handleSubmit}>
          Let's see the report card
        </button>
      </div>
      )}
    </div>
  );
};

export default Trivia;