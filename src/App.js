import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Onboarding/LandingPage';
import Login from './Onboarding/Login';
import Register from './Onboarding/Register';
import ResetPin from './Onboarding/ResetPin';
import EmployeeDashboard from './Dashboard/EmployeeDashboard/Employee-Dashboard';
import AccountantDashboard from './Dashboard/Accountant-Dashboard';
import FinanceManagerDashboard from './Dashboard/FinanceManager-Dashboard';
import Receipts from './Dashboard/EmployeeDashboard/Receipts';
import ViewRequests from './Dashboard/EmployeeDashboard/ViewRequests';
import EmployeeNotifications from './Dashboard/EmployeeDashboard/EmployeeNotifications';

const PPRAImprest = () => {

  return (
    <div>
     <Router>
      <Routes>
      <Route path="" exact element={<LandingPage />} />
      <Route path="/LandingPage" exact element={<LandingPage />} />
      <Route path="/Login" exact element={<Login />} />
      <Route path="/Register" exact element={<Register />} />
      <Route path="/ResetPin" exact element={<ResetPin />} />
      <Route path="/AccountantDashboard" exact element={<AccountantDashboard />} />
      <Route path="/EmployeeDashboard" exact element={<EmployeeDashboard />} />
      <Route path="/FinanceManagerDashboard" exact element={<FinanceManagerDashboard />} />
      <Route path="/ViewRequests" exact element={<ViewRequests />} />
      <Route path="/Receipts" exact element={ <Receipts/>} />
      <Route path="/EmployeeNotifications" exact element={ <EmployeeNotifications/>} />
      </Routes>
     </Router>
    </div>
  )
}

export default PPRAImprest;