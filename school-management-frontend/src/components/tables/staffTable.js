import React, { useState, useEffect } from "react";
import axiosInstance from '../../config/axiosConfig';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from "@coreui/react";

const StaffTable = () => {
  const [staffs, setStaffs] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    staffid: "",
    name: "",
    username: "",
    password: "",
    role: "",
    status: "",
  });
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  // Fetch staff data from API
  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/api/users/staff") // API endpoint for fetching staff
      .then((response) => {setStaffs(response.data)
        console.log(response);
        
      })
      
      .catch((error) => console.error("Error fetching staff data:", error));
  }, []);

  // Handle Add Modal Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Handle Edit Modal Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff({ ...currentStaff, [name]: value });
  };

  // Add a New Staff
  const handleAddStaff = () => {
    console.log(newStaff);
    
    axiosInstance
      .post("http://localhost:5000/api/users/staff", newStaff)
      .then((response) => {
        setStaffs([...staffs, response.data]);
        setNewStaff({ staffid: "", name: "", username: "", password: "", role: "", status: "" });
        setAddModalOpen(false);
      })
      .catch((error) => console.error("Error adding staff:", error));
  };
// Update Staff Details
const handleUpdateStaff = () => {
  if (!currentStaff._id) {  // Ensure the currentStaff has a valid _id
    console.error("Staff _id is missing");
    return;
  }

  axiosInstance
    .put(`http://localhost:5000/api/users/staff/${currentStaff._id}`, currentStaff)  // Use _id instead of id
    .then((response) => {
      setStaffs(staffs.map((staff) => (staff._id === response.data._id ? response.data : staff)));  // Use _id here as well
      setEditModalOpen(false);
      setCurrentStaff(null);
    })
    .catch((error) => console.error("Error updating staff:", error));
};


  // Confirm Deletion
const handleConfirmDelete = () => {
  if (!staffToDelete._id) {  // Ensure staffToDelete has a valid _id
    console.error("Staff _id is missing");
    return;
  }

  axiosInstance
    .delete(`http://localhost:5000/api/users/staff/${staffToDelete._id}`)  // Use _id instead of id
    .then(() => {
      setStaffs(staffs.filter((staff) => staff._id !== staffToDelete._id));  // Use _id here as well
      setConfirmModalOpen(false);
      setStaffToDelete(null);
    })
    .catch((error) => console.error("Error deleting staff:", error));
};


  // Open Edit Modal
  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setEditModalOpen(true);
  };

  // Open Confirm Delete Modal
  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
    setConfirmModalOpen(true);
  };

  return (
    <div>
      <h3>Staff Table</h3>

      {/* Add Button */}
      <CButton color="primary" onClick={() => setAddModalOpen(true)}>
        Add Staff
      </CButton>

      {/* Staff Table */}
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Staff ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {staffs.map((staff, i) => (
            <CTableRow key={i}>
              <CTableDataCell>{i + 1}</CTableDataCell>
              <CTableDataCell>{staff.staffid}</CTableDataCell>
              <CTableDataCell>{staff.name}</CTableDataCell>
              <CTableDataCell>{staff.role}</CTableDataCell>
              <CTableDataCell>{staff.status}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" onClick={() => handleEdit(staff)}>
                  Edit
                </CButton>{" "}
                <CButton color="danger" size="sm" onClick={() => handleDeleteClick(staff)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
{/* Add/Edit Modal */}
<CModal 
  visible={isAddModalOpen || isEditModalOpen} 
  onClose={() => {
    setAddModalOpen(false); 
    setEditModalOpen(false); 
  }}
>
  <CModalHeader>
    <h5>{isAddModalOpen ? "Add New Staff" : "Edit Staff"}</h5>
  </CModalHeader>
  <CModalBody>
    <CForm>
      <CFormInput
        type="text"
        name="staffid"
        value={isAddModalOpen ? newStaff.staffid : currentStaff?.staffid || ""}
        onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
        placeholder="Staff ID"
      />
      <CFormInput
        type="text"
        name="name"
        value={isAddModalOpen ? newStaff.name : currentStaff?.name || ""}
        onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
        placeholder="Name"
      />
      {/* <CFormInput
        type="text"
        name="username"
        value={isAddModalOpen ? newStaff.username : currentStaff?.username || ""}
        onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
        placeholder="Username"
      />
      <CFormInput
        type="text"
        name="password"
        value={isAddModalOpen ? newStaff.password : ""}
        onChange={handleInputChange} // Password should only be updated explicitly.
        placeholder="Password"
        disabled={!isAddModalOpen} // Disable in edit mode for security.
      /> */}
      <CFormInput
        type="text"
        name="role"
        value={isAddModalOpen ? newStaff.role : currentStaff?.role || ""}
        onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
        placeholder="Role"
      />
      <CFormInput
        type="text"
        name="status"
        value={isAddModalOpen ? newStaff.status : currentStaff?.status || ""}
        onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
        placeholder="Status"
      />
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton
      color="primary"
      onClick={isAddModalOpen ? handleAddStaff : handleUpdateStaff}
    >
      {isAddModalOpen ? "Add" : "Update"}
    </CButton>
    <CButton 
      color="secondary" 
      onClick={() => {
        setAddModalOpen(false); 
        setEditModalOpen(false); 
      }}
    >
      Cancel
    </CButton>
  </CModalFooter>
</CModal>


      {/* Confirm Delete Modal */}
      <CModal visible={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <CModalHeader>
          <h5>Confirm Deletion</h5>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete <strong>{staffToDelete?.name}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleConfirmDelete}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default StaffTable;
