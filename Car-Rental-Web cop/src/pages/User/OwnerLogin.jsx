import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  Nav, 
  Tab, 
  Alert,
  Row,
  Col
} from 'react-bootstrap';
import { 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaCreditCard, 
  FaBuilding,
  FaMapMarkerAlt
} from 'react-icons/fa';

// Login Form Component
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add login logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <div className="position-relative">
          <FaEnvelope className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            type="email"
            style={{ paddingLeft: '35px' }}
            value={loginData.email}
            onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="position-relative">
          <FaLock className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            type="password"
            style={{ paddingLeft: '35px' }}
            value={loginData.password}
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
          />
        </div>
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        disabled={isLoading}
        className="w-100"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Form>
  );
};

// Registration Form Component
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    serviceType: 'INDIVIDUAL',
    bank_name: '',
    bank_account: '',
    description: '',
    business_img: null,
    registration_date: '',
    vat: '',
    issuing_location: '',
    date_of_issue: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.bank_name) {
      newErrors.bank_name = 'Bank name is required';
    }

    if (!formData.bank_account) {
      newErrors.bank_account = 'Bank account number is required';
    }

    if (formData.serviceType === 'BUSINESS') {
      if (!formData.description) {
        newErrors.description = 'Business description is required';
      }
      if (!formData.vat) {
        newErrors.vat = 'VAT is required';
      } else if (isNaN(formData.vat) || formData.vat < 0) {
        newErrors.vat = 'VAT must be a positive number';
      }
      if (!formData.registration_date) {
        newErrors.registration_date = 'Registration date is required';
      }
      if (!formData.issuing_location) {
        newErrors.issuing_location = 'Issuing location is required';
      }
      if (!formData.date_of_issue) {
        newErrors.date_of_issue = 'Date of issue is required';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // API call would go here
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        business_img: file
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Account Type</Form.Label>
        <Form.Select
          value={formData.serviceType}
          onChange={(e) => handleChange({ target: { name: 'serviceType', value: e.target.value }})}
        >
          <option value="INDIVIDUAL">Individual</option>
          <option value="BUSINESS">Business</option>
        </Form.Select>
      </Form.Group>

      {/* Common Fields */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <div className="position-relative">
          <FaEnvelope className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            name="email"
            type="email"
            style={{ paddingLeft: '35px' }}
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <div className="position-relative">
          <FaPhone className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            name="phone"
            style={{ paddingLeft: '35px' }}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      {/* Bank Information */}
      <Form.Group className="mb-3">
        <Form.Label>Bank Name</Form.Label>
        <div className="position-relative">
          <FaCreditCard className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            name="bank_name"
            style={{ paddingLeft: '35px' }}
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="Enter bank name"
            isInvalid={!!errors.bank_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bank_name}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bank Account Number</Form.Label>
        <div className="position-relative">
          <FaCreditCard className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            name="bank_account"
            style={{ paddingLeft: '35px' }}
            value={formData.bank_account}
            onChange={handleChange}
            placeholder="Enter bank account number"
            isInvalid={!!errors.bank_account}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bank_account}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      {formData.serviceType === 'BUSINESS' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Business Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your business"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Business Image</Form.Label>
            <Form.Control
              type="file"
              name="business_img"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>VAT (%)</Form.Label>
            <Form.Control
              type="number"
              name="vat"
              value={formData.vat}
              onChange={handleChange}
              placeholder="Enter VAT percentage"
              isInvalid={!!errors.vat}
            />
            <Form.Control.Feedback type="invalid">
              {errors.vat}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Issuing Location</Form.Label>
            <div className="position-relative">
              <FaMapMarkerAlt className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
              <Form.Control
                name="issuing_location"
                style={{ paddingLeft: '35px' }}
                value={formData.issuing_location}
                onChange={handleChange}
                placeholder="Enter issuing location"
                isInvalid={!!errors.issuing_location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.issuing_location}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control
                  type="date"
                  name="registration_date"
                  value={formData.registration_date}
                  onChange={handleChange}
                  isInvalid={!!errors.registration_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registration_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Date of Issue</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_issue"
                  value={formData.date_of_issue}
                  onChange={handleChange}
                  isInvalid={!!errors.date_of_issue}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date_of_issue}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="position-relative">
          <FaLock className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            type="password"
            name="password"
            style={{ paddingLeft: '35px' }}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <div className="position-relative">
          <FaLock className="position-absolute" style={{ left: '10px', top: '12px', color: '#6c757d' }} />
          <Form.Control
            type="password"
            name="confirmPassword"
            style={{ paddingLeft: '35px' }}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        disabled={isSubmitting}
        className="w-100"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </Form>
  );
};

// Main Authentication Component
const OwnerLogin = () => {
  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Header>   
          <h2 className="text-center mb-0">Vehicle Rental Platform</h2>
        </Card.Header>
        <Card.Body>
          <Tab.Container defaultActiveKey="login">
            <Nav variant="pills" className="mb-3">
              <Nav.Item className="w-50">
                <Nav.Link eventKey="login" className="text-center">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-50">
                <Nav.Link eventKey="register" className="text-center">Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <RegistrationForm />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OwnerLogin;