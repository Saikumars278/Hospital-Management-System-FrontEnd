import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/userProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    gender: 'M',           // default to 'M' as per your model
    dateofbirth: '',
    address: '',
    phonenumber: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Map backend data keys to frontend state keys if needed
        setProfile({
          name: response.data.name || '',
          gender: response.data.gender || 'M',
          dateofbirth: response.data.dateofbirth || '',
          address: response.data.address || '',
          phonenumber: response.data.phonenumber || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch('http://localhost:8000/profile/', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message || 'Profile updated successfully!');
      setIsEditing(false);
      // Update profile state with response data (nested inside 'data' as per your API)
      setProfile({
        name: response.data.data.name || '',
        gender: response.data.data.gender || 'M',
        dateofbirth: response.data.data.dateofbirth || '',
        address: response.data.data.address || '',
        phonenumber: response.data.data.phonenumber || '',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bgimage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-container">
              <img
                src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
                alt="Hospital Logo"
                className="hospital-logo"
              />
            </div>
            <Link className="navbar-brand fw-bold fs-4" to="/">
              Apollo Hospital
            </Link>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
              <li><Link to="/UserAppointments" className="btn btn-light btn-sm rounded-pill fw-semibold">🏠 Home</Link></li>
              <li><Link to="/UserProfile" className="btn btn-light btn-sm rounded-pill fw-semibold">👤 My Profile</Link></li>
              <li><Link to="/Appointments" className="btn btn-light btn-sm rounded-pill fw-semibold">📋 My Appointments</Link></li>
              <li><button onClick={handleLogout} className="btn btn-danger btn-sm rounded-pill fw-semibold">🚪 Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile Form */}
      <div className="container" style={{ paddingTop: '100px', maxWidth: '700px' }}>
        <h2 className="mb-4 text-center fw-bold">{isEditing ? 'Edit Profile' : 'My Profile'}</h2>

        <div className="good p-4">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3 row align-items-center">
              <label className="col-md-3 col-form-label fw-semibold">Full Name</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-3 row align-items-center">
              <label className="col-md-3 col-form-label fw-semibold">Gender</label>
              <div className="col-md-9">
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="form-select"
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-3 row align-items-center">
              <label className="col-md-3 col-form-label fw-semibold">Date of Birth</label>
              <div className="col-md-9">
                <input
                  type="date"
                  name="dateofbirth"
                  value={profile.dateofbirth}
                  onChange={handleChange}
                  className="form-control"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-3 row align-items-center">
              <label className="col-md-3 col-form-label fw-semibold">Address</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your address"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-3 row align-items-center">
              <label className="col-md-3 col-form-label fw-semibold">Phone</label>
              <div className="col-md-9">
                <input
                  type="tel"
                  name="phonenumber"
                  value={profile.phonenumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center mt-4">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn btn-warning px-4"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit
                </button>
              ) : (
                <>
                  <button type="submit" className="btn btn-primary px-5 me-3">
                    💾 Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={() => setIsEditing(false)}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
