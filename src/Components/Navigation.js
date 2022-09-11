import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';


const Navigation = () => {
//Nagivation to Register page
 const navigate = useNavigate()

 const handleClick = ()=>{
  navigate("/Register")
 }

  return (
    <div className="Navigation">
     <div className='logo'>
      <Logo/>
     </div>
     <div className='Nav-Links'>
     <input type= "submit" value="Login" className='loginBtn'/>
     <input type="submit" value="Register" onClick={handleClick} className="registerBtn"/>
     </div>
    </div>
  )
}

export default Navigation