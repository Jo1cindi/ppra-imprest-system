import React from 'react'
import CompanyLogo from "../Images/logoDark.svg"

const Logo = () => {
  return (
    <div className="logo-box">
    <img alt='logo' src={CompanyLogo}/>
    </div>
  )
}

export default Logo