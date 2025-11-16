import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/siginup.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phonenumber)) {
      setErrorMessage('Phone number must be 10 digits.');
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      phonenumber: formData. phonenumber,
    };
console.log(payload)
    axios
      .post('http://127.0.0.1:8000/Siginup/', payload)
      .then((response) => {
        console.log("register success")
        setErrorMessage('');
        navigate('/login');
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
        } else {
          setErrorMessage('Failed to connect to API');
        }
      });
  };

  return (
    <div className="bodys">
      {/* Navbar */}
      <div className="navbarall">
        <nav className="navbar navbar-expand-lg shadow-sm">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img
                src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
                alt="Logo"
                className="logo-img"
              />
              <span className="ms-3 fs-3 fw-bold text-primary">Apollo Hospital</span>
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/UserAppointments">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/UserProfile">My Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/login">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Signup Form */}
      <div className="bodys15">
        <div className="signup-container">
          {/* Logo + Welcome */}
          <div className="signup-header">
            <div className="logoo-containers">
              <img
                src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
                alt="Hospital Logo"
                className="hospitall-logo"
              />
              <h1 className="hospital-welcome">Welcome To<br />Apollo Hospital</h1>
            </div>
          </div>

          <h2 className="signup-title">Patient Sign Up</h2>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="signup-button">Register</button>
          </form>

          <p className="login-text">
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
