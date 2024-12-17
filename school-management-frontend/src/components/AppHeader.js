import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import {cilUser, cilSchool } from '@coreui/icons';

const AppHeader = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
    // Example: Clear session and redirect to login
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
      {/* App Name with Icon */}
      <div className="d-flex align-items-center">
      <CIcon icon={cilSchool} className="me-2" style={{ fontSize: '48px' }} />
        <h4 className="mb-0">School Management System</h4>
      </div>

      {/* Logout Button */}
      <button className="btn btn-danger d-flex align-items-center" onClick={handleLogout}>
        <CIcon icon={cilLockLocked} className="me-2" />
        Logout
      </button>
    </header>
  );
};

export default AppHeader;
