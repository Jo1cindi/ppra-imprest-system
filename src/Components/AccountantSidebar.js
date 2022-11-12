import React, {useState, useEffect} from 'react'
import "../Dashboard/DashboardStyles.css";
import LogoLight from './LogoLight';
import {RiFundsFill} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5'
import { FaBook} from 'react-icons/fa'
import axios from 'axios';

const AccountantSidebar = () => {
     // User Name
const [userName, setUserName] = useState({})
const name = userName.firstName + ' ' + userName.lastName

useEffect(()=>{
  axios({
    method: "post",
    url: "https://ppra-api.herokuapp.com/api/accountant-data",
    data: {email: localStorage.getItem("email")},
    headers: { "Content-Type": "application/json" }
  }).then((response)=>{
    console.log(response)
    setUserName(response.data)
  }).catch((error)=>{
    console.log(error)
  })
}, [])
    
    const welcome = "Welcome to Accountant's View"
  return (
    <div>
      <div className='fmSidebar'>
    <LogoLight/>
    <div className = "accName">
      <div className = "greeting">
        <p>{welcome}</p>
      </div>
      <div className= "accname">
        <p>{name}</p>
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