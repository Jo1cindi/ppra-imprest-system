import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/view-requests",
      data: { email: localStorage.getItem("email") },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          setRequests(response.data.data);
          setLoading(true)
        }
        console.log(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
 

  const showRequests = () => {
    if (loading && requests.length > 0) {
      return (
        <div className="employeeRequestsPage">
          <div className="space"></div>
          <div className="requestItems">
            {
              requests.map((request, index)=>(
                <div className="request" key={index}>
                  <div className="requestTitle">
                    <AiFillCheckCircle className="requestIcon"/>
                    <h3>Request sent successfully!</h3>
                  </div>
                  <div className="requestDetails">
                    <p>Reason for request: {request.reason} <br/>Amount requested: ksh {request.amount_requested}</p>
                    <p className="request-time">Sent on {request.request_date} at {request.request_time}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      );
    } else if (requests.length === 0) {
      return (
        <div className="emptyRequestPage">
          <div className="reqnotAnimation">
            <Lottie loop animationData={Animation} play />
          </div>
          <div className="emptyReqPageCard">
            <h4>You have not made any requests yet.</h4>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="viewRequests">
      <EmployeeSidebar />
      <div className="viewRequestsContent">{showRequests()}</div>
    </div>
  );
};

export default ViewRequests;
