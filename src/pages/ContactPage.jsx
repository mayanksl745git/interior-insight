import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential',
    propertySize: '',
    budget: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Consultation request:', formData);
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>Contact Us</h1>
          <p>Get in Touch for personalized Interior Design Solutions</p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <BackToHomeButton to="/">
          <i className="fas fa-arrow-left"></i> Back to Home
        </BackToHomeButton>
        <ContactGrid>
          <ContactInfo>
            <h2>Get in Touch</h2>
            <p>
              Transform your space with expert guidance. Book a consultation with our
              experienced interior designers for personalized solutions.
            </p>

            <ContactDetails>
              <DetailItem>
                <Icon>📍</Icon>
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Design Street, Outer Ring Road<br />Muzaffarnagar, Uttar Pradesh, 251002</p>
                </div>
              </DetailItem>

              <DetailItem>
                <Icon>📞</Icon>
                <div>
                  <h3>Call Us</h3>
                  <p>+91 98765 *****<br />Mon-Sat, 9:00 AM - 6:00 PM IST</p>
                </div>
              </DetailItem>

              <DetailItem>
                <Icon>📧</Icon>
                <div>
                  <h3>Email Us</h3>
                  <p>consult@interiorinsight.com<br />support@interiorinsight.com</p>
                </div>
              </DetailItem>
            </ContactDetails>
          </ContactInfo>

          <ConsultationForm onSubmit={handleSubmit}>
            <h2>Book Design Consultancy</h2>
            {submitted ? (
              <SuccessMessage>
                Thank you for your interest! We'll contact you within 24 hours to confirm your consultation.
              </SuccessMessage>
            ) : (
              <FormGrid>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Project Type *</Label>
                  <Select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Property Size (sq ft) *</Label>
                  <Input
                    type="number"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Budget Range (₹) *</Label>
                  <Select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Budget Range</option>
                    <option value="2-5L">₹2-5 Lakhs</option>
                    <option value="5-10L">₹5-10 Lakhs</option>
                    <option value="10-20L">₹10-20 Lakhs</option>
                    <option value="20L+">₹20+ Lakhs</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Date *</Label>
                  <Input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Time *</Label>
                  <Select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time Slot</option>
                    <option value="9-11">9:00 AM - 11:00 AM</option>
                    <option value="11-1">11:00 AM - 1:00 PM</option>
                    <option value="2-4">2:00 PM - 4:00 PM</option>
                    <option value="4-6">4:00 PM - 6:00 PM</option>
                  </Select>
                </FormGroup>

                <FormGroup fullWidth>
                  <Label>Additional Details</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us more about your project requirements..."
                  />
                </FormGroup>

                <SubmitButton type="submit">Book Consultation</SubmitButton>
              </FormGrid>
            )}
          </ConsultationForm>
        </ContactGrid>
      </ContentSection>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const HeroSection = styled.div`
  height: 300px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/assets/contact-hero.svg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-family: var(--font-heading);
  }

  p {
    font-size: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  > p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const ConsultationForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a3f5f;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #e8f5e9;
  border-radius: 8px;
  color: #2e7d32;
  font-size: 1.1rem;
`;

const BackToHomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 20px;
  background-color: #f8f4e3;
  color: #333;
  border: 2px solid #d4a373;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #d4a373;
    color: #fff;
  }
  
  i {
    margin-right: 8px;
  }
`;

export default ContactPage;