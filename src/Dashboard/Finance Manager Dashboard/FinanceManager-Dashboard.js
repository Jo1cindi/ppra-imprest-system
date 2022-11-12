import React, { useEffect, useState } from "react";
import FinanceManagerSidebar from "../../Components/FinanceManagerSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const FinanceManagerDashboard = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState([]);
  const [requestDetailsWindow, setRequestDetailsWindow] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState()
  const [orderedRequests, setOrderedRequests] = useState("")
  const [numberOfRequests, setNumberOfRequest] = useState("")
  const [disableApprovalBtn, setDisableApprovalBtn] = useState(false)
  const [disableDenialBtn, setDisableDenialBtn] = useState(false)
  const approved = "approved"
  const denied = "denied"
 
  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(receivedRequests);
  const fetchRequests = () => {
    axios("https://ppra-api.herokuapp.com/api/received-requests")
      .then((response) => {
        if (response.status === 200) {
          setReceivedRequests(response.data);
          console.log(response);
        }
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{
    setOrderedRequests(receivedRequests.reverse());
    setNumberOfRequest(receivedRequests.length)
    localStorage.setItem("numberOfRequests", numberOfRequests);
  }, [receivedRequests, numberOfRequests])
  
  console.log(orderedRequests)
  
  //Request Details
  useEffect(() => {
    if (requestDetailsWindow) {
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/get-request-details",
        data: {requestId: requestId,
               employeeId: employeeId,},
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            console.log(response.data);
            setRequestDetails(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [requestDetailsWindow, employeeId, requestId]);

  const closeRequestDetails = () =>{
    setRequestDetailsWindow(false)
  }

  


  //Approve Request
  const approveRequest = () =>{
    axios({
      method: "put",
      url: "https://ppra-api.herokuapp.com/api/approve-request",
      data: {approved: approved, requestId: requestId},
      headers: {"Content-Type": "application/json"}
    }).then((response)=>{
       console.log(response)
       setDisableApprovalBtn(true)
       setDisableDenialBtn(true)
    }).catch((error)=>{
      console.log(error)
    })
  }


  //Deny Requests
  const denyRequest = () =>{
    setDisableDenialBtn(true)
    setDisableApprovalBtn(true)
    axios({
      method: "put",
      url: "https://ppra-api.herokuapp.com/api/deny-request",
      data: {denied: denied, requestId: requestId},
      headers: {"Content-Type": "application/json"}
    }).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const showReceivedRequests = () => {
    if (loading) {
      return (
        <>
          {requestDetailsWindow && (
            <div className="receivedRequestDetails">
              <div className="blurrybg"></div>
              <div className="requestDetailsCard">
                <div className="closeWindow">
                  <IoCloseSharp onClick={closeRequestDetails} className="closeWindowIcon"/>
                </div>
                <div className="requestorDetails">
                  <h5 className="detailsTitle">The Request Details</h5>
                  <div className="requestorName">
                   <h5>Requestor's Name:</h5>
                   <p>{requestDetails.firstName + ' ' + requestDetails.lastName}</p>
                  </div>
                  <div className="requestorDepartment">
                  <h5>Requestor's Department:</h5>
                  <p>{requestDetails.department} department</p>
                  </div>
                  <div className="requestedAmount">
                  <h5>Amount Requested:</h5>
                  <p> Kes {requestDetails.amount}</p>
                  </div>
                  <div className="requestReason">
                  <h5>Reason for Request:</h5>
                  <p>{requestDetails.reason}</p>
                  </div>
                  <div className="dateRequestSent">
                  <h5>Requested on:</h5>
                  <p>{date}</p>
                  </div>
                </div>
                <div className="approveRejectButtons">
                  <input type="submit" value="Deny Request" className="denyBtn" onClick={denyRequest} disabled={disableDenialBtn}/>
                  <input type="submit" value="Approve Request" className="approveBtn" onClick={approveRequest} disabled={disableApprovalBtn}/>
                </div>
              </div>
            </div>
          )}
          <div className="receivedRequests">
            <div className="receivedRequestsTitle">
              <h4>Received Requests</h4>
            </div>
            <div className="receivedRequestItems">
              {receivedRequests.reverse().map((receivedRequest, index) => (
                <div className="receivedRequest" key={index}>
                  <div className="requestNumber">
                    Request Number #{receivedRequest.request_id + 5} sent on{" "}
                    {receivedRequest.request_date}
                  </div>
                  <input
                    type="submit"
                    value="Details"
                    onClick={() => {
                      setRequestDetailsWindow(true);
                      setRequestId(receivedRequest.request_id);
                      setEmployeeId(receivedRequest.employee_id);
                      setDate(receivedRequest.request_date)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (receivedRequests.length === 0) {
      
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
  };

  return (
    <div className="fmDashboard">
      <FinanceManagerSidebar />
      <div className="fmDashboardContent">{showReceivedRequests()}</div>
    </div>
  );
};

export default FinanceManagerDashboard;
