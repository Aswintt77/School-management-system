import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from "@coreui/react";
import AppHeader from "../AppHeader";
import StudentTable from "../tables/studentTable";
import FeeTable from "../tables/feeTable";
import LibraryTable from "../tables/libraryTable";
import StaffTable from "../tables/staffTable";
import axios from "axios";

const AdminDashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [librarianCount, setLibrarianCount] = useState(0);

  useEffect(() => {
    // Fetch counts from the API (assuming endpoints exist)
    axios.get("http://localhost:5000/api/count/students")
      .then(response => setStudentCount(response.data.count))
      .catch(error => console.error("Error fetching student count", error));

    axios.get("http://localhost:5000/api/count/staff")
      .then(response => setStaffCount(response.data.count))
      .catch(error => console.error("Error fetching staff count", error));

    axios.get("http://localhost:5000/api/count/librarians")
      .then(response => setLibrarianCount(response.data.count))
      .catch(error => console.error("Error fetching librarian count", error));
  }, []);

  return (
    <>
      <AppHeader />
      {/* Main Dashboard Section */}
      <h2 style={{ textAlign: "center", marginBottom:'80px',marginTop:"20px" }}>Admin Dashboard</h2>

      {/* Header Section with Count Cards */}
      <CRow className="mb-4">
        <CCol sm="4">
          <CCard className="text-center">
            <CCardHeader>Staff</CCardHeader>
            <CCardBody>
              <h2>{staffCount}</h2>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="4">
          <CCard className="text-center">
            <CCardHeader>Students</CCardHeader>
            <CCardBody>
              <h2>{studentCount}</h2>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="4">
          <CCard className="text-center">
            <CCardHeader>Librarians</CCardHeader>
            <CCardBody>
              <h2>{librarianCount}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      

      <StaffTable />
      <StudentTable />
      <FeeTable />
      <LibraryTable />
    </>
  );
};

export default AdminDashboard;
