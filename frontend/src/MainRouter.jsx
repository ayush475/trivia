import React from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams, useLocation,Navigate } from 'react-router-dom';

import Homepage from './components/Homepage';
import Trivia from './components/Trivia';
import Final from './components/Final';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/trivia" element={<TriviaPage />} />
        <Route path="/Final" element={<FinalPage />} />
      </Routes>
    </Router>
  );
};

const TriviaPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  if (!name) {
    return <Navigate to="/" />;
  }

  return <Trivia name={name} />;
};
const FinalPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const score = searchParams.get("score");
  const time = searchParams.get("time");
  if (!name || !score || !time) {
    return <Navigate to="/" />;
  }
  

  return <Final name={name} score={score} time={time} />;
};

export default MainRouter;
