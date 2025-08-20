import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // ---------------- THEME ----------------
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const themes = [
    "Claude",
    "Corporate",
    "Ghibli",
    "Gourmet",
    "Luxury",
    "Pastel",
    "Slack",
    "Soft",
    "Spotify",
    "Valorant",
    "VS Code",
  ];

  // ---------------- FONTS ----------------
  const [selectedFont, setSelectedFont] = useState(
    localStorage.getItem("font") || "Geist"
  );

  useEffect(() => {
    document.body.style.fontFamily = selectedFont;
    localStorage.setItem("font", selectedFont);
  }, [selectedFont]);

  const fonts = [
    { label: "Claude", value: "Geist" },
    { label: "Corporate", value: "Public Sans" },
    { label: "Ghibli", value: "Amaranth" },
    { label: "Gourmet", value: "Rubik" },
    { label: "Luxury", value: "Archivo" },
    { label: "Pastel", value: "Open Sans" },
    { label: "Slack", value: "Lato" },
    { label: "Soft", value: "Montserrat" },
    { label: "Spotify", value: "Lato" },
    { label: "Valorant", value: "Work Sans" },
    { label: "VS Code", value: "Fira Code" },
  ];

  return (
    <nav className="bg-primary text-primary-content flex justify-between items-center px-6 py-3 shadow-md">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-wide">ChatApp</h1>

      {/* Links + Selectors */}
      <div className="flex items-center space-x-6">
        {/* Links */}
        <div className="flex space-x-4 text-lg font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
          <Link to="/logout" className="hover:underline">
            Logout
          </Link>
        </div>

        {/* Theme Selector */}
        <select
          name="theme"
          value={selectedTheme}
          onChange={handleThemeChange}
          className="select select-bordered border-2 bg-base-100 text-base-content rounded-xl shadow-md px-3 py-2 hover:scale-105 transition-transform duration-200"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme} className="capitalize">
              {theme}
            </option>
          ))}
        </select>

        {/* Font Selector */}
        <select
          name="font"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="select select-bordered border-2 bg-base-100 text-base-content rounded-xl shadow-md px-3 py-2 hover:scale-105 transition-transform duration-200"
        >
          {fonts.map((font) => (
            <option
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
