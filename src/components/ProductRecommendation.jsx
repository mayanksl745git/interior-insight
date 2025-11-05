import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: ${props => props.$active ? '#333' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? '#222' : '#f5f5f5'};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h4`
  margin: 0 0 8px;
  font-size: 1rem;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c5282;
  margin-bottom: 8px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 0.9rem;

  span {
    color: #f6ad55;
  }
`;

const ShopButton = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  background: #2c5282;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 8px;
  transition: background 0.2s;

  &:hover {
    background: #1a365d;
  }
`;

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: 'Modern Sofa',
    price: 899.99,
    rating: 4.5,
    reviews: 128,
    image: '/Images/lvhp.jpg',
    category: 'furniture',
    shopUrl: '#'
  },
  {
    id: 2,
    name: 'Pendant Light',
    price: 149.99,
    rating: 4.8,
    reviews: 89,
    image: '/Images/6.jpg',
    category: 'lighting',
    shopUrl: '#'
  },
  {
    id: 3,
    name: 'Area Rug',
    price: 299.99,
    rating: 4.3,
    reviews: 156,
    image: '/Images/rev2.jpg',
    category: 'decor',
    shopUrl: '#'
  },
  {
    id: 4,
    name: 'Luxury Armchair',
    price: 699.99,
    rating: 4.7,
    reviews: 92,
    image: '/Images/rev1.webp',
    category: 'furniture',
    shopUrl: '#'
  },
  {
    id: 5,
    name: 'Mid-Range Coffee Table',
    price: 349.99,
    rating: 4.4,
    reviews: 78,
    image: '/Images/rev2.webp',
    category: 'furniture',
    shopUrl: '#'
  },
  {
    id: 6,
    name: 'Budget Wall Art',
    price: 79.99,
    rating: 4.2,
    reviews: 112,
    image: '/Images/rev7.jpg',
    category: 'decor',
    shopUrl: '#'
  },
  {
    id: 7,
    name: 'Luxury Chandelier',
    price: 1299.99,
    rating: 4.9,
    reviews: 45,
    image: '/Images/6.jpg',
    category: 'lighting',
    shopUrl: '#'
  },
  {
    id: 8,
    name: 'Mid-Range Floor Lamp',
    price: 249.99,
    rating: 4.6,
    reviews: 67,
    image: '/Images/rev2.jpg',
    category: 'lighting',
    shopUrl: '#'
  }
];

const ProductRecommendation = ({
  title = 'Recommended Products',
  products = mockProducts,
  onProductSelect
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Filter categories
  const categories = ['all', 'furniture', 'lighting', 'decor'];
  const priceRanges = ['all', 'budget', 'mid-range', 'luxury'];

  const filterProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.category === activeFilter);
    }

    // Apply price range filter
    switch (priceRange) {
      case 'budget':
        filtered = filtered.filter(product => product.price < 200);
        break;
      case 'mid-range':
        filtered = filtered.filter(product => product.price >= 200 && product.price < 500);
        break;
      case 'luxury':
        filtered = filtered.filter(product => product.price >= 500);
        break;
      default:
        // No price filtering when 'all' is selected
        break;
    }

    return filtered;
  };

  const handleProductClick = (product) => {
    onProductSelect?.(product);
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>

      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>

      <FilterContainer>
        {priceRanges.map(range => (
          <FilterButton
            key={range}
            $active={priceRange === range}
            onClick={() => setPriceRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProductGrid>
        {filterProducts().map(product => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              <ProductRating>
                <span>★</span> {product.rating} ({product.reviews} reviews)
              </ProductRating>
              <ShopButton href={product.shopUrl} target="_blank" rel="noopener noreferrer">
                Shop Now
              </ShopButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductRecommendation;