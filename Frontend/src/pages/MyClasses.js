import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./pages.css";

export default function MyClasses() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Classes</h1>
        <p>Manage your current and upcoming classes</p>
      </div>
      
      <Container fluid>
        <Row>
          <Col md={6}>
            <Card className="class-card">
              <Card.Body>
                <h5>CS 101 - Introduction to Computer Science</h5>
                <p>Room: 324 | Time: 9:00 AM - 10:30 AM</p>
                <p>Students: 45 | Status: Active</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="class-card">
              <Card.Body>
                <h5>CS 201 - Data Structures</h5>
                <p>Room: 326 | Time: 11:00 AM - 12:30 PM</p>
                <p>Students: 38 | Status: Active</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
