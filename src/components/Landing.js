import React from "react";
import "../styles/LandingButtons.css"; // Custom CSS file

const LandingPage = () => {
  return (
    <div className="allin"> 
    <div className="d-flex flex-column min-vh-100">
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
                <a className="nav-link text-dark" href="/UserAppointments">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/UserProfile">
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>

      {/* Hero Section */}
      <section className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-5 hero-section">
        <h1 className="display-4 fw-bold text-primary mb-3">
          Book Appointments with Top Doctors
        </h1>
        <p className="lead text-secondary mb-4">
          Quick, easy and secure medical booking.
        </p>
        <div className="d-flex gap-3">
          <a href="/signup" className="btn btn-primary px-4 rounded-pill">
            Sign Up
          </a>
          <a href="/login" className="btn btn-outline-primary px-4 rounded-pill">
            Login
          </a>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="text-center p-5 bg-danger bg-opacity-10">
        <h2 className="h2 text-danger mb-2">🚨 Emergency Support</h2>
        <p className="text-muted">
          24/7 emergency services for critical conditions. Call us anytime.
        </p>
      </section>

      {/* Top Doctors Section */}
      <section className="">
        <h2 className="text-center text-primary mb-5">👨‍⚕️ Top Doctors</h2>
        <div className="container">
          <div className="row g-4">
            {/* Doctor Card 1 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://img.freepik.com/premium-photo/portrait-smiling-doctor-standing-with-arms-crossed_107420-75283.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 1"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Denis Leary</h5>
                  <p className="card-text text-muted">Cardiologist</p>
                </div>
              </div>
            </div>
            {/* Doctor Card 2 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://img.freepik.com/premium-photo/male-doctor-light-surface-closeup-view-generated-ai_1000320-1180.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 2"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Rahul Mehta</h5>
                  <p className="card-text text-muted">Neurology</p>
                </div>
              </div>
            </div>
            {/* Doctor Card 3 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://wallpapercave.com/wp/wp2968627.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 3"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">DR . Keerthy</h5>
                  <p className="card-text text-muted">Pediatrics</p>
                </div>
              </div>
            </div>
            {/* Doctor Card 4 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://wallpapercave.com/wp/wp2655100.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Priya Nair</h5>
                  <p className="card-text text-muted">Dermatology</p>
                </div>
              </div>
            </div>

            {/* Doctor Card 5 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://wallpapercave.com/wp/wp2469692.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Divya Suresh</h5>
                  <p className="card-text text-muted">ENT</p>
                </div>
              </div>
            </div>

            {/* Doctor Card 6 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://th.bing.com/th/id/OIP.Od_E_JN3vY_WckaC3Q3xOAHaFs?w=612&h=471&rs=1&pid=ImgDetMain"
                  className="card-img-top doctor-img"
                  alt="Doctor 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Rajesh Iyer</h5>
                  <p className="card-text text-muted">	Urology</p>
                </div>
              </div>
            </div>


            {/* Doctor Card 7 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://th.bing.com/th/id/OIP.cr8kMkKWEo43RtOTNEPSgAHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain"
                  className="card-img-top doctor-img"
                  alt="Doctor 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Nandini Rao</h5>
                  <p className="card-text text-muted">General Medicine</p>
                </div>
              </div>
            </div>

            {/* Doctor Card 8 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src="https://img.freepik.com/premium-photo/woman-white-lab-coat-stethoscope_871710-15699.jpg"
                  className="card-img-top doctor-img"
                  alt="Doctor 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Dr. Shalini Joshi</h5>
                  <p className="card-text text-muted">Oncology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center p-3 small text-muted">
        &copy; 2025 Apollo Hospital. All rights reserved.
      </footer>
    </div>
    </div>
  );
};

export default LandingPage;
