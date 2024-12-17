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

const LibraryTable = () => {
  const [libraryRecords, setLibraryRecords] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    studentid: "",
    bookName: "",
    borrowDate: "",
    returnDate: "",
    status: "",
  });
  const [currentRecord, setCurrentRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);

  // Fetch library data from API
  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/api/library") // API endpoint for fetching library records
      .then((response) => {
        setLibraryRecords(response.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching library data:", error));
  }, []);

  // Handle Add Modal Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  // Handle Edit Modal Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord({ ...currentRecord, [name]: value });
  };

  // Add a New Record
  const handleAddRecord = () => {
    axiosInstance
      .post("http://localhost:5000/api/library", newRecord)
      .then((response) => {
        setLibraryRecords([...libraryRecords, response.data]);
        setNewRecord({ studentid: "", bookName: "", borrowDate: "", returnDate: "", status: "" });
        setAddModalOpen(false);
      })
      .catch((error) => console.error("Error adding library record:", error));
  };

  // Update Record Details
  const handleUpdateRecord = () => {
    if (!currentRecord._id) {
      console.error("Record _id is missing");
      return;
    }

    axiosInstance
      .put(`http://localhost:5000/api/library/${currentRecord._id}`, currentRecord)
      .then((response) => {
        setLibraryRecords(libraryRecords.map((record) => (record._id === response.data._id ? response.data : record)));
        setEditModalOpen(false);
        setCurrentRecord(null);
      })
      .catch((error) => console.error("Error updating library record:", error));
  };

  // Confirm Deletion
  const handleConfirmDelete = () => {
    if (!recordToDelete._id) {
      console.error("Record _id is missing");
      return;
    }

    axiosInstance
      .delete(`http://localhost:5000/api/library/${recordToDelete._id}`)
      .then(() => {
        setLibraryRecords(libraryRecords.filter((record) => record._id !== recordToDelete._id));
        setConfirmModalOpen(false);
        setRecordToDelete(null);
      })
      .catch((error) => console.error("Error deleting library record:", error));
  };

  // Open Edit Modal
  const handleEdit = (record) => {
    setCurrentRecord(record);
    setEditModalOpen(true);
  };

  // Open Confirm Delete Modal
  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setConfirmModalOpen(true);
  };

  return (
    <div>
      <h3>Library Table</h3>

      {/* Add Button */}
      <CButton color="primary" onClick={() => setAddModalOpen(true)}>
        Add Library Record
      </CButton>

      {/* Library Table */}
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Student ID</CTableHeaderCell>
            <CTableHeaderCell>Book Name</CTableHeaderCell>
            <CTableHeaderCell>Borrow Date</CTableHeaderCell>
            <CTableHeaderCell>Return Date</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {libraryRecords.map((record, i) => (
            <CTableRow key={i}>
              <CTableDataCell>{i + 1}</CTableDataCell>
              <CTableDataCell>{record.studentid}</CTableDataCell>
              <CTableDataCell>{record.bookName}</CTableDataCell>
              <CTableDataCell>{record.borrowDate}</CTableDataCell>
              <CTableDataCell>{record.returnDate}</CTableDataCell>
              <CTableDataCell>{record.status}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" onClick={() => handleEdit(record)}>
                  Edit
                </CButton>{" "}
                <CButton color="danger" size="sm" onClick={() => handleDeleteClick(record)}>
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
          <h5>{isAddModalOpen ? "Add New Library Record" : "Edit Library Record"}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              name="studentid"
              value={isAddModalOpen ? newRecord.studentid : currentRecord?.studentid || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Student ID"
            />
            <CFormInput
              type="text"
              name="bookName"
              value={isAddModalOpen ? newRecord.bookName : currentRecord?.bookName || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Book Name"
            />
            <CFormInput
              type="date"
              name="borrowDate"
              value={isAddModalOpen ? newRecord.borrowDate : currentRecord?.borrowDate || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
            />
            <CFormInput
              type="date"
              name="returnDate"
              value={isAddModalOpen ? newRecord.returnDate : currentRecord?.returnDate || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
            />
            <CFormInput
              type="text"
              name="status"
              value={isAddModalOpen ? newRecord.status : currentRecord?.status || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Status"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={isAddModalOpen ? handleAddRecord : handleUpdateRecord}
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
          Are you sure you want to delete this library record?
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

export default LibraryTable;
