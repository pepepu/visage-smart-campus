import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">VISAGE</div>
      <ul className="sidebar-menu">
        <li className="active">Dashboard</li>
        <li>My Classes</li>
        <li>Attendance Logs</li>
        <li>Schedule</li>
        <li>My Profile</li>
        <li>Time Logs</li>
        <li>Reports</li>
      </ul>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <img src="/logo192.png" alt="profile" />
          <div>
            <p>Prof. Rebecca Miller</p>
            <span>Computer Science Department</span>
          </div>
        </div>
        <button className="signout-btn">Sign Out</button>
      </div>
    </div>
  );
}
