import React from 'react';
import Logo from './Logo';
import { useNavigate, Link } from 'react-router-dom';


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
    
     <div className='Nav-Links'>
     <div className='aboutLinks'>
      <ul>
        <li>
          <Link path to="" className='navlink'>About us</Link>
        </li>
        <li>
          <Link path to="" className='navlink'>Contact</Link>
        </li>
        <li>
          <Link path to="" className='navlink'>Support</Link>
        </li>
      </ul>
     </div>
     <div className='NavBtns'>
     <input type= "submit" value="Login" className='loginBtn' onClick={Login}/>
     <input type="submit" value="Register" onClick={Register} className="registerBtn"/>
     </div>
     </div>
    </div>
  )
}

export default Navigation