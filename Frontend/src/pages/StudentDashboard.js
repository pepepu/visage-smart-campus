import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "./StudentDashboard.css";

export default function StudentDashboard({ onMenuClick }) {
  return (
    <div className="dashboard">
      {/* Action Buttons */}
      <div className="dashboard-actions">
        <Button variant="success" size="sm">Check In</Button>
        <Button variant="outline-secondary" size="sm">Check Out</Button>
        <Button variant="info" size="sm">View Schedule</Button>
      </div>

      {/* Stats Cards */}
      <Container fluid>
        <Row>
          <Col md={3}>
            <Card className="stat-card">
              <p>Classes Today</p>
              <h2>3</h2>
              <span>Next: 10:30 AM</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Attendance Rate</p>
              <h2>95%</h2>
              <span>This Semester</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Current GPA</p>
              <h2>3.8</h2>
              <span>Out of 4.0</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Credits</p>
              <h2>18</h2>
              <span>This Semester</span>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Main Content */}
      <Row className="main-content">
        <Col md={8}>
          <Card className="schedule-view">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Today's Schedule</h5>
              <Badge bg="primary">Monday, Dec 16</Badge>
            </Card.Header>
            <Card.Body>
              <div className="schedule-item">
                <div className="time">9:00 AM - 10:30 AM</div>
                <div className="class-info">
                  <h6>CS 101 - Introduction to Computer Science</h6>
                  <p>Room 324 • Prof. Rebecca Miller</p>
                </div>
                <Badge bg="success">Present</Badge>
              </div>
              
              <div className="schedule-item">
                <div className="time">11:00 AM - 12:30 PM</div>
                <div className="class-info">
                  <h6>MATH 201 - Calculus I</h6>
                  <p>Room 215 • Prof. David Chen</p>
                </div>
                <Badge bg="warning">Upcoming</Badge>
              </div>
              
              <div className="schedule-item">
                <div className="time">2:00 PM - 3:30 PM</div>
                <div className="class-info">
                  <h6>ENG 101 - Composition</h6>
                  <p>Room 156 • Prof. Sarah Johnson</p>
                </div>
                <Badge bg="secondary">Later</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="recent-grades">
            <Card.Header>
              <h5>Recent Grades</h5>
            </Card.Header>
            <Card.Body>
              <div className="grade-item">
                <span className="course">CS 101 - Midterm</span>
                <Badge bg="success">A- (90%)</Badge>
              </div>
              <div className="grade-item">
                <span className="course">MATH 201 - Quiz 3</span>
                <Badge bg="info">B+ (87%)</Badge>
              </div>
              <div className="grade-item">
                <span className="course">ENG 101 - Essay 2</span>
                <Badge bg="success">A (92%)</Badge>
              </div>
            </Card.Body>
          </Card>

          <Card className="attendance-summary">
            <Card.Header>
              <h5>Attendance Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="attendance-item">
                <span>CS 101</span>
                <span>15/16 (94%)</span>
              </div>
              <div className="attendance-item">
                <span>MATH 201</span>
                <span>14/16 (88%)</span>
              </div>
              <div className="attendance-item">
                <span>ENG 101</span>
                <span>16/16 (100%)</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
