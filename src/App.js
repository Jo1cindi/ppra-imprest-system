import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Onboarding/LandingPage';
import Login from './Onboarding/Login';
import Register from './Onboarding/Register';
import ResetPin from './Onboarding/ResetPin';

const PPRAImprest = () => {
  return (
    <div>
     <Router>
      <Routes>
      <Route path="" exact element={<LandingPage />} />
      <Route path="/Login" exact element={<Login />} />
      <Route path="/Register" exact element={<Register />} />
      <Route path="/ResetPin" exact element={<ResetPin />} />
      </Routes>
     </Router>
    </div>
  )
}

export default PPRAImprest;