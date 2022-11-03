import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const EmployeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfNotifications, setNumberOfNotifications] = useState();
  const [accountantNotifications, setAccountantNotifications] = useState([])

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

  useEffect(() => {
    setNumberOfNotifications(notifications.length);
    localStorage.setItem("numberOfNotifications", numberOfNotifications);
    loadViewedNotifications();
  }, [notifications.length, numberOfNotifications]);

  const loadViewedNotifications = () => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/viewed-notifications",
      data: { email: localStorage.getItem("email") },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setViewedNotifications(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Loading viewedNotifications
  const notificationsTabs = [
    {
      id: 1,
      notificationTabName: "Requests Feedback",
    },
    {
      id: 2,
      notificationTabName: "Funds Received",
    },
  ];
  const [activeNotifTab, setActiveNotifTab] = useState(notificationsTabs[0].id);
  const showNotifications = () => {
    if (loading) {
      return (
        <div className="employeeNotificationsPage">
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
                  })
                    .then((response) => {
                      console.log(response);
                      console.log(notification.request_id);
                    })
                    .catch((error) => {
                      console.log(error);
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

            {viewedNotifications.map((viewedNotification, index) => (
              <div className="viewedNotif" key={index}>
                <div className="notifIcon">
                  {viewedNotification.status === "approved" ? (
                    <AiFillCheckCircle className="approvedIcon" />
                  ) : (
                    <ImCross className="rejectIcon" />
                  )}
                </div>
                <p className="notifDetails">
                  Your Request for Kes {viewedNotification.amount_requested} has
                  been <strong>{viewedNotification.status}</strong> by the
                  Finance Manager
                </p>
              </div>
            ))}
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

  //Loading Notifications from the accountant
  useEffect(()=>{
    loadAccountantNotifications()
  }, [])
  const loadAccountantNotifications  = () =>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/allocation-of-funds-notifications",
      data: {email: localStorage.getItem("email")},
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      console.log("accountant notifications", response)
    }).catch((error)=>{
      console.log(error)
    })
  }
  const showAccountantNotifications = () => {
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
  };

  return (
    <div className="employeeNotifications">
      <EmployeeSidebar />
      <div className="employeeNotifContent">
        <h3>All Notifications</h3>
        <div className="notificationTabs">
          {notificationsTabs.map((notificationTab, index) => (
            <div
              className={
                activeNotifTab === notificationTab.id
                  ? "activeTab"
                  : "inactiveTab"
              }
              key={index}
              onClick={()=> setActiveNotifTab(notificationTab.id)}
            >
              <p>{notificationTab.notificationTabName}</p>
            </div>
          ))}
        </div>
        {activeNotifTab === notificationsTabs[0].id
          ? showNotifications()
          : showAccountantNotifications()}
      </div>
    </div>
  );
};

export default EmployeeNotifications;
