import React, {useState, useEffect} from 'react';
import AdminSidebar from '../../Components/AdminSidebar';
import axios from 'axios';

const AllUsers = () => {

  const [employees, setEmployees] = useState([])
  const [accountant, setAccountant] = useState([])
  const [financeManager, setFinanceManager] = useState([])

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

  //Load Employee List
  const employeeList = () =>{
    axios("https://ppra-api.herokuapp.com/api/all-employees").then((response)=>{
       console.log(response)
       setEmployees(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    employeeList()
  }, [])

  //Rendering employee list
  const showAllEmployees = () =>{
    return (
      <div className="employeeList">
          <ul>
            <li>
              <div className="employeeTableTitles"><p>First Name</p></div>
              <div className='employeesFirstName'>
                {
                  employees.map((employee, index)=>(
                    <p key={index}>{employee.firstName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Last Name</p></div>
              <div className='employeesLastName'>
                {
                  employees.map((employee, index)=>(
                    <p key={index}>{employee.lastName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Department</p></div>
              <div className='employeesDepartment'>
                {
                  employees.map((employee, index)=>(
                    <p key={index}>{employee.department}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Email</p></div>
              <div className='employeesEmail'>
                {
                  employees.map((employee, index)=>(
                    <p key={index}>{employee.email}</p>
                  ))
                }
              </div>
            </li>
            
          </ul>
      </div>
    )  
  }

  //Loading Accountant List
  const accountantList =()=>{
    axios("https://ppra-api.herokuapp.com/api/financeManager").then((response)=>{
      console.log(response)
      setFinanceManager(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    accountantList()
  }, [])

  const showAccountant = () =>{
   return (
    <div className='accountantList'>
     <ul>
            <li>
              <div className="employeeTableTitles"><p>First Name</p></div>
              <div className='accountantFirstName'>
                {
                  accountant.map((accountant, index)=>(
                    <p key={index}>{accountant.firstName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Last Name</p></div>
              <div className='accountantLastName'>
                {
                  accountant.map((accountant, index)=>(
                    <p key={index}>{accountant.lastName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Email</p></div>
              <div className='accountantEmail'>
                {
                  accountant.map((accountant, index)=>(
                    <p key={index}>{accountant.email}</p>
                  ))
                }
              </div>
            </li>
            
          </ul>
    </div>
   )
  }


  //Finance Manager
  const financeManagerList =()=>{
    axios("https://ppra-api.herokuapp.com/api/all-accountants").then((response)=>{
      console.log(response)
      setAccountant(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    financeManagerList()
  }, [])

  const showFinanceManager = () =>{
   return (
     <div className='accountantList'>
     <ul>
            <li>
              <div className="employeeTableTitles"><p>First Name</p></div>
              <div className='accountantFirstName'>
                {
                  financeManager.map((financeManager, index)=>(
                    <p key={index}>{financeManager.firstName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Last Name</p></div>
              <div className='accountantLastName'>
                {
                  financeManager.map((financeManager, index)=>(
                    <p key={index}>{financeManager.lastName}</p>
                  ))
                }
              </div>
            </li>
            <li>
              <div className="employeeTableTitles"><p>Email</p></div>
              <div className='accountantEmail'>
                {
                  financeManager.map((financeManager, index)=>(
                    <p key={index}>{financeManager.email}</p>
                  ))
                }
              </div>
            </li>
            
          </ul>
    </div>
   )
  }
  

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
        {
          activeNotifTab === notificationsTabs[0].id ? showAllEmployees()
          : activeNotifTab === notificationsTabs[1].id ? showAccountant()
          : showFinanceManager()
        }
      </div>
    </div>
  )
}

export default AllUsers