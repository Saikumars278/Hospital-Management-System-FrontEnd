import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams(); // Extract doctor ID from URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor data from API
    axios.get(`http://127.0.0.1:8000/DoctorView/${id}/`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctor details:", error);
      });
  }, [id]);

  if (!doctor) {
    return <div className="text-center mt-5">Loading doctor details...</div>;
  }

  return (
    <div className="doctor-bgimage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-container">
              <img
                src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
                alt="Hospital Logo"
                className="hospital-logo"
              />
            </div>
            <Link className="navbar-brand" to="/">Apollo Hospital</Link>
          </div>
          <div>
            <Link to="/UserAppointments" className="btn btn-light btn-sm rounded-pill fw-semibold">
              🏠 Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Doctor Profile Card */}
      <div className="container py-5 d-flex justify-content-center">
        <div className="profile-card card shadow rounded-4 p-4 w-100" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <div className="profile-img-wrapper mb-3">
              <img
                src={`http://127.0.0.1:8000${doctor.image}`}
                alt={doctor.name}
                className="profile-img shadow rounded-circle"
              />
            </div>
            <h3 className="fw-bold text-primary mb-1">{doctor.name}</h3>
            <p className="text-muted mb-0 fs-6">{doctor.department}</p>
          </div>

          <hr />

          <div className="doctor-details px-2 fs-6">
            <p><strong>🩺 Experience:</strong> <span className="ms-2">{doctor.experience} years</span></p>
            <p><strong>👥 Patients Visited:</strong> <span className="ms-2">{doctor.count || 0}</span></p>
          </div>

          {/* Book Appointment Button */}
          <div className="text-center mt-4">
            <Link
              to={{
                pathname: `/AppointmentForm/${doctor.id}`,
                state: { doctor }, // Passing doctor data
              }}
              className="btn btn-primary rounded-pill px-4 py-2"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
