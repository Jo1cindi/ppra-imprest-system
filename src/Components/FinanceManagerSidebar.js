import React, {useState, useEffect} from 'react';
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {MdRequestPage} from 'react-icons/md';
import {BsClockHistory} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { IoLogOut} from 'react-icons/io5'
import axios from 'axios';

const FinanceManagerSidebar = () => {

  const [userName, setUserName] = useState({})
  const name = userName.firstName + ' ' + userName.lastName
  
   useEffect(()=>{
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/user-data",
        data: {email: localStorage.getItem("email")},
        headers: { "Content-Type": "application/json" }
      }).then((response)=>{
        console.log(response)
        setUserName(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    }, [])


  const numberOfRequests = localStorage.getItem('numberOfRequests')
  const displayNumberOfRequestsActive = () =>{
    if(numberOfRequests > 0){
      return (
        <div className='numberOfRequests'><p>{numberOfRequests}</p></div>
      )
    }
  }
  const displayNumberOfRequestsInactive=()=>{
    if(numberOfRequests > 0){
      return (
        <div className='numberOfRequestsInactive'><p>{numberOfRequests}</p></div>
      )
    }
  }
     
  const welcome = "Welcome to Finance Manager's View"
  return (
    <div>
      <div className='fmSidebar'>
    <LogoLight/>
    <div className = "fmName">
      <div className = "greeting">
        <p>{welcome}</p>
      </div>
      <div className= "name">
        <p>{name}</p>
      </div>
    </div>
    <div className="fmenu">

     <div className="fmmenuItem">
      <NavLink to="/FinanceManagerDashboard" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <MdRequestPage className='menuIcon'/>
      <div className='linkDesc'>Received Requests</div>
      { ({isActive})=> isActive ? displayNumberOfRequestsActive() : displayNumberOfRequestsInactive()}
      </NavLink>
     </div>

     <div className="fmmenuItem">
      <NavLink to="/History" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <BsClockHistory className='menuIcon'/>
      <div className='linkDesc'>History</div>
      </NavLink>
     </div>

     <div className="fmmenuItem">
      <NavLink to="/LandingPage" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <IoLogOut className='menuIcon'/>
       <div className='linkDesc'>Logout</div>
      </NavLink>
     </div>

    </div>
    </div>  
    </div>
  )
}

export default FinanceManagerSidebar;