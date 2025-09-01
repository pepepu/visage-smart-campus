import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import "./pages.css";

export default function Profile({ currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    idNumber: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        course: currentUser.course || "",
        idNumber: currentUser.username || ""
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      fullName: currentUser.fullName || "",
      email: currentUser.email || "",
      course: currentUser.course || "",
      idNumber: currentUser.username || ""
    });
    setMessage({ type: "", text: "" });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        // Update local storage with new user data
        const updatedUser = { ...currentUser, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // You might want to update the parent component's currentUser state here
      } else {
        setMessage({ type: "danger", text: data.error || "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    }
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'admin': 'Administrator',
      'faculty': 'Faculty Member',
      'student': 'Student'
    };
    return roleMap[role] || role;
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    );
  };

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Profile</h1>
          <p>User profile information</p>
        </div>
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <p>Loading profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your profile information and settings</p>
      </div>

      <Container fluid>
        <Row>
          <Col lg={8} md={10} className="mx-auto">
            {message.text && (
              <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
                {message.text}
              </Alert>
            )}

            <Card className="profile-card">
              <Card.Header className="profile-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Profile Information</h3>
                  {!isEditing ? (
                    <Button variant="outline-primary" onClick={handleEdit}>
                      <i className="fas fa-edit me-2"></i>Edit Profile
                    </Button>
                  ) : (
                    <div>
                      <Button variant="outline-secondary" onClick={handleCancel} className="me-2">
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Full Name</strong></Form.Label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                        />
                      ) : (
                        <p className="form-control-plaintext">{currentUser.fullName}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>ID Number</strong></Form.Label>
                      <p className="form-control-plaintext">{currentUser.username}</p>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Email Address</strong></Form.Label>
                      {isEditing ? (
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                        />
                      ) : (
                        <p className="form-control-plaintext">{currentUser.email}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Course/Department</strong></Form.Label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          placeholder="Enter course or department"
                        />
                      ) : (
                        <p className="form-control-plaintext">{currentUser.course || "Not specified"}</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Role</strong></Form.Label>
                      <p className="form-control-plaintext">
                        {getRoleDisplayName(currentUser.role)}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Account Status</strong></Form.Label>
                      <p className="form-control-plaintext">
                        {getStatusBadge(currentUser.isActive)}
                      </p>
                    </Form.Group>
                  </Col>
                </Row>

                {currentUser.createdAt && (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Member Since</strong></Form.Label>
                        <p className="form-control-plaintext">
                          {new Date(currentUser.createdAt).toLocaleDateString()}
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>

            {/* Additional Profile Sections */}
            <Row className="mt-4">
              <Col md={6}>
                <Card className="profile-card">
                  <Card.Header>
                    <h5 className="mb-0">Account Security</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-3">Manage your account security settings</p>
                    <Button variant="outline-warning" size="sm">
                      Change Password
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="profile-card">
                  <Card.Header>
                    <h5 className="mb-0">Preferences</h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-3">Customize your system preferences</p>
                    <Button variant="outline-info" size="sm">
                      Settings
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
