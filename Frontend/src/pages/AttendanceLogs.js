import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import "./pages.css";

export default function AttendanceLogs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Attendance Logs</h1>
        <p>View and manage student attendance records</p>
      </div>
      
      <Container fluid>
        <Card>
          <Card.Body>
            <h5>Today's Attendance</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Check-in Time</th>
                  <th>Check-out Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Emily Johnson</td>
                  <td>CS 101</td>
                  <td>9:05 AM</td>
                  <td>10:25 AM</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>James Thompson</td>
                  <td>CS 101</td>
                  <td>9:02 AM</td>
                  <td>10:28 AM</td>
                  <td>Present</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
