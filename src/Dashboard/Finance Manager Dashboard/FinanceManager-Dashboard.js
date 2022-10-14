import React, { useEffect, useState } from "react";
import FinanceManagerSidebar from "../../Components/FinanceManagerSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from "axios";

const FinanceManagerDashboard = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState([]);
  const [requestDetailsWindow, setRequestDetailsWindow] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
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
          console.log(response.data);
          const numberOfRequests = response.data.length;
          console.log(numberOfRequests);
          localStorage.setItem("numberOfRequests", numberOfRequests);
        }
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

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

  console.log("request Id", requestId);
  console.log("employee Id", employeeId);
  console.log("details", requestDetails);

  const showReceivedRequests = () => {
    if (loading) {
      return (
        <>
          {requestDetailsWindow && (
            <div className="receivedRequestDetails">
              <div className="blurrybg"></div>
              <div className="requestDetailsCard"></div>
            </div>
          )}
          <div className="receivedRequests">
            <div className="receivedRequestsTitle">
              <h4>Received Requests</h4>
            </div>
            <div className="receivedRequestItems">
              {receivedRequests.map((receivedRequest, index) => (
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
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (receivedRequests.length > 0) {
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
