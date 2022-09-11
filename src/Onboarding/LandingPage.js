import React from 'react'
import Illustration from "../Images/LandingPageIllustration.svg"
import Navigation from "../Components/Navigation"



const LandingPage = () => {
 
  return (
    <div>
        <Navigation/>
        <div className="landingPage">
          <div className="landingPageTxt">
          <div className='backgroundImg'>
          <div className='textBox'>
            <h3>Welcome to the PPRA Imprest (Petty Cash) System</h3>
          </div>
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