import React from "react";
import "./Dashboard.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Top Header */}
      <div className="dashboard-header">
        <input type="text" placeholder="Search users, rooms..." />
        <div className="header-buttons">
          <Button variant="light">Export Report</Button>
          <Button className="add-btn">+ Add New User</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Container fluid>
        <Row>
          <Col md={3}>
            <Card className="stat-card">
              <p>Active Classes</p>
              <h2>4</h2>
              <span>Current Semester</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Total Students</p>
              <h2>156</h2>
              <span>Across All Classes</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Today's Classes</p>
              <h2>2</h2>
              <span>Next: 10:30 AM</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Teaching Hours</p>
              <h2>12.5</h2>
              <span>This Week</span>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Main Content */}
      <Row className="main-content">
        <Col md={8}>
          <Card className="bim-view">
            <h5>BIM Classroom View</h5>
            <div className="bim-placeholder">Room 324 & 326 Map Here</div>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="recent-activity">
            <h5>Recent Activity</h5>
            <ul>
              <li>Emily Johnson checked in</li>
              <li>Prof. Rebecca Miller started class</li>
              <li>Unknown person detected</li>
              <li>James Thompson checked out</li>
            </ul>
          </Card>

          <Card className="alerts">
            <h5>Alerts</h5>
            <p>No new alerts</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
