import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AppointmentForm = () => {
  const [date, setDate] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { doctorId } = useParams(); // Get doctor ID from route
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/doctors/');
        setDoctors(response.data);

        if (doctorId) {
          const found = response.data.find((doc) => doc.id.toString() === doctorId);
          if (found) {
            setSelectedDoctor(doctorId);
          } else {
            setMessage('Invalid doctor selected from link.');
          }
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setMessage('Failed to load doctors. Please try again later.');
      }
    };
    fetchDoctors();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !selectedDoctor) {
      setMessage('Please select both date and doctor.');
      return;
    }

    const selectedDateTime = new Date(date);
    const now = new Date();
    if (selectedDateTime < now) {
      setMessage('Appointment date and time must be in the future.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book an appointment.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await axios.post(
        'http://127.0.0.1:8000/book_appointment/',
        {
          date,
          doctor: selectedDoctor,
        },
        {
          headers: {
            Authorization: 'Token ' + token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage('✅ Appointment booked successfully!');
        setDate('');
        setSelectedDoctor('');
        setTimeout(() => {
          navigate('/UserAppointments');
        }, 1500);
      }
    } catch (error) {
      console.error('Booking Error:', error.response?.data);
      if (error.response?.status === 401) {
        setMessage('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => navigate('/login'), 1500);
      } else if (error.response?.data?.doctor) {
        setMessage('Invalid doctor selected.');
      } else if (error.response?.data?.date) {
        setMessage('Invalid appointment date.');
      } else {
        setMessage('❌ Failed to book appointment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgimage">
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-4 shadow-sm">
        <div className="logo-container">
          <img
            src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
            alt="Hospital Logo"
            className="hospital-logo"
          />
        </div>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/">Apollo Hospital</Link>
          <Link to="/UserAppointments" className="btn btn-light btn-sm ms-auto rounded-pill fw-semibold">🏠 Home</Link>
        </div>
      </nav>

      <div className="container pt-5 pb-5">
        <div className="card p-4 shadow-lg rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h2 className="text-center text-primary mb-4">Doctor Appointment Request Form</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="doctor" className="form-label">Doctor:</label>
                <select
                  id="doctor"
                  className="form-select"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                  disabled={!!doctorId}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {doc.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="appointmentDate" className="form-label">Preferred Appointment Date & Time:</label>
                <input
                  id="appointmentDate"
                  type="datetime-local"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Booking...' : 'Submit Request'}
                </button>
              </div>

              {message && (
                <p className={`mt-3 text-center ${message.startsWith('✅') ? 'text-success' : 'text-danger'}`}>
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
