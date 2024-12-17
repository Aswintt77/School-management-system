import React from 'react'

import { useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import StaffDashboard from './StaffDashboard'
import LibrarianDashboard from './LibrarianDashboard'

const Dashboard = () => {

  const currentRole = useSelector((state)=>{

    return state.role
    
  });

  return (
    <> 
     {currentRole == "admin" && <AdminDashboard/>}
     {currentRole == "staff" && <StaffDashboard/>}
     {currentRole == "librarian" && <LibrarianDashboard/>}

    </>
  )
}

export default Dashboard
