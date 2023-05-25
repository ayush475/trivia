import React,{useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Homepage = () => {
    const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Redirect to the next page with the user's name
    window.location.href = `/trivia?name=${name}`;
  };
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl text-center">TRIVIA APP HOMEPAGE</h1>
    
    <form onSubmit={handleSubmit} className="mt-4 text-center justify-center">
      <input
        type="text"
        placeholder=" Please Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring-indigo-300 focus:ring-offset-2 focus:outline-none py-2 px-4 text-xl"
      />

      <button type="submit" className="mt-4 text-white bg-indigo-500 rounded-md shadow-sm py-2 px-4 text-xl">Submit</button>
    </form>
  </div>
  )
}

export default Homepage
