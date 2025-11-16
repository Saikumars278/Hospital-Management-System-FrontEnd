import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/userHome.css';

function UserAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  // Fetch doctors from backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/doctors/')
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  // Filter doctors based on search input
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.department.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="bgimage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-container">
              <img
                src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
                alt="Hospital Logo"
                className="hospital-logo"
              />
            </div>
            <Link className="navbar-brand fw-bold fs-4" to="/">Apollo Hospital</Link>
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

      {/* Doctors Section */}
      <div className="container py-5">
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h2 className="fw-bold text-dark">Meet Our Specialists</h2>
          </div>
          <div className="col-12 col-md-6">
            <form className="search-form d-flex flex-column flex-sm-row gap-2" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary rounded-pill px-4">Search</button>
            </form>
          </div>
        </div>

        <div className="row">
          {filteredDoctors.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-muted">No doctors found.</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div className="col-sm-6 col-md-4 d-flex mb-4" key={doctor.id}>
                <div className="doctor-card w-100 text-center p-3">
                  <img
                    src={`http://127.0.0.1:8000${doctor.image}`}
                    alt={doctor.name}
                    className="doctor-img mb-3"
                  />
                  <div className="doctor-name fw-bold fs-5">{doctor.name}</div>
                  <div className="doctor-department text-muted">{doctor.department}</div>
                  <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                  <Link to={`/DoctorProfile/${doctor.id}`} className="btn btn-outline-primary btn-sm">View Profile</Link>
                  <Link to={`/AppointmentForm/${doctor.id}`} className="btn btn-primary btn-sm">Book Now</Link>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAppointments;
