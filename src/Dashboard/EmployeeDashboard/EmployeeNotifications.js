import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Animation from "../../Images/EmptyRec.json";
import Lottie from "react-lottie-player";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { RiMoneyDollarCircleFill } from "react-icons/ri";



const EmployeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfNotifications, setNumberOfNotifications] = useState();
  const [accountantNotifications, setAccountantNotifications] = useState([])
  const [numberOfAccountantNotifications, setNumberOfAccountantNotifications] = useState()
  const [viewedAccountantNotifications, setViewedAccountantNotification] = useState([])

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
    localStorage.setItem("numberOfAccountantNotifications", numberOfAccountantNotifications);
    loadViewedNotifications();
  }, [notifications.length, numberOfNotifications, numberOfAccountantNotifications]);


  //Loading viewed notification from the finance manager
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

  //Notification Tabs
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

  //Loading Notifications for request approval/rejections
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
    setNumberOfAccountantNotifications(accountantNotifications.length)
    loadAccountantNotifications()
    loadViewedAccountantNotifications()
  }, [accountantNotifications.length])

  //Functions to show the number of notifications an employee has received
  const showNumberofNotifications  = () =>{
    if(numberOfNotifications > 0){
      return (
        <div className= {activeNotifTab === notificationsTabs[0].id ? "activeNotificationsNo": "inactiveNotificationsNo"}>
          <p>{numberOfNotifications}</p>
        </div>
      )
    }
  }
  const showNumberOfAccountantNotifications = () =>{
    if(numberOfAccountantNotifications > 0){
      return (
        <div className={activeNotifTab === notificationsTabs[1].id ? "activeNotificationsNo": "inactiveNotificationsNo"}>
          <p>{numberOfAccountantNotifications}</p>
        </div>
      )
    }
  }

 
  //Loading Notifications fromthe accountant
  const loadAccountantNotifications  = () =>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/allocation-of-funds-notifications",
      data: {email: localStorage.getItem("email")},
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      console.log("accountant notifications", response)
      setAccountantNotifications(response.data)
      setLoading(true)
    }).catch((error)=>{
      console.log(error)
    })
  }

  //Loading viewed notifications from the accountant
  const loadViewedAccountantNotifications = () =>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/viewed-allocation-notifications",
      data: {email: localStorage.getItem("email")},
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      console.log(response)
      setViewedAccountantNotification(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
 
  //Loading notifications from the accountant
  const showAccountantNotifications = () => {
    if(loading){
      return (
        <div className="employeeNotificationsPage">
          <div className="allNotification">
            {
              accountantNotifications.map((notification, index)=>(
                <div className="notification" key={index} onClick={()=>{
                  axios({
                    method: "post",
                    url: "https://ppra-api.herokuapp.com/api/view-allocation-notification",
                    data: {requestId: notification.request_id,
                           viewed: "viewed"
                    },
                    headers: { "Content-Type": "application/json" }
                  }).then((response)=>{
                    console.log(response)
                  }).catch((error)=>{
                    console.log(error)
                  })
                }}>
                  <div className="notifIcon">
                   <RiMoneyDollarCircleFill className="approvedIcon"/>
                  </div>
                  <p className="notifDetails">
                   You have received <strong>Kes {notification.amount_requested}</strong> from the accountant for a request you sent on {notification.request_date} 
                  </p>
                </div>
              ))
            }
            {
              viewedAccountantNotifications.map((viewedNotification, index)=>(
                <div className="viewedNotif" key={index}>
                  <div className="notifIcon">
                  <RiMoneyDollarCircleFill className="approvedIcon"/>
                  </div>
                  <div className= "notifDetails">
                  You have received <strong>Kes {viewedNotification.amount_requested}</strong> from the accountant for a request you sent on {viewedNotification.request_date}
                  </div>
                </div>
              ))
            }
            
          </div>
        </div>
      )
    } else if(accountantNotifications.length === 0){
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
              <h4>{notificationTab.notificationTabName}</h4>
                {
                  notificationTab.id === 1 ?  showNumberofNotifications() : showNumberOfAccountantNotifications()
                }
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
