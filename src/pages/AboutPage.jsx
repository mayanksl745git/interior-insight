import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>About Interior Insight</h1>
          <p>Transforming spaces with innovative design solutions</p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <BackToHomeButton to="/">
          <i className="fas fa-arrow-left"></i> Back to Home
        </BackToHomeButton>
        
        <AboutSection>
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Interior Insight was born from a passion for creating beautiful, 
            functional spaces that reflect the unique personality and needs of each client. 
            What began as a small design studio has grown into a comprehensive interior design 
            platform that leverages cutting-edge AI technology to make professional design 
            accessible to everyone.
          </p>
          <p>
            Our journey started when our founder, Mayank Singhal, an experienced interior designer himself, 
            recognized that many people struggled to visualize how their spaces could be 
            transformed. He saw an opportunity to combine his design expertise with 
            emerging AI technology to create a revolutionary approach to interior design.
          </p>
          <p>
            Together with partners Nandani and Aditi, Mayank has built Interior Insight into a 
            platform that combines artistic vision with technological innovation. Our team of designers, 
            developers, and AI specialists work together to create a seamless experience that helps 
            clients bring their dream spaces to life.
          </p>
        </AboutSection>

        <TeamSection>
          <h2>Our Team</h2>
          <TeamGrid>
            <TeamMember>
              <TeamMemberImage src="/Images/Mikk.jpg" alt="Mayank Singhal" />
              <h3>Mayank Singhal</h3>
              <p>Founder & CEO</p>
              <p>With over 5 years of experience in interior design and technology, Mayank leads our company with vision and innovation.</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/Images/NB.jpg" alt="Nandani Bisht" />
              <h3>Nandani Bisht</h3>
              <p>Technology Lead</p>
              <p>Nandani oversees the development of our AI design tools, making sure they deliver exceptional results for our clients.</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/Images/aditi1.jpg" alt="Aditi Sharma" />
              <h3>Aditi Sharma</h3>
              <p>Creative Director</p>
              <p>Aditi's innovative approach and eye for detail ensure that each design is both beautiful and functional.</p>
            </TeamMember>
          </TeamGrid>
        </TeamSection>

        <FlowchartSection>
          <h2>How Interior Insight Works</h2>
          <p>Our innovative platform combines AI technology with design expertise to create personalized interior designs.</p>
          
          <Flowchart>
            <FlowchartStep>
              <FlowchartIcon><i className="fas fa-user"></i></FlowchartIcon>
              <FlowchartContent>
                <h3>Step 1: Create Account</h3>
                <p>Sign up and tell us about your style preferences and needs</p>
              </FlowchartContent>
            </FlowchartStep>
            <FlowchartArrow><i className="fas fa-arrow-down"></i></FlowchartArrow>
            
            <FlowchartStep>
              <FlowchartIcon><i className="fas fa-image"></i></FlowchartIcon>
              <FlowchartContent>
                <h3>Step 2: Upload Your Space</h3>
                <p>Upload photos of your room or choose from our templates</p>
              </FlowchartContent>
            </FlowchartStep>
            <FlowchartArrow><i className="fas fa-arrow-down"></i></FlowchartArrow>
            
            <FlowchartStep>
              <FlowchartIcon><i className="fas fa-robot"></i></FlowchartIcon>
              <FlowchartContent>
                <h3>Step 3: AI Design Generation</h3>
                <p>Our AI analyzes your space and creates multiple design options</p>
              </FlowchartContent>
            </FlowchartStep>
            <FlowchartArrow><i className="fas fa-arrow-down"></i></FlowchartArrow>
            
            <FlowchartStep>
              <FlowchartIcon><i className="fas fa-edit"></i></FlowchartIcon>
              <FlowchartContent>
                <h3>Step 4: Customize Your Design</h3>
                <p>Refine your favorite design with our easy-to-use tools</p>
              </FlowchartContent>
            </FlowchartStep>
            <FlowchartArrow><i className="fas fa-arrow-down"></i></FlowchartArrow>
            
            <FlowchartStep>
              <FlowchartIcon><i className="fas fa-shopping-cart"></i></FlowchartIcon>
              <FlowchartContent>
                <h3>Step 5: Shop Your Design</h3>
                <p>Purchase furniture and decor items directly through our platform</p>
              </FlowchartContent>
            </FlowchartStep>
          </Flowchart>
        </FlowchartSection>

        <MissionSection>
          <h2>Our Mission</h2>
          <p>
            At Interior Insight, our mission is to democratize interior design by making professional 
            design services accessible, affordable, and enjoyable for everyone. We believe that 
            everyone deserves to live and work in spaces that inspire them and enhance their daily lives.
          </p>
          <p>At Interior Insight, our mission is to transform the way people experience interior design 
            by combining creativity with artificial intelligence. We aim to make the design process 
            effortless and accessible, allowing users to visualize and personalize their dream spaces 
            in just a few clicks. Our platform leverages AI-driven image generation to convert empty 
            rooms into beautifully designed interiors that reflect each user’s unique taste and style.
          </p>
          <p>
            Through our innovative AI-powered platform, we aim to empower individuals to transform 
            their spaces with confidence, providing them with the tools, resources, and support 
            they need to bring their vision to life.
          </p>
        </MissionSection>

        <ValuesSection>
          <h2>Our Values</h2>
          <ValuesList>
            <Value>
              <h3>Innovation</h3>
              <p>We continuously explore new technologies and design approaches to provide cutting-edge solutions.</p>
            </Value>
            <Value>
              <h3>Accessibility</h3>
              <p>We believe great design should be accessible to everyone, regardless of budget or location.</p>
            </Value>
            <Value>
              <h3>Sustainability</h3>
              <p>We are committed to promoting sustainable design practices that minimize environmental impact.</p>
            </Value>
            <Value>
              <h3>Client-Centered</h3>
              <p>We prioritize our clients' needs, preferences, and satisfaction in everything we do.</p>
            </Value>
          </ValuesList>
        </ValuesSection>
      </ContentSection>
    </PageContainer>
  );
};

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
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #d4a373;
    color: #fff;
  }
  
  i {
    margin-right: 8px;
  }
`;

const FlowchartSection = styled.section`
  margin: 60px 0;
  padding: 30px;
  background-color: #f8f4e3;
  border-radius: 10px;
`;

const Flowchart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const FlowchartStep = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #d4a373;
  border-radius: 10px;
  margin: 10px 0;
`;

const FlowchartIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #d4a373;
  border-radius: 50%;
  margin-right: 20px;
  color: white;
  font-size: 24px;
`;

const FlowchartContent = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 10px 0;
    color: #6b705c;
  }
  
  p {
    margin: 0;
    color: #333;
  }
`;

const FlowchartArrow = styled.div`
  font-size: 24px;
  color: #d4a373;
  margin: 10px 0;
`;

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const HeroSection = styled.div`
  height: 50vh;
  background-image: url('/Images/interior-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 0 20px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 20px;
`;

const AboutSection = styled.div`
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 1.5rem;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
    text-align: center;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem;
    color: #333;
    padding: 0 1.5rem;
  }
  
  p {
    color: #666;
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
    
    &:first-of-type {
      color: #0077cc;
      font-weight: 600;
      margin-bottom: 1rem;
    }
  }
`;

const TeamMemberImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MissionSection = styled.div`
  margin-bottom: 4rem;
  background-color: #f5f5f5;
  padding: 3rem;
  border-radius: 10px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 1.5rem;
  }
`;

const ValuesSection = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
    text-align: center;
  }
`;

const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const Value = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #0077cc;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }
`;

export default AboutPage;