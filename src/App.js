import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/siginup";
import Login from "./components/Login";
import UserAppointments from "./components/UserHome";
import UserProfile from "./components/UserProfile";
import DoctorProfile from "./components/DoctorProfile";
import AppointmentForm from "./components/AppointmentForm";
import Appointments from "./components/Appointments";
import LandingButtons from "./components/Landing";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Landing Page as default route */}
        <Route path="/" element={<LandingButtons />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/UserAppointments" element={<UserAppointments />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/DoctorProfile/:id" element={<DoctorProfile />} />
        <Route path="*" element={<LandingButtons />} />
        <Route path="/AppointmentForm" element={<AppointmentForm />} />
        <Route path="/AppointmentForm/:doctorId" element={<AppointmentForm />} />
        <Route path="/Appointments" element={<Appointments />} />

      </Routes>
    </Router>
  );
}

export default App;
