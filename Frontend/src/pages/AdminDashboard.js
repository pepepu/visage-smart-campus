import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from "react-bootstrap";
import "./AdminDashboard.css";

export default function AdminDashboard({ onMenuClick }) {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: 'danger', text: 'Admin' },
      professor: { bg: 'primary', text: 'Professor' },
      student: { bg: 'success', text: 'Student' },
      staff: { bg: 'warning', text: 'Staff' }
    };
    const badge = badges[role] || { bg: 'secondary', text: role };
    return <Badge bg={badge.bg}>{badge.text}</Badge>;
  };

  const getStatusBadge = (isActive) => {
    return isActive ? 
      <Badge bg="success">Active</Badge> : 
      <Badge bg="danger">Inactive</Badge>;
  };

  return (
    <div className="dashboard">
      {/* Action Buttons */}
      <div className="dashboard-actions">
        <Button variant="primary" onClick={() => setShowAddUser(true)}>
          + Add New User
        </Button>
        <Button variant="outline-secondary">Export Users</Button>
        <Button variant="info">System Settings</Button>
      </div>

      {/* Stats Cards */}
      <Container fluid>
        <Row>
          <Col md={3}>
            <Card className="stat-card">
              <p>Total Users</p>
              <h2>{users.length}</h2>
              <span>All Roles</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Active Users</p>
              <h2>{users.filter(u => u.is_active).length}</h2>
              <span>Currently Active</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Students</p>
              <h2>{users.filter(u => u.role === 'student').length}</h2>
              <span>Enrolled Students</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <p>Faculty</p>
              <h2>{users.filter(u => u.role === 'professor').length}</h2>
              <span>Professors & Staff</span>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Users Table */}
      <Card className="users-table-card">
        <Card.Header>
          <h5>User Management</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Privilege Level</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-name">{user.first_name} {user.last_name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{user.department || '-'}</td>
                    <td>
                      <Badge bg="info">{user.privilege_level}</Badge>
                    </td>
                    <td>{getStatusBadge(user.is_active)}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Button variant="outline-primary" size="sm">Edit</Button>
                        <Button variant="outline-danger" size="sm">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add User Modal */}
      <Modal show={showAddUser} onHide={() => setShowAddUser(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select>
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control type="text" placeholder="Enter department" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddUser(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
