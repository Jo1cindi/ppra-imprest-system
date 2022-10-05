import React from 'react';
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {MdRequestPage} from 'react-icons/md';
import {AiFillEye} from 'react-icons/ai';
import {IoNotificationsSharp, IoReceiptSharp, IoLogOut} from 'react-icons/io5'
import { NavLink } from 'react-router-dom';




const EmployeeSidebar = () => {
  // User Name
  const userFirstName = localStorage.getItem("firstName")
  const userLastName = localStorage.getItem("lastName")
  const name = userFirstName + ' ' +userLastName

 //Getting time to display greeting at the appropriate time
 let date = new Date();
 let time = date.getHours();
 let greeting = "";

 console.log(time);

 if (time < 12) {
   greeting = "Good morning";
 } else if (time >= 12 && time < 16) {
   greeting = "Good afternoon";
 } else if (time >= 16 && time < 24) {
   greeting = "Good evening";
 }

 

  return ( 
    <div className='employeeSidebar'>
    <LogoLight/>
    <div className = "userName">
      <div className = "greeting">
        <p>{greeting}</p>
      </div>
      <div className= "name">
        <p>{name}</p>
      </div>
    </div>
    <div className="menu">

     <div className="menuItem">
      <NavLink to="/EmployeeDashboard" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <MdRequestPage className='menuIcon'/>
      <div className='linkDesc'>Make Requests</div>
      </NavLink>
     </div>

     <div className="menuItem">
      <NavLink to="/ViewRequests" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <AiFillEye className='menuIcon'/>
      <div className='linkDesc'>View Requests</div>
      </NavLink>
     </div>

     <div className="menuItem">
      <NavLink to="/EmployeeNotifications" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <IoNotificationsSharp className='menuIcon'/>
      <div className='linkDesc'>Notifications</div>
      </NavLink>
     </div>

     <div className="menuItem">
      <NavLink to="/Receipts" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <IoReceiptSharp className='menuIcon'/>
      <div className='linkDesc'>Receipts</div>
      </NavLink>
     </div>

     <div className="menuItem">
      <NavLink to="/LandingPage" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <IoLogOut className='menuIcon'/>
       <div className='linkDesc'>Logout</div>
      </NavLink>
     </div>

    </div>
    </div>
  )
}

export default EmployeeSidebar