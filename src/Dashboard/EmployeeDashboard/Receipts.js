import React from 'react'
import EmployeeSidebar from '../../Components/EmployeeSidebar';
import Animation from "../../Images/EmptyReqNot.json"
import Lottie from "react-lottie-player";

const Receipts = () => {
  
  const receipts = ""
  const showReceipts = () =>{
    if(receipts){
      return(
        <div className='viewReceipts'>
         
        </div>
      )
    }else{
      return(
        <div className='emptyReceiptsPage'>
         <div className="recAnimation">
          <Lottie
              loop
              animationData={Animation}
              play
            />
          </div>
          <div className='emptyRecPageCard'>
           <h4>You do not received any receipts yet.</h4>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className= "receipts">
     <EmployeeSidebar/>
     <div className='receiptsContent'>
       {showReceipts()}
     </div>
    </div>
  )
}

export default Receipts;