import React from 'react'
import EmployeeSidebar from '../../Components/EmployeeSidebar'
import Animation from "../../Images/EmptyRec.json"
import Lottie from "react-lottie-player";

const EmployeeNotifications = () => {
   
  const notifications = ""
  const showNotifications  = () =>{
    if(notifications){
      return(
        <div className='employeeNotificationsPage'>

        </div>
      )
    }else{
      return(
        <div className='emptyNotPage'>
         <div className="reqnotAnimation">
          <Lottie
              loop
              animationData={Animation}
              play
            />
          </div>
          <div className='emptyNotPageCard'>
           <h4>You do not have any notifications yet.</h4>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="employeeNotifications">
     <EmployeeSidebar/>
     <div className='employeeNotifContent'>
      {showNotifications()}
     </div>
    </div>
  )
}

export default EmployeeNotifications