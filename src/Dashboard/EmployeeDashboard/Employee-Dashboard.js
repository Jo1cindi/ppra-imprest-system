import React from 'react'
import "../DashboardStyles.css"
import EmployeeSidebar from '../../Components/EmployeeSidebar'

const EmployeeDashboard = () => {
  return (
    <div className="employeeDashboard">
     <EmployeeSidebar/>
     <div className='employeeDashobardContent'>
      Employee Dashboard
     </div>
    </div>
  )
}

export default EmployeeDashboard