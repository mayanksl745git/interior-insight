import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/HomePage.css';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--accent-color);
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

const HeroSection = styled.div`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/Images/hpbg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    
    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    
    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-buttons {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    
    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


const Button = styled.button`
  padding: ${props => props.$large ? '1rem 2.5rem' : '0.8rem 2rem'};
  font-size: ${props => props.$large ? '1.2rem' : '1rem'};
  background: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: white;
  border: 2px solid ${props => props.$primary ? 'var(--primary-color)' : 'white'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    background: ${props => props.$primary ? '#ff6b6b' : '#4ecdc4'};
    border-color: ${props => props.$primary ? '#ff6b6b' : '#4ecdc4'};
    color: ${props => props.$primary ? 'white' : '#333'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.$alternate ? 'var(--light-bg)' : 'white'};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
`;









const StyledLink = styled(Link)`
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    color: var(--accent-color);
  }
`;





const HomePage = () => {
  useEffect(() => {
    // Add animation classes after component mounts
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const buttons = document.querySelector('.hero-buttons');
    
    setTimeout(() => {
      title.classList.add('fade-in');
      setTimeout(() => {
        subtitle.classList.add('fade-in');
        setTimeout(() => {
          buttons.classList.add('fade-in');
        }, 400);
      }, 400);
    }, 200);
  }, []);

  return (
    <HomeContainer>
      <Navbar>
        <Logo>Interior Insight</Logo>
        <NavLinks>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/reviews">Reviews</StyledLink>
          <StyledLink to="/contact">Contact Us</StyledLink>
          <StyledLink to="/ai-design-explanation">AI Designer</StyledLink>
        </NavLinks>
      </Navbar>
      
      <HeroSection>
        <HeroContent>
          <h1 className="hero-title">Transform Your Space with AI</h1>
          <p className="hero-subtitle">Discover the perfect interior design for your Dream home with our AI-powered platform</p>
          <div className="hero-buttons">
            <Link to="/login">
              <Button $primary>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </HeroContent>
      </HeroSection>

      <Section id="about">
        <SectionTitle>About Interior Insight</SectionTitle>
        <SectionContent className="text-center">
          <p>
            Interior Insight is an AI-powered interior design platform that helps you visualize and create
            your dream living spaces. Our cutting-edge technology allows you to generate stunning interior designs
            based on your preferences, upload your own spaces for redesign, and explore a vast gallery of
            professionally designed interiors.
          </p>
          <p>
            Through smart image-to-design transformation, Interior Insight allows users to upload an empty 
            space and receive visually rich, context-aware interior designs within seconds. The platform provides 
            endless design possibilities, offering flexibility in themes, color palettes, layouts, and aesthetics — 
            helping both professionals and individuals create spaces that truly reflect their vision.We believe that interior design should be accessible, efficient, and inspiring. With our focus on usability, 
            innovation, and realism, Interior Insight bridges the gap between imagination and execution, turning 
            abstract ideas into beautiful, AI-generated designs that feel both personal and practical.
          </p>
          <p>
            Whether you're renovating your home, moving into a new space, or just looking for inspiration,
            Interior Insight provides the tools and resources you need to bring your vision to life.
          </p>
        </SectionContent>
      </Section>

      <Section id="dream-space">
        <SectionTitle>Create Your Dream Space</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-magic"></i>
            </FeatureIcon>
            <FeatureTitle>AI-Powered Design</FeatureTitle>
            <FeatureDescription className="text-center">
              Our advanced AI algorithms analyze thousands of professional designs to create personalized recommendations that match your style preferences and space requirements.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-cube"></i>
            </FeatureIcon>
            <FeatureTitle>3D Visualization</FeatureTitle>
            <FeatureDescription>
              Experience your new space in immersive 3D before making any real-world changes. Walk through your design and see exactly how everything fits together.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-paint-brush"></i>
            </FeatureIcon>
            <FeatureTitle>Customizable Styles</FeatureTitle>
            <FeatureDescription>
              Choose from modern, minimalist, traditional, industrial, and many more design styles. Mix and match elements to create a space that's uniquely yours.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-shopping-cart"></i>
            </FeatureIcon>
            <FeatureTitle>Product Recommendations</FeatureTitle>
            <FeatureDescription>
              Get personalized product suggestions that match your design, with options for every budget. From furniture to decor, we've got you covered.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
        <CTAContainer>
          <Link to="/login">
            <Button $primary $large>Start Designing Now</Button>
          </Link>
        </CTAContainer>
      </Section>

      <Section id="ai-workflow" $alternate>
        <SectionTitle>How Our AI Works</SectionTitle>
        <WorkflowContainer>
          <WorkflowStep>
            <StepNumber>1</StepNumber>
            <StepTitle>Upload Your Space</StepTitle>
            <StepDescription>Upload photos or measurements of your room to create a digital canvas.</StepDescription>
          </WorkflowStep>
          <WorkflowStep>
            <StepNumber>2</StepNumber>
            <StepTitle>Set Preferences</StepTitle>
            <StepDescription>Choose your style, budget, and specific requirements for the space.</StepDescription>
          </WorkflowStep>
          <WorkflowStep>
            <StepNumber>3</StepNumber>
            <StepTitle>AI Generation</StepTitle>
            <StepDescription>Our AI analyzes your inputs and generates multiple design options.</StepDescription>
          </WorkflowStep>
          <WorkflowStep>
            <StepNumber>4</StepNumber>
            <StepTitle>Customize Design</StepTitle>
            <StepDescription>Fine-tune the generated designs to match your vision perfectly.</StepDescription>
          </WorkflowStep>
          <WorkflowStep>
            <StepNumber>5</StepNumber>
            <StepTitle>Visualize & Implement</StepTitle>
            <StepDescription>View your design in 3D and get detailed implementation guides.</StepDescription>
          </WorkflowStep>
        </WorkflowContainer>
      </Section>

      <Section id="showcase">
        <SectionTitle>Design Categories</SectionTitle>
        <DesignShowcase>
          <DesignCard>
            <DesignImage src="/Images/lvhp.jpg" />
            <DesignTitle>Living Room Designs</DesignTitle>
            <Link to="/templates">
              <CategoryButton>Explore</CategoryButton>
            </Link>
          </DesignCard>
          <DesignCard>
            <DesignImage src="/Images/bdhp.jpg" />
            <DesignTitle>Bedroom Designs</DesignTitle>
            <Link to="/templates">
                <CategoryButton>Explore</CategoryButton>
              </Link>
          </DesignCard>
          <DesignCard>
            <DesignImage src="/Images/mk3.jpg" />
            <DesignTitle>Kitchen Designs</DesignTitle>
            <Link to="/templates">
                <CategoryButton>Explore</CategoryButton>
              </Link>
          </DesignCard>
          <DesignCard>
            <DesignImage src="/Images/14.jpg" />
            <DesignTitle>Home Office Designs</DesignTitle>
            <Link to="/templates">
                <CategoryButton>Explore</CategoryButton>
              </Link>
          </DesignCard>
          <DesignCard>
            <DesignImage src="Images/bl1.jpg" />
            <DesignTitle>Balcony Patterns</DesignTitle>
            <Link to="/templates">
                <CategoryButton>Explore</CategoryButton>
              </Link>
          </DesignCard>
          <DesignCard>
            <DesignImage src="/Images/bath4.jpg" />
            <DesignTitle>Bathroom Designs</DesignTitle>
            <Link to="/dashboard">
              <CategoryButton>Explore</CategoryButton>
            </Link>
          </DesignCard>
        </DesignShowcase>
      </Section>

      <Section id="reviews" $alternate>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <ReviewsContainer>
          <ReviewCard>
            <ReviewText>
              "Interior Insight transformed my living room completely! The AI suggestions were spot on and
              I loved being able to customize every detail."
            </ReviewText>
            <ReviewAuthor>- Nimesh Patel (Gujarat)</ReviewAuthor>
          </ReviewCard>
          <ReviewCard>
            <ReviewText>
              "As an interior design enthusiast with limited skills, this platform was a game-changer.
              The 3D previews helped me visualize exactly how my space would look."
            </ReviewText>
            <ReviewAuthor>- Jaspreet Kaur (Mohali)</ReviewAuthor>
          </ReviewCard>
          <ReviewCard>
            <ReviewText className="text-justify">
              "The product recommendations saved me hours of searching online. Everything I needed was
              right there with options for every budget."
            </ReviewText>
            <ReviewAuthor>- Vanraj Gupt (Delhi)</ReviewAuthor>
          </ReviewCard>
        </ReviewsContainer>
      </Section>

      <Section id="consultancy" $alternate>
        <SectionTitle>Expert Design Consultancy</SectionTitle>
        <ConsultancyContainer>
          <ConsultancyInfo>
            <h3>Work with Our Expert Designers</h3>
            <p>Get personalized guidance from our team of experienced interior designers who specialize in:</p>
            <ExpertiseList>
              <ExpertiseItem>Residential Interior Design</ExpertiseItem>
              <ExpertiseItem>Commercial Space Planning</ExpertiseItem>
              <ExpertiseItem>Vastu-Compliant Designs</ExpertiseItem>
              <ExpertiseItem>Sustainable Interior Solutions</ExpertiseItem>
            </ExpertiseList>
            <Link to="/contact">
              <Button $primary $large>Book a Consultation</Button>
            </Link>
          </ConsultancyInfo>
          <DesignerProfiles>
            <DesignerCard>
              <DesignerPhoto src="/Images/Mikk.jpg" alt="Mayank Singhal" />
              <DesignerInfo>
                <h4>Mayank Singhal</h4>
                <p>Lead Interior Designer</p>
              </DesignerInfo>
            </DesignerCard>
            <DesignerCard>
              <DesignerPhoto src="/Images/NB.jpg" alt="Nandani Bisht" />
              <DesignerInfo>
                <h4>Nandani Bisht</h4>
                <p>AI Design Expert</p>
              </DesignerInfo>
            </DesignerCard>
             <DesignerCard>
              <DesignerPhoto src="/Images/aditi1.jpg" alt="Aditi Sharma" />
              <DesignerInfo>
                <h4>Aditi Sharma</h4>
                <p>DataBase Head</p>
              </DesignerInfo>
            </DesignerCard>
          </DesignerProfiles>
        </ConsultancyContainer>
      </Section>

      <Section id="partners">
        <SectionTitle>Our Partners & Collaborators</SectionTitle>
        <PartnersGrid>
          <PartnerLogo src="/Images/pt1.png" alt="Partner 1" />
          <PartnerLogo src="/Images/pt3.png" alt="Partner 2" />
          <PartnerLogo src="/Images/pt2.png" alt="Partner 3" />
          <PartnerLogo src="/Images/pt4.png" alt="Partner 4" />
        </PartnersGrid>
      </Section>

      <Section id="start-journey" $alternate>
        <JourneySection>
          <h2>Start Your Design Journey Today</h2>
          <p>Transform your space with AI-powered interior design solutions</p>
          <Link to="/login">
            <Button $primary $large>Begin Your Journey</Button>
          </Link>
        </JourneySection>
      </Section>

      <Footer>
        <FooterGrid>
          <FooterSection>
            <h4>Documentation</h4>
            <FooterLink href="/docs/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/docs/terms">Terms of Service</FooterLink>
            <FooterLink href="/docs/data-protection">Data Protection</FooterLink>
            <FooterLink href="/docs/user-agreement">User Agreement Policy</FooterLink>
          </FooterSection>
          <FooterSection>
            <h4>Connect With Us</h4>
            <SocialLinks>
              <SocialLink href="https://facebook.com/interiorinsight" target="_blank">
                <i className="fab fa-facebook"></i>
              </SocialLink>
              <SocialLink href="https://instagram.com/interiorinsight" target="_blank">
                <i className="fab fa-instagram"></i>
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/interiorinsight" target="_blank">
                <i className="fab fa-linkedin"></i>
              </SocialLink>
              <SocialLink href="https://pinterest.com/interiorinsight" target="_blank">
                <i className="fab fa-pinterest"></i>
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} Interior Insight. All rights reserved.</p>
        </FooterBottom>
      </Footer>
    </HomeContainer>
  );
};









const SectionContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ReviewText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const ReviewAuthor = styled.p`
  font-weight: 600;
  color: var(--primary-color);
  text-align: right;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
  }
  
  input, textarea {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: var(--font-body);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

const WorkflowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WorkflowStep = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 auto 1rem;
`;

const StepTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const DesignShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DesignCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DesignImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const DesignTitle = styled.h3`
  padding: 1.5rem;
  text-align: center;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const CategoryButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  margin-top: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6b6b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ConsultancyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ConsultancyInfo = styled.div`
  h3 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }
`;

const ExpertiseList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const ExpertiseItem = styled.li`
  padding: 0.8rem 0;
  font-size: 1.1rem;
  color: #444;
  display: flex;
  align-items: center;

  &:before {
    content: '✓';
    color: var(--accent-color);
    margin-right: 1rem;
    font-weight: bold;
  }
`;

const DesignerProfiles = styled.div`
  display: grid;
  gap: 2rem;
`;

const DesignerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DesignerPhoto = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const DesignerInfo = styled.div`
  h4 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
`;

const PartnerLogo = styled.img`
  width: 100%;
  max-width: 180px;
  height: auto;
  margin: 0 auto;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const JourneySection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
`;

const Footer = styled.footer`
  background-color: var(--dark-color);
  color: white;
  padding: 4rem 2rem 2rem;
  margin-top: auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h4 {
    color: var(--accent-color);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const FooterLink = styled.a`
  color: #aaa;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  
  i {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const CTAContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export default HomePage;