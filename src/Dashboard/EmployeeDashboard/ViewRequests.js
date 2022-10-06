import React from 'react'
import EmployeeSidebar from '../../Components/EmployeeSidebar'
import Animation from "../../Images/EmptyRec.json"
import Lottie from "react-lottie-player";

const ViewRequests = () => {
  const request = ""
  const showRequests = () =>{
    if(request){
      return(
        <div className='requestsPage'></div>
      )
    }else{
      return(
        <div className='emptyRequestPage'>
          <div className="reqnotAnimation">
          <Lottie
              loop
              animationData={Animation}
              play
            />
          </div>
          <div className='emptyReqPageCard'>
           <h4>You have not made any requests yet.</h4>
          </div>
        </div>
      )
    }
  }
return (
    <div className="viewRequests">
     <EmployeeSidebar/>
     <div className='viewRequestsContent'>
      {showRequests()}
     </div>
    </div>
  )
}

export default ViewRequests