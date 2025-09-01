import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyClasses from "./pages/MyClasses";
import AttendanceLogs from "./pages/AttendanceLogs";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentPage("Dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage("Dashboard");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleProfileClick = () => {
    setCurrentPage("My Profile");
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard onMenuClick={toggleSidebar} />;
      case "professor":
        return <FacultyDashboard onMenuClick={toggleSidebar} />;
      case "student":
        return <StudentDashboard onMenuClick={toggleSidebar} />;
      default:
        return <FacultyDashboard onMenuClick={toggleSidebar} />;
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return renderDashboard();
      case "My Classes":
        return <MyClasses />;
      case "Attendance Logs":
        return <AttendanceLogs />;
      case "Schedule":
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Schedule</h1>
              <p>View your class schedule and timings</p>
            </div>
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <h3>Schedule Page</h3>
              <p>This is the Schedule page content. Implement your schedule functionality here.</p>
            </div>
          </div>
        );
              case "My Profile":
          return <Profile currentUser={currentUser} />;
      case "Time Logs":
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Time Logs</h1>
              <p>View your time tracking logs</p>
            </div>
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <h3>Time Logs Page</h3>
              <p>This is the Time Logs page content. Implement your time tracking functionality here.</p>
            </div>
          </div>
        );
      case "Reports":
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Reports</h1>
              <p>Generate and view various reports</p>
            </div>
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <h3>Reports Page</h3>
              <p>This is the Reports page content. Implement your reporting functionality here.</p>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app-container">
      <Header onMenuClick={toggleSidebar} onProfileClick={handleProfileClick} onLogout={handleLogout} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onPageChange={handlePageChange} />
      <div className="main-content">
        {renderPageContent()}
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}

export default App;
