import React, {useEffect, useState} from 'react';
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {MdRequestPage} from 'react-icons/md';
import {AiFillEye} from 'react-icons/ai';
import {IoNotificationsSharp, IoReceiptSharp, IoLogOut} from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import axios from 'axios';



const EmployeeSidebar = () => {
  // User Name
const [userName, setUserName] = useState({})
const name = userName.firstName + ' ' + userName.lastName



  useEffect(()=>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/employee-data",
      data: {email: localStorage.getItem("email")},
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      console.log(response)
      setUserName(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])

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

 //total number of notifications
 const numberOfNotifications = localStorage.getItem("numberOfNotifications")
 const numberOfAccountantNotifications = localStorage.getItem("numberOfAccountantNotifications")
 const totalNotifications = parseInt(numberOfAccountantNotifications, 10) + parseInt(numberOfNotifications, 10)
 

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
      <div className="totalNotifications">
       <p>{totalNotifications}</p>
      </div>
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