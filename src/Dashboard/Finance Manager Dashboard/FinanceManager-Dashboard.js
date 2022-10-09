import React from 'react';
import FinanceManagerSidebar from '../../Components/FinanceManagerSidebar';
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";


const FinanceManagerDashboard = () => {

  const showReceivedRequests = () =>{
    return (
      <div className="emptyFmRequestPage">
          <div className="reqnotAnimation">
            <Lottie loop animationData={Animation} play />
          </div>
          <div className="emptyReqPageCard">
            <h4>You have not received any requests yet.</h4>
          </div>
        </div>
      );
  }

  return (
   <div className='fmDashboard'>
     <FinanceManagerSidebar/>
     <div className='fmDashboardContent'>
      {showReceivedRequests()}
     </div>
    </div>
  )
}

export default FinanceManagerDashboard