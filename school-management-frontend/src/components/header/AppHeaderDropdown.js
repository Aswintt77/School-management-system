import React from 'react';
import { CButton } from '@coreui/react';

const AppHeaderDropdown = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <CButton color="danger" onClick={handleLogout}>
      Logout
    </CButton>
  );
};

export default AppHeaderDropdown;
