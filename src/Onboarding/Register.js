import React from 'react'
import Logo from '../Components/Logo'
import illustration from "../Images/signup.svg"
import {FaUserTie} from "react-icons/fa"

const Register = () => {
  return (
    <div className='registration'>
      <div className="registrationIllustration">
      <Logo/>
      <div className="regIllu">
       <img src={illustration} alt="sign up illustration"/>
      </div>
      </div>
      <div className='registrationForm'>
      <h3>Please Register Below</h3>
       <div className='avatars'>
        <div className='employeeAvatar'>
          <FaUserTie/>
        </div>
        <div className='accountantAvatar'>
          <FaUserTie/>
        </div>
        <div className='fmAvatar'>
          <FaUserTie/>
        </div>
       </div>
       <form>
        
       </form>
      </div>
    </div>
  )
}

export default Register