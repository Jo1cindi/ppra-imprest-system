import React from 'react'
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {BsClockHistory} from 'react-icons/bs';
import {RiFundsFill} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { IoLogOut, IoNotifications} from 'react-icons/io5'

const AccountantSidebar = () => {
    const userFirstName = localStorage.getItem("firstName")
    const userLastName = localStorage.getItem("lastName")
    const name = userFirstName + ' ' +userLastName
    
    const welcome = "Welcome to Accountant's View"
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
      <NavLink to="/AccountantDashboard" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <IoNotifications className='menuIcon'/>
      <div className='linkDesc'>Notifications</div>
      </NavLink>
     </div>
     
     <div className="fmmenuItem">
      <NavLink to="/History" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <RiFundsFill className='menuIcon'/>
      <div className='linkDesc'>Allocate Funds</div>
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

export default AccountantSidebar