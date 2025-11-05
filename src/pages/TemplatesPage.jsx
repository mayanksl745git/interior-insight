import React from 'react';
import styled from 'styled-components';

const TemplatesPageContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    color: #343a40;
  }

  p {
    font-size: 1.2rem;
    color: #6c757d;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-size: 2rem;
    color: #495057;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 0.5rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CategoryCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    padding: 1rem;
  }

  p {
    font-size: 1rem;
    color: #6c757d;
    padding: 0 1rem 1rem;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TemplateCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    padding: 1rem;
  }

  p {
    font-size: 1rem;
    color: #6c757d;
    padding: 0 1rem 1rem;
  }
`;

const TemplatesPage = () => {
  const categories = [
    { name: 'Living Room', description: 'Modern, cozy, and stylish living room designs.', image: '/Images/living1.jpg' },
    { name: 'Kitchen', description: 'Functional and beautiful kitchen layouts.', image: '/Images/kiten1.avif' },
    { name: 'Bedroom', description: 'Comfortable and serene bedroom designs.', image: '/Images/bd1.jpg' },
    { name: 'Bathroom', description: 'Elegant and practical bathroom solutions.', image: '/Images/bath1.jpg' },
    { name: 'Home Office', description: 'Productive and inspiring home office setups.', image: '/Images/office1.jpg' },
  ];

  const templates = [
    { name: 'Minimalist Haven', category: 'Living Room', image: '/Images/living2.jpg' },
    { name: 'Urban Chic', category: 'Living Room', image: '/Images/living3.jpg' },
    { name: 'Gourmet Kitchen', category: 'Kitchen', image: '/Images/kt2.jpg' },
    { name: 'Modern Farmhouse', category: 'Kitchen', image: '/Images/kt3.jpg' },
    { name: 'Serene Slumber', category: 'Bedroom', image: '/Images/bd2.jpg' },
    { name: 'Peaceful Retreat', category: 'Bedroom', image: '/Images/bd3.jpg' },
  ];

  return (
    <TemplatesPageContainer>
      <Header>
        <h1>Design Templates & Categories</h1>
        <p>Explore our wide range of design templates and categories to find the perfect inspiration for your space.</p>
      </Header>

      <Section>
        <h2>Design Categories</h2>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.name}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Section>

      <Section>
        <h2>Featured Templates</h2>
        <TemplatesGrid>
          {templates.map(template => (
            <TemplateCard key={template.name}>
              <img src={template.image} alt={template.name} />
              <h3>{template.name}</h3>
              <p>{template.category}</p>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      </Section>
    </TemplatesPageContainer>
  );
};

export default TemplatesPage;