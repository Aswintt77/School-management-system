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

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentid: "",
    name: "",
    Class: "",
    gender: "",
    address: "",
  });
  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch students data from API
  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/api/students") // API endpoint for fetching students
      .then((response) => {
        setStudents(response.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  // Handle Add Modal Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Handle Edit Modal Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  // Add a New Student
  const handleAddStudent = () => {
    axiosInstance
      .post("http://localhost:5000/api/students", newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setNewStudent({ studentid: "", name: "", Class: "", gender: "", address: "" });
        setAddModalOpen(false);
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  // Update Student Details
  const handleUpdateStudent = () => {
    if (!currentStudent._id) {
      console.error("Student _id is missing");
      return;
    }

    axiosInstance
      .put(`http://localhost:5000/api/students/${currentStudent._id}`, currentStudent)
      .then((response) => {
        setStudents(students.map((student) => (student._id === response.data._id ? response.data : student)));
        setEditModalOpen(false);
        setCurrentStudent(null);
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  // Confirm Deletion
  const handleConfirmDelete = () => {
    if (!studentToDelete._id) {
      console.error("Student _id is missing");
      return;
    }

    axiosInstance
      .delete(`http://localhost:5000/api/students/${studentToDelete._id}`)
      .then(() => {
        setStudents(students.filter((student) => student._id !== studentToDelete._id));
        setConfirmModalOpen(false);
        setStudentToDelete(null);
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  // Open Edit Modal
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditModalOpen(true);
  };

  // Open Confirm Delete Modal
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setConfirmModalOpen(true);
  };

  return (
    <div>
      <h3>Student Table</h3>

      {/* Add Button */}
      <CButton color="primary" onClick={() => setAddModalOpen(true)}>
        Add Student
      </CButton>

      {/* Student Table */}
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Student ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Class</CTableHeaderCell>
            <CTableHeaderCell>Gender</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {students.map((student, i) => (
            <CTableRow key={i}>
              <CTableDataCell>{i + 1}</CTableDataCell>
              <CTableDataCell>{student.studentid}</CTableDataCell>
              <CTableDataCell>{student.name}</CTableDataCell>
              <CTableDataCell>{student.Class}</CTableDataCell>
              <CTableDataCell>{student.gender}</CTableDataCell>
              <CTableDataCell>{student.address}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" onClick={() => handleEdit(student)}>
                  Edit
                </CButton>{" "}
                <CButton color="danger" size="sm" onClick={() => handleDeleteClick(student)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Add/Edit Modal */}
      <CModal visible={isAddModalOpen || isEditModalOpen} onClose={() => { setAddModalOpen(false); setEditModalOpen(false); }}>
        <CModalHeader>
          <h5>{isAddModalOpen ? "Add New Student" : "Edit Student"}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              name="studentid"
              value={isAddModalOpen ? newStudent.studentid : currentStudent?.studentid || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Student ID"
            />
            <CFormInput
              type="text"
              name="name"
              value={isAddModalOpen ? newStudent.name : currentStudent?.name || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Name"
            />
            <CFormInput
              type="text"
              name="Class"
              value={isAddModalOpen ? newStudent.Class : currentStudent?.Class || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Class"
            />
            <CFormInput
              type="text"
              name="gender"
              value={isAddModalOpen ? newStudent.gender : currentStudent?.gender || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Gender"
            />
            <CFormInput
              type="text"
              name="address"
              value={isAddModalOpen ? newStudent.address : currentStudent?.address || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Address"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={isAddModalOpen ? handleAddStudent : handleUpdateStudent}
          >
            {isAddModalOpen ? "Add" : "Update"}
          </CButton>
          <CButton color="secondary" onClick={() => { setAddModalOpen(false); setEditModalOpen(false); }}>
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
          Are you sure you want to delete <strong>{studentToDelete?.name}</strong>?
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

export default StudentTable;
