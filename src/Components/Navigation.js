import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';


const Navigation = () => {
//Nagivation to Register page
 const navigate = useNavigate()

 const Register = ()=>{
  navigate("/Register")
 }
 const Login = () =>{
  navigate("/Login")
 }
  return (
    <div className="Navigation">
     <div className='logo'>
      <Logo/>
     </div>
    
     <div className='NavBtns'>
     <input type= "submit" value="Login" className='loginBtn' onClick={Login}/>
     <input type="submit" value="Register" onClick={Register} className="registerBtn"/>
     </div>
    </div>
  )
}

export default Navigation