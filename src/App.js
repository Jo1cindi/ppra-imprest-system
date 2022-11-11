import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Onboarding/LandingPage';
import Login from './Onboarding/Login';
import Register from './Onboarding/Register';
import ResetPin from './Onboarding/ResetPin';
import EmployeeDashboard from './Dashboard/EmployeeDashboard/Employee-Dashboard';
import AccountantDashboard from './Dashboard/AccountantDashboard/Accountant-Dashboard';
import FinanceManagerDashboard from './Dashboard/Finance Manager Dashboard/FinanceManager-Dashboard';
import Receipts from './Dashboard/EmployeeDashboard/Receipts';
import ViewRequests from './Dashboard/EmployeeDashboard/ViewRequests';
import EmployeeNotifications from './Dashboard/EmployeeDashboard/EmployeeNotifications';
import History from './Dashboard/Finance Manager Dashboard/History';
import PettyCashBook from './Dashboard/AccountantDashboard/PettyCashBook';
import AdminLogin from './Onboarding/Admin-Login';
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard';
import AllUsers from './Dashboard/AdminDashboard/AllUsers';
import RemoveUsers from './Dashboard/AdminDashboard/RemoveUsers';


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
      <Route path="/History" exact element={ <History/>} />
      <Route path="/PettyCashBook" exact element={ <PettyCashBook/>} />
      <Route path="/Admin-Login" exact element={ <AdminLogin/>} />
      <Route path="/Admin-Dashboard" exact element={ <AdminDashboard/>} />
      <Route path="/All-Users" exact element={ <AllUsers/>} />
      <Route path="/Remove-User" exact element={ <RemoveUsers/>} />
      </Routes>
     </Router>
    </div>
  )
}

export default PPRAImprest;