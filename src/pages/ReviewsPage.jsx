import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
  const reviews = [
    {
      name: 'Arun Mehta',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      photo: '/Images/rev1.webp',
      review: 'Interior Insight helped me create the perfect blend of modern and traditional elements in my Mumbai apartment. The AI suggestions for incorporating Warli art and contemporary furniture were spot-on!',
      projectType: 'Apartment Redesign'
    },
    {
      name: 'Deepika Reddy',
      location: 'Bangalore, Karnataka',
      rating: 5,
      photo: '/Images/rev2.webp',
      review: 'The 3D visualization feature helped me perfectly plan my villa\'s interior. The AI understood exactly how to incorporate South Indian elements while maintaining a modern aesthetic.',
      projectType: 'Villa Design'
    },
    {
      name: 'Rajesh & Priya Gupta',
      location: 'Delhi, NCR',
      rating: 5,
      photo: '/Images/lvhp.jpg',
      review: 'We were amazed by how the AI tool suggested perfect color combinations inspired by Indian festivals for our living room. The consultation service was extremely helpful!',
      projectType: 'Living Room Makeover'
    },
    {
      name: 'Kavita Sharma',
      location: 'Jaipur, Rajasthan',
      rating: 5,
      photo: '/Images/rev2.jpg',
      review: 'Interior Insight helped me modernize my traditional haveli while preserving its Rajasthani charm. The AI\'s understanding of local architectural elements was impressive.',
      projectType: 'Heritage Home Modernization'
    },
    {
      name: 'Siddharth Iyer',
      location: 'Chennai, Tamil Nadu',
      rating: 5,
      photo: '/Images/6.jpg',
      review: 'Transformed my office space with a perfect mix of contemporary design and traditional South Indian elements. The Vastu compliance feature was particularly useful.',
      projectType: 'Office Interior Design'
    },
    {
      name: 'Amrita Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      photo: '/Images/rev7.jpg',
      review: 'The platform\'s understanding of Gujarati design elements is remarkable. Created a perfect modern home while incorporating traditional patterns and motifs.',
      projectType: 'Complete Home Design'
    },
    {
      name: 'Zara Khan',
      location: 'Hyderabad, Telangana',
      rating: 5,
      photo: '/Images/img.jpg',
      review: 'Interior Insight\'s AI perfectly captured the Nizami essence in my apartment\'s design. The blend of Islamic architecture with modern amenities is exactly what I wanted.',
      projectType: 'Luxury Apartment Design'
    },
    {
      name: 'Vikram & Meera Malhotra',
      location: 'Kolkata, West Bengal',
      rating: 5,
      photo: '/Images/rev4.jpg',
      review: 'Our Bengali-style bungalow got a perfect contemporary makeover while retaining its colonial charm. The AI\'s suggestions for incorporating local art pieces were brilliant.',
      projectType: 'Heritage Bungalow Renovation'
    },
    {
      name: 'Anjali Menon',
      location: 'Kochi, Kerala',
      rating: 5,
      photo: '/Images/rev8.jpg',
      review: 'The platform helped me create a modern Kerala-style home. The suggestions for wooden elements and traditional layouts while maintaining a contemporary feel were perfect.',
      projectType: 'Traditional Modern Home'
    },
  
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>Client Reviews</h1>
          <p>See how we've transformed spaces across India</p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <BackToHomeButton to="/">
          <i className="fas fa-arrow-left"></i> Back to Home
        </BackToHomeButton>
        <ReviewsGrid>
          {reviews.map((review, index) => (
            <ReviewCard key={index}>
              <ProjectImage src={review.photo} alt={review.projectType} />
              <ReviewContent>
                <ProjectType>{review.projectType}</ProjectType>
                <Rating>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i}>★</Star>
                  ))}
                </Rating>
                <ReviewText>"{review.review}"</ReviewText>
                <ReviewerInfo>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewerLocation>{review.location}</ReviewerLocation>
                </ReviewerInfo>
              </ReviewContent>
            </ReviewCard>
          ))}
        </ReviewsGrid>
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
    url('/assets/reviews-hero.svg');
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

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ReviewContent = styled.div`
  padding: 2rem;
`;

const ProjectType = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  margin-bottom: 1rem;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
  margin-right: 2px;
`;

const ReviewText = styled.p`
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const ReviewerInfo = styled.div`
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const ReviewerName = styled.h4`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ReviewerLocation = styled.p`
  color: #666;
  font-size: 0.9rem;
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

export default ReviewsPage;