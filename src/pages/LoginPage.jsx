import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('https://interior-insight.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json();
      
      // Save user data and token to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('userToken', data.token);
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <BackgroundOverlay />
      <BackToHomeButton to="/">
        <i className="fas fa-arrow-left"></i> Back to Home
      </BackToHomeButton>
      <LoginContainer>
        <LogoContainer>
          <Link to="/">
            <LogoText>Interior Insight</LogoText>
          </Link>
        </LogoContainer>
        
        <FormCard>
          <FormHeader>Welcome Back</FormHeader>
          <FormSubheader>Log in to your account</FormSubheader>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </FormGroup>
            
            <ForgotPassword to="#">Forgot password?</ForgotPassword>
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </SubmitButton>
          </Form>
          
          <OrDivider>
            <OrLine />
            <OrText>OR</OrText>
            <OrLine />
          </OrDivider>
          
          <SocialLoginContainer>
            <SocialButton $google onClick={() => console.log('Google login')}>
              <i className="fab fa-google"></i> Continue with Google
            </SocialButton>
            <SocialButton $facebook onClick={() => console.log('Facebook login')}>
              <i className="fab fa-facebook-f"></i> Continue with Facebook
            </SocialButton>
          </SocialLoginContainer>
          
          <SignupPrompt>
            Don't have an account? <SignupLink to="/signup">Sign up</SignupLink>
          </SignupPrompt>
        </FormCard>
      </LoginContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/assets/login-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BackToHomeButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 450px;
  z-index: 2;
  padding: 0 1.5rem;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideInUp 0.8s ease-out;
`;

const FormHeader = styled.h2`
  font-size: 2rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const FormSubheader = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--dark-color);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ForgotPassword = styled(Link)`
  align-self: flex-end;
  font-size: 0.9rem;
  color: var(--primary-color);
  text-decoration: none;
  margin-bottom: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
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

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SignupPrompt = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: #666;
`;

const SignupLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const OrLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
`;

const OrText = styled.span`
  padding: 0 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: ${props => props.$google ? '#fff' : '#3b5998'};
  color: ${props => props.$google ? '#333' : '#fff'};
  border: ${props => props.$google ? '1px solid #ddd' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  i {
    font-size: 1.2rem;
  }
`;

export default LoginPage;