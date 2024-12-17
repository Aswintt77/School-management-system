import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilSchool } from '@coreui/icons';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const username = useRef();
  const password = useRef();

  const onLoginSubmit = () => {
    axios
      .post('http://localhost:5000/api/users/login', {
        username: username.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
      console.log(username);
      
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('username',res.data.username);
        console.log(res.data.role);


        window.location.href = '/dashboard';
      })
      .catch((err) => {
        toast.error('Login failed, please check your credentials!');
      });
  };

  return (
    <div className="bg-gradient d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              {/* Login Card */}
              <CCard className="shadow-lg rounded">
                <CCardBody className="p-4">
                  {/* Heading with Larger Icon */}
                  <h1 className="text-center text-primary mb-4" style={{ fontSize: '32px' }}>
                    <CIcon className="mr-2" style={{ fontSize: '32px' }} />
                    School Management System
                  </h1>
                  <p className="text-center text-muted mb-4">Sign in to access your account</p>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter your username"
                        autoComplete="username"
                        ref={username}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        ref={password}
                      />
                    </CInputGroup>
                    <CRow className="d-flex justify-content-center">
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4 w-100"
                          onClick={onLoginSubmit}
                          style={{ backgroundColor: '#4e73df', borderColor: '#4e73df' }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <Toaster />
    </div>
  );
};

export default Login;
