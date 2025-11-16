import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'; // Custom CSS
import axios from "axios";

// Navbar Component
function Navbar() {
  return (
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
  );
}

// Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const attemptLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("Login successful!");
      window.location.href = "/UserAppointments";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='name'>
      <Navbar />

      <div className="login-page-wrapper">
        <div className="login-container">
          <div className="logo-container1 text-center mb-3">
            <img
              src="https://th.bing.com/th/id/OIP.ZoFwTXvDVD4HSz3k-Uo-gwAAAA?w=474&h=419&rs=1&pid=ImgDetMain"
              alt="Hospital Logo"
              className="hospital-logo1"
            />
          </div>

          <h2 className="text-center login-title">Welcome To Apollo Hospital</h2>
          <p className="text-center login-subtitle">Please log in to continue</p>

          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          <form className="login-form" onSubmit={attemptLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <div className="text-center mt-3 login-text">
            <p>
              Don’t have an account? <a href="/signup" className="text-primary">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
