import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Appointments.css';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
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
  );
}

function Appointments() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://localhost:8000/get_user_appointments/', {
          headers: { Authorization: `Token ${token}` }
        });
        setUpcoming(res.data.upcoming);
        setPast(res.data.past);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchAppointments();
  }, [navigate]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/appointments/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setUpcoming(prev => prev.filter(appt => appt.id !== id));
    } catch (error) {
      alert('Failed to cancel appointment');
    }
  };

  const formatDate = (dt) => new Date(dt).toLocaleDateString();
  const formatTime = (dt) => new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Navbar />
      <div className="bgimage">
        <div className="container py-4">
          <h2 className="mb-4 fw-bold text-center">My Appointments</h2>

          {/* Upcoming Appointments */}
          <div className="mb-5">
            <h4 className="mb-3">📅 Upcoming Appointments</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.length > 0 ? upcoming.map(appt => (
                    <tr key={appt.id}>
                      <td>{appt.doctor?.name}</td>
                      <td>{appt.doctor?.department}</td>
                      <td>{formatDate(appt.date)}</td>
                      <td>{formatTime(appt.date)}</td>
                      <td>
                        <button onClick={() => handleCancel(appt.id)} className="btn btn-sm btn-outline-danger cancel-btn">❌ Cancel</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5">No upcoming appointments</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Past Appointments */}
          <div>
            <h4 className="mb-3">🕒 Past Appointments</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="table-secondary">
                  <tr>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {past.length > 0 ? past.map(appt => (
                    <tr key={appt.id}>
                      <td>{appt.doctor?.name}</td>
                      <td>{appt.doctor?.department}</td>
                      <td>{formatDate(appt.date)}</td>
                      <td>{formatTime(appt.date)}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4">No past appointments</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
