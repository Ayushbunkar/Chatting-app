import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutPage from "./pages/About.jsx";
import ContactPage from "./pages/Contact.jsx";
import LoginPage from "./pages/Login.jsx";
import ServicesPage from "./pages/Services.jsx";
import HomePage from "./pages/Home.jsx";
import SignupPage from "./pages/Signup.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          {/* <Route path="/logout" element={<div>Logout</div>} /> */}
          {/* <Route path="/register" element={<div>register</div>} /> */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;