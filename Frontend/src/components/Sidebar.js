import React from "react";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose, onPageChange }) {
  const handleNavigation = (pageName) => {
    onPageChange(pageName);
    onClose(); // Close sidebar after navigation
  };

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">VISAGE</div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => handleNavigation("Dashboard")}>
          Dashboard
        </li>
        <li onClick={() => handleNavigation("My Classes")}>
          My Classes
        </li>
        <li onClick={() => handleNavigation("Attendance Logs")}>
          Attendance Logs
        </li>
        <li onClick={() => handleNavigation("Schedule")}>
          Schedule
        </li>
        <li onClick={() => handleNavigation("My Profile")}>
          My Profile
        </li>
        <li onClick={() => handleNavigation("Time Logs")}>
          Time Logs
        </li>
        <li onClick={() => handleNavigation("Reports")}>
          Reports
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="profile-picture" onClick={() => handleNavigation("My Profile")}>
          <img src="/logo192.png" alt="Profile" />
        </div>
      </div>
    </div>
  );
}
