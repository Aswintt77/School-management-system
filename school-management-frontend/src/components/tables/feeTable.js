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

const FeeTable = () => {
  const [fees, setFees] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    studentid: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    remarks: "",
  });
  const [currentFee, setCurrentFee] = useState(null);
  const [feeToDelete, setFeeToDelete] = useState(null);

  // Fetch fee data from API
  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/api/fees") // API endpoint for fetching fees
      .then((response) => {
        setFees(response.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching fee data:", error));
  }, []);

  // Handle Add Modal Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFee({ ...newFee, [name]: value });
  };

  // Handle Edit Modal Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFee({ ...currentFee, [name]: value });
  };

  // Add a New Fee
  const handleAddFee = () => {
    axiosInstance
      .post("http://localhost:5000/api/fees", newFee)
      .then((response) => {
        setFees([...fees, response.data]);
        setNewFee({ studentid: "", feeType: "", amount: "", paymentDate: "", remarks: "" });
        setAddModalOpen(false);
      })
      .catch((error) => console.error("Error adding fee:", error));
  };

  // Update Fee Details
  const handleUpdateFee = () => {
    if (!currentFee._id) {
      console.error("Fee _id is missing");
      return;
    }

    axiosInstance
      .put(`http://localhost:5000/api/fees/${currentFee._id}`, currentFee)
      .then((response) => {
        setFees(fees.map((fee) => (fee._id === response.data._id ? response.data : fee)));
        setEditModalOpen(false);
        setCurrentFee(null);
      })
      .catch((error) => console.error("Error updating fee:", error));
  };

  // Confirm Deletion
  const handleConfirmDelete = () => {
    if (!feeToDelete._id) {
      console.error("Fee _id is missing");
      return;
    }

    axiosInstance
      .delete(`http://localhost:5000/api/fees/${feeToDelete._id}`)
      .then(() => {
        setFees(fees.filter((fee) => fee._id !== feeToDelete._id));
        setConfirmModalOpen(false);
        setFeeToDelete(null);
      })
      .catch((error) => console.error("Error deleting fee:", error));
  };

  // Open Edit Modal
  const handleEdit = (fee) => {
    setCurrentFee(fee);
    setEditModalOpen(true);
  };

  // Open Confirm Delete Modal
  const handleDeleteClick = (fee) => {
    setFeeToDelete(fee);
    setConfirmModalOpen(true);
  };

  return (
    <div>
      <h3>Fee Table</h3>

      {/* Add Button */}
      <CButton color="primary" onClick={() => setAddModalOpen(true)}>
        Add Fee
      </CButton>

      {/* Fee Table */}
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Student ID</CTableHeaderCell>
            <CTableHeaderCell>Fee Type</CTableHeaderCell>
            <CTableHeaderCell>Amount</CTableHeaderCell>
            <CTableHeaderCell>Payment Date</CTableHeaderCell>
            <CTableHeaderCell>Remarks</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {fees.map((fee, i) => (
            <CTableRow key={i}>
              <CTableDataCell>{i + 1}</CTableDataCell>
              <CTableDataCell>{fee.studentid}</CTableDataCell>
              <CTableDataCell>{fee.feeType}</CTableDataCell>
              <CTableDataCell>{fee.amount}</CTableDataCell>
              <CTableDataCell>{fee.paymentDate}</CTableDataCell>
              <CTableDataCell>{fee.remarks}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" onClick={() => handleEdit(fee)}>
                  Edit
                </CButton>{" "}
                <CButton color="danger" size="sm" onClick={() => handleDeleteClick(fee)}>
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
          <h5>{isAddModalOpen ? "Add New Fee" : "Edit Fee"}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              name="studentid"
              value={isAddModalOpen ? newFee.studentid : currentFee?.studentid || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Student ID"
            />
            <CFormInput
              type="text"
              name="feeType"
              value={isAddModalOpen ? newFee.feeType : currentFee?.feeType || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Fee Type"
            />
            <CFormInput
              type="number"
              name="amount"
              value={isAddModalOpen ? newFee.amount : currentFee?.amount || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Amount"
            />
            <CFormInput
              type="date"
              name="paymentDate"
              value={isAddModalOpen ? newFee.paymentDate : currentFee?.paymentDate || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
            />
            <CFormInput
              type="text"
              name="remarks"
              value={isAddModalOpen ? newFee.remarks : currentFee?.remarks || ""}
              onChange={isAddModalOpen ? handleInputChange : handleEditInputChange}
              placeholder="Remarks"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={isAddModalOpen ? handleAddFee : handleUpdateFee}
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
          Are you sure you want to delete this fee record?
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

export default FeeTable;
