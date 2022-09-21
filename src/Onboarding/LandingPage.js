import React from 'react'
import Illustration from "../Images/LandingPageIllustration.svg"
import Navigation from "../Components/Navigation"
import {AiFillCheckCircle} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
const navigate = useNavigate()  
const getStarted = () =>{
  navigate("/Register")
}  
return (
    <div>
        <Navigation/>
        <div className="landingPage">
          <div className="landingPageTxt">
          <div className='textBox'>
           <h3>Easy Petty Cash Management!</h3> 
          </div>
          <div className='smallerText'>
           <p style={{color: "#000000"}}><AiFillCheckCircle color='#630000'/> Get Petty Cash Requests Easily </p>
           <p style={{color: "#000000"}}><AiFillCheckCircle color='#630000'/> Get Petty Cash Approval Easily </p>
           <p style={{color: "#000000"}}><AiFillCheckCircle color='#630000'/> Generate Petty Cash Reports Easily </p>
          </div>
          <div className = "getStartedBtn">
            <input type="submit" value="Get Started" onClick={getStarted}/>
          </div>

          </div>
          <div className="landingPageImage">
          <img src={Illustration} alt="Illustration"/>
          </div>
        </div>
    </div>
  )
}

export default LandingPage