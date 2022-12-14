import React from 'react'
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {RiFundsFill} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5'
import { FaBook} from 'react-icons/fa'


const AccountantSidebar = () => {
    
    const welcome = "Welcome to Accountant's View"
  return (
    <div>
      <div className='fmSidebar'>
    <LogoLight/>
    <div className = "accName">
      <div className = "greeting">
        <p>{welcome}</p>
      </div>
    </div>
    <div className="accmenu">

     <div className="accmenuItem">
      <NavLink to="/AccountantDashboard" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <RiFundsFill className='menuIcon'/>
      <div className='linkDesc'>Allocate Funds</div>
      </NavLink>
     </div>
     
  
     <div className="accmenuItem">
      <NavLink to="/PettyCashBook" className={({isActive})=> isActive ? "activeNavlink" : "inactiveNavlink"}>
      <FaBook className='menuIcon'/>
      <div className='linkDesc'>Petty Cash Book</div>
      </NavLink>
     </div>


     <div className="accmenuItem">
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