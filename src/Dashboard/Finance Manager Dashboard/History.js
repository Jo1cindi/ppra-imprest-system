import React from 'react'
import FinanceManagerSidebar from '../../Components/FinanceManagerSidebar'
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";


const History = () => {
  

  const showHistory = () =>{
    return (
      <div className="emptyFmRequestPage">
      <div className="reqnotAnimation">
        <Lottie loop animationData={Animation} play />
      </div>
      <div className="emptyReqPageCard">
        <h4>Nothing to show yet.</h4>
      </div>
    </div>
    )
  }

  return (
    <div className='requestsHistory'>
      <FinanceManagerSidebar/>
      <div className='requestHistoryContent'>
        {showHistory()}
      </div>
    </div>
  )
}

export default History