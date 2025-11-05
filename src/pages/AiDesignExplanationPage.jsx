import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AiDesignExplanationPage = () => {
  return (
    <PageContainer>
      <Header>
        <Logo to="/">Interior Insight</Logo>
        <BackButton to="/ai-design">Back to AI Design</BackButton>
      </Header>
      
      <ContentContainer>
        <Title>How Our AI Design Works</Title>
        
        <Section>
          <SectionTitle>The Power of AI in Interior Design</SectionTitle>
          <Paragraph>
            Our AI-powered design system uses advanced machine learning algorithms to transform your space. 
            By analyzing thousands of professional interior designs, our AI can generate personalized 
            recommendations that match your style preferences and room specifications.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>The Design Process</SectionTitle>
          <ProcessContainer>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepTitle>Upload Your Space</StepTitle>
              <StepDescription>
                Start by uploading photos of your room. Our AI works best with clear, well-lit images 
                that show the entire space.
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepTitle>Define Your Style</StepTitle>
              <StepDescription>
                Select your preferred design style and add any specific requirements or preferences 
                you have for the space.
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepTitle>AI Generation</StepTitle>
              <StepDescription>
                Our AI analyzes your space and generates multiple design concepts that match your style 
                and work with your existing room layout.
              </StepDescription>
            </ProcessStep>
            
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepTitle>Customize & Refine</StepTitle>
              <StepDescription>
                Review the generated designs and make adjustments. You can modify colors, furniture, 
                and accessories to perfect your space.
              </StepDescription>
            </ProcessStep>
          </ProcessContainer>
        </Section>
        
        <Section>
          <SectionTitle>Technology Behind the Magic</SectionTitle>
          <Paragraph>
            Our AI design system combines computer vision, deep learning, and 3D rendering technologies:
          </Paragraph>
          <FeatureList>
            <Feature>
              <FeatureTitle>Computer Vision</FeatureTitle>
              <FeatureDescription>
                Analyzes your room's dimensions, lighting conditions, and existing features
              </FeatureDescription>
            </Feature>
            <Feature>
              <FeatureTitle>Style Transfer Networks</FeatureTitle>
              <FeatureDescription>
                Applies design styles while maintaining architectural integrity
              </FeatureDescription>
            </Feature>
            <Feature>
              <FeatureTitle>3D Modeling</FeatureTitle>
              <FeatureDescription>
                Creates realistic visualizations of your redesigned space
              </FeatureDescription>
            </Feature>
          </FeatureList>
        </Section>
        
        <CTASection>
          <CTATitle>Ready to Transform Your Space?</CTATitle>
          <CTAButton to="/ai-design">Start Your AI Design</CTAButton>
        </CTASection>
      </ContentContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c5282;
  text-decoration: none;
`;

const BackButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #cbd5e0;
  }
`;

const ContentContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c5282;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const ProcessContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProcessStep = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background-color: #2c5282;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.8rem;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.5;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const Feature = styled.div`
  background-color: white;
  border-left: 4px solid #2c5282;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
`;

const CTASection = styled.section`
  text-align: center;
  background-color: #ebf4ff;
  padding: 3rem 2rem;
  border-radius: 8px;
  margin-top: 3rem;
`;

const CTATitle = styled.h2`
  font-size: 1.8rem;
  color: #2c5282;
  margin-bottom: 1.5rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #2c5282;
  color: white;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #1a365d;
    transform: translateY(-2px);
  }
`;

export default AiDesignExplanationPage;