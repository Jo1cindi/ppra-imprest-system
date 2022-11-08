import React from 'react'
import FinanceManagerSidebar from '../../Components/FinanceManagerSidebar'
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from 'axios';
import { useEffect, useState } from 'react';


const History = () => {
   
  const [requestHistory, setrequestHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const fundApprovalHistory = () =>{
    axios("https://ppra-api.herokuapp.com/api/approve-reject-requests-history").then((response)=>{
      console.log(response)
      setrequestHistory(response.data)
      setLoading(true)
    }).catch((error)=>{
      console.log(error)
    })
  }

  //Loading the finane manager history
  useEffect(()=>{
    fundApprovalHistory()
  },[])

  
  const showHistory = () =>{
    if(loading){
      return (
        <div className="fmHistory">
          <h3>Request Approval/Rejection History</h3>
          <div className='requestItems'>
            {
              requestHistory.map((request, index)=>(
               <div className="historyItems" key={index}>
               <div className="requestDetails">
                    <p>You <strong>{request.status}</strong> request number {request.request_id + 5}</p>
                </div>
               </div>
              ))
            }
          </div>
        </div>
      )
    }else if(requestHistory.length === 0){
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