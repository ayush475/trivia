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
    <div className="relative">
    <h1 className="text-2xl lg:text-4xl text-center font-bold mt-10">Trivia Questions for<span className="text-2xl lg:text-4xl px-1 underline text-blue">{name}</span></h1>
  
    {questions.length > 0 && !quizCompleted ? (
      <div className="w-full max-w-md mx-auto mt-10">
        <h2 className="text-lg lg:text-xl mb-4">
          {questions[currentQuestionIndex].question}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div
  key={index}
  className={[
    "py-2 border-b border-solid border-blue-500 cursor-pointer hover:bg-blue-200 transition ease-in-out duration-500",
    selectedOption === index ? "selected bg-blue-500" : "",
  ].join(" ")}
  onClick={() => handleOptionClick(index)}
>
  {option}
</div>

          ))}
        </div>
        {selectedOption !== null && (
  <button className="mt-6 text-gray-900 font-bold bg-white hover:bg-blue-400 py-2 px-4 rounded border border-solid border-gray-500" onClick={handleNextQuestion}>
    Next Question
  </button>
)}
<div className="mt-2 px-0">
  <p className="w-1/2 border-blue-500 border-double border-4 px-4 py-2 rounded-lg hover:bg-blue-300">
    Timer: {time} seconds
  </p>
</div>





      </div>
    ) : (
      <div className="w-full max-w-md mx-auto mt-10 bg-gray-300 p-6 rounded-lg">
      <h2 className="text-center text-gray-500 text-2xl mb-4">Quiz Completed!</h2>
      <p className="text-gray-600 text-lg mb-2">Your score: <span className="text-black text-2xl">{score}</span> </p>
      <p className="text-gray-600 text-lg mb-4">Total time taken: <span className="text-black text-2xl">{totalTime} </span> seconds</p>
      <button className="mt-6  text-gray-900 font-bold bg-white hover:bg-gray-200 py-2 px-4 rounded cursor-pointer border border-solid border-red-500">
        Let's see the report card
      </button>
    </div>
    
    

    )}
  </div>
  
  );
};

export default Trivia;