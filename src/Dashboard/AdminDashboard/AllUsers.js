import React, {useState} from 'react';
import AdminSidebar from '../../Components/AdminSidebar';

const AllUsers = () => {
  const notificationsTabs = [
    {
      id: 1,
      notificationTabName: "Employees",
    },
    {
      id: 2,
      notificationTabName: "Accountant",
    },
    {
      id: 3,
      notificationTabName: "Finance Manager",
    }
  ];
  const [activeNotifTab, setActiveNotifTab] = useState(notificationsTabs[0].id);

  return (
    <div>
      <AdminSidebar/>
      <div className='allUsers'>
      <h3>All Users</h3>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllUsers