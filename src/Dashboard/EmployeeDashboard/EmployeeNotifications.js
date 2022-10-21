import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const EmployeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const[viewedNotifications, setViewedNotifications] = useState([])
  const [loading, setLoading] = useState(false);

  //Loading Notifications
  useEffect(() => {
    loadNotifications();
  }, []);
  const loadNotifications = () => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/load-notifications",
      data: { email: localStorage.getItem("email") },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setNotifications(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{
    loadViewedNotifications()
  }, [])
  const loadViewedNotifications = () =>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/viewed-notifications",
      data: { email: localStorage.getItem("email") },
      headers: { "Content-Type": "application/json" },
    }).then((response)=>{
      console.log(response)
      setViewedNotifications(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  //Loading viewedNotifications
  const showNotifications = () => {
    if (loading) {
      return (
        <div className="employeeNotificationsPage">
          <h3>All Notifications</h3>
          <div className="allNotifications">
            {notifications.map((notification, index) => (
              <div
                className="notification"
                key={index}
                onClick={() =>
                  axios({
                    method: "post",
                    url: "https://ppra-api.herokuapp.com/api/view-notification",
                    data: {
                      viewed: "viewed",
                      requestId: notification.request_id,
                    },
                    headers: { "Content-Type": "application/json" },
                  }).then((response)=>{
                    console.log(response)
                    console.log(notification.request_id)
                  }).catch((error)=>{
                    console.log(error)
                  })
                }
              >
                <div className="notifIcon">
                  {notification.status === "approved" ? (
                    <AiFillCheckCircle className="approvedIcon" />
                  ) : (
                    <ImCross className="rejectIcon" />
                  )}
                </div>
                <p className="notifDetails">
                  Your Request for Kes {notification.amount_requested} has been{" "}
                  <strong>{notification.status}</strong> by the Finance Manager
                </p>
              </div>
            ))}

            {
              viewedNotifications.map((viewedNotification, index)=>(
                <div className="viewedNotif" key={index}>
                <div className="notifIcon">
                  {viewedNotification.status === "approved" ? (
                    <AiFillCheckCircle className="approvedIcon" />
                  ) : (
                    <ImCross className="rejectIcon" />
                  )}
                </div>
                <p className="notifDetails">
                  Your Request for Kes {viewedNotification.amount_requested} has been{" "}
                  <strong>{viewedNotification.status}</strong> by the Finance Manager
                </p>
                </div>
              ))
            }
          </div>
        </div>
      );
    } else if (notifications.length === 0) {
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
    <div className="employeeNotifications">
      <EmployeeSidebar />
      <div className="employeeNotifContent">{showNotifications()}</div>
    </div>
  );
};

export default EmployeeNotifications;
