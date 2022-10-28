import React, { useState } from "react";
import AccountantSidebar from "../../Components/AccountantSidebar";
import Lottie from "react-lottie-player";
import Animation from "../../Images/EmptyRec.json";
import axios from "axios";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

const AccountantDashboard = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvedRequestDetailsWindow, setAprovedRequestDetailsWindow] = useState(false)
  const [employeeId, setEmployeeId] = useState()
  const [approvedRequestDetails, setApprovedRequestDetails] = useState([])
  const [amount, setAmount] = useState()
  const [date,setDate] = useState()


  //Getting approved requests from database
  useEffect(() => {
    showApprovedRequests()
  }, []);
  const showApprovedRequests = () => {
    axios("https://ppra-api.herokuapp.com/api/accountant-notifications")
      .then((response) => {
        console.log(response);
        setApprovedRequests(response.data.reverse());
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  //Retreiving request details
  useEffect(()=>{
    if(approvedRequestDetailsWindow){
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/approved-request-details",
        data: {employeeId: employeeId},
        headers: { "Content-Type": "application/json" }
      }).then((response)=>{
        console.log(response)
        setApprovedRequestDetails(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }, [approvedRequestDetailsWindow, employeeId])


  console.log(approvedRequests);
  
  //Loading Notifications
  const showNotifications = () => {
    if (loading) {
      return (
        <> 
          {
            approvedRequestDetailsWindow && (
              <div className="approvedRequestsDetailsWindow">
              <div className="approvedRequestsCard">
                <div className="approvedRequestsCardTitle">
                  <IoCloseSharp onClick={()=> setAprovedRequestDetailsWindow(false)} className="closeWindowIcon2"/>   
                  <h5>Request Details</h5>
                </div>
                <div className="approvedRequestName">
                  {approvedRequestDetails.firstName} {approvedRequestDetails.lastName} from the {approvedRequestDetails.department} department is requesting for funds
                </div>
                <div className="amountRequested">
                 <div className="amount2">KES {amount}.00</div>
                 <div className="date2"><p>Request sent on: {date}</p></div>
                </div>
                <input type="submit" value="Allocate Funds"/>
              </div>
              </div>
            )
          }
          <div className="allApprovedRequests">
          <h3>All Approved Requests</h3>
          <div className="approvedRequests">
            {approvedRequests.map((approvedRequest, index) => (
              <div className="approvedRequest" key={index}>
                <p>
                  {" "}
                  Request Number #{approvedRequest.request_id + 5} was{" "}
                  <strong>{approvedRequest.status} </strong>
                </p>
                <input type="submit" value="Details" onClick={()=> {
                  setAprovedRequestDetailsWindow(true)
                  setEmployeeId(approvedRequest.employee_id)
                  setAmount(approvedRequest.amount_requested)
                  setDate(approvedRequest.request_date)
                }}/>
              </div>
            ))}
          </div>
        </div>
        </>
      );
    } else if (approvedRequests.length === 0) {
      return (
        <div className="emptyNotPage">
          <div className="reqnotAnimation">
            <Lottie loop animationData={Animation} play />
          </div>
          <div className="emptyNotPageCard">
            <h4>You do not have any notifications yet.</h4>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="accountantNotifications">
      <AccountantSidebar />
      <div className="accountantNotifContent">{showNotifications()}</div>
    </div>
  );
};

export default AccountantDashboard;
