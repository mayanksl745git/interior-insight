import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/DashboardPage.css';
import categoryService from '../services/categoryService';

// Mock data for design gallery
const designGalleryData = {
  bedroom: [
    { id: 1, title: 'Modern Minimalist Bedroom', image: '/Images/bd7.jpg', likes: 245 },
    { id: 2, title: 'Cozy Rustic Bedroom', image: '/Images/bd2.jpg', likes: 189 },
    { id: 3, title: 'Luxury Master Bedroom', image: '/Images/bd5.jpg', likes: 312 },
    { id: 4, title: 'Scandinavian Style Bedroom', image: '/Images/bd6.jpg', likes: 178 },
  ],
  kitchen: [
    { id: 5, title: 'Contemporary Open Kitchen', image: '/Images/mk1.jpg', likes: 276 },
    { id: 6, title: 'Farmhouse Kitchen Design', image: '/Images/mk2.jpg', likes: 203 },
    { id: 7, title: 'Industrial Style Kitchen', image: '/Images/mk3.jpg', likes: 167 },
    { id: 8, title: 'Minimalist White Kitchen', image: '/Images/mk4.jpg', likes: 231 },
  ],
  livingRoom: [
    { id: 9, title: 'Modern Living Room', image: '/Images/lv1.jpg', likes: 298 },
    { id: 10, title: 'Bohemian Living Space', image: '/Images/lv2.jpg', likes: 187 },
    { id: 11, title: 'Contemporary Living Room', image: '/Images/lv3.jpg', likes: 254 },
    { id: 12, title: 'Mid-Century Modern Living Room', image: '/Images/lvhp1.jpg', likes: 221 },
  ],
  bathroom: [
    { id: 13, title: 'Luxury Spa Bathroom', image: '/Images/bt1.jpg', likes: 176 },
    { id: 14, title: 'Modern Minimalist Bathroom', image: '/Images/bt2.jpg', likes: 143 },
    { id: 15, title: 'Contemporary Bathroom Design', image: '/Images/bt4.jpg', likes: 198 },
    { id: 16, title: 'Industrial Style Bathroom', image: '/Images/bath4.jpg', likes: 165 },
  ],
  balcony: [
    { id: 17, title: 'Urban Oasis Balcony', image: '/Images/bl1.jpg', likes: 132 },
    { id: 18, title: 'Cozy Balcony Garden', image: '/Images/bl5.jpg', likes: 156 },
    { id: 19, title: 'Modern Balcony Lounge', image: '/Images/bl4.jpg', likes: 118 },
    { id: 20, title: 'Minimalist Balcony Design', image: '/Images/bl3.jpg', likes: 143 },
  ],
};

const DashboardPage = () => {
  const [activeCategory, setActiveCategory] = useState('bedroom');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [userDesigns, setUserDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleDesignClick = (designId) => {
    // Navigate to the 3D preview page for the selected design-
    navigate(`/design-preview/${designId}`);
  };
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      
      // Fetch user designs (mock data for now)
      setUserDesigns([
        { id: 101, title: 'My Living Room Redesign', image: '/Images/lvhp.jpg', date: '2023-05-15' },
        { id: 102, title: 'Kitchen Renovation Plan', image: '/Images/kt.jpg', date: '2023-06-22' },
        { id: 103, title: 'Bedroom Makeover', image: '/Images/bd9.jpg', date: '2023-07-10' },
      ]);
    } catch (error) {
      console.error('Error parsing user info:', error);
      navigate('/login');
    }
  }, [navigate]);
  
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
        // Use default categories if API fails
        setCategories([
          { id: 'bedroom', name: 'Bedroom' },
          { id: 'kitchen', name: 'Kitchen' },
          { id: 'livingRoom', name: 'Living Room' },
          { id: 'bathroom', name: 'Bathroom' },
          { id: 'balcony', name: 'Balcony' }
        ]);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredDesigns = activeCategory === 'all'
    ? Object.values(designGalleryData).flat().filter(design => 
        design.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : (designGalleryData[activeCategory] || []).filter(design => 
        design.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <DashboardContainer>
      <Navbar>
        <LogoContainer>
          <Link to="/">
            <Logo>Interior Insight</Logo>
          </Link>
        </LogoContainer>
        
        <SearchContainer>
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search designs..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchContainer>
        
        <NavLinks>
          <NavLink 
            to="#" 
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </NavLink>
          <NavLink to="/ai-design">AI Design</NavLink>
          <NavLink 
            to="#" 
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            My Designs
          </NavLink>
          <ProfileButton onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <ProfileImage 
              src={userInfo?.profileImage || "/assets/profile-placeholder.svg"} 
              alt="Profile" 
            />
            {showProfileDropdown && (
              <ProfileDropdown>
                <DropdownItem>
                  <strong>{userInfo?.username}</strong>
                  <small>{userInfo?.email}</small>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem as={Link} to="/profile">
                  <i className="fas fa-user"></i> Edit Profile
                </DropdownItem>
                <DropdownItem as={Link} to="/settings">
                  <i className="fas fa-cog"></i> Settings
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={() => {
                  localStorage.removeItem('userToken');
                  localStorage.removeItem('userInfo');
                  navigate('/login');
                }}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </DropdownItem>
              </ProfileDropdown>
            )}
          </ProfileButton>
        </NavLinks>
      </Navbar>
      
      <MainContent>
        <SidebarContainer>
          <SidebarHeader>Design Categories</SidebarHeader>
          <CategoryList>
            {loading ? (
              <LoadingMessage>Loading categories...</LoadingMessage>
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
              <>
                <CategoryItem 
                  className={activeCategory === 'all' ? 'active' : ''}
                  onClick={() => handleCategoryChange('all')}
                >
                  All Categories
                </CategoryItem>
                {categories.map((category) => (
                  <CategoryItem 
                    key={category.id || category._id}
                    className={activeCategory === (category.slug || category.id) ? 'active' : ''}
                    onClick={() => handleCategoryChange(category.slug || category.id)}
                  >
                    {category.name}
                  </CategoryItem>
                ))}
              </>
            )}
          </CategoryList>
          
          <SidebarHeader>Explore AI Co-Designer</SidebarHeader>
          <ActionList>
            <ActionButton onClick={() => {
              window.location = "http://127.0.0.1:5000"
            }}>
              <ActionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                  <line x1="12" y1="22" x2="12" y2="15.5"></line>
                  <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                </svg>
              </ActionIcon>
              Create Your Own AI Design
            </ActionButton>
            <ActionButton onClick={() => {
              window.location = "http://127.0.0.1:5502"
            }}>
              <ActionIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </ActionIcon>
              Build your Space in 3D Visual
            </ActionButton>
          </ActionList>
        </SidebarContainer>
        
        <ContentContainer>
          {activeTab === 'gallery' ? (
            <>
              <ContentHeader>
                <h2>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace(/([A-Z])/g, ' $1')} Designs</h2>
                <FilterContainer>
                  <FilterLabel>Sort by:</FilterLabel>
                  <FilterSelect>
                    <option value="popular">Most Popular</option>
                    <option value="recent">Most Recent</option>
                    <option value="trending">Trending</option>
                  </FilterSelect>
                </FilterContainer>
              </ContentHeader>
              
              <DesignGrid>
                {filteredDesigns.map(design => (
                  <DesignCard key={design.id} className="hover-lift">
                    <DesignImage src={design.image} alt={design.title} />
                    <DesignInfo>
                      <DesignTitle>{design.title}</DesignTitle>
                      <DesignMeta>
                        <LikeCount>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          {design.likes}
                        </LikeCount>
                        <ViewButton onClick={() => navigate(`/design-preview/${design.id}`)}>View Design</ViewButton>
                      </DesignMeta>
                    </DesignInfo>
                  </DesignCard>
                ))}
              </DesignGrid>
            </>
          ) : (
            <>
              <ContentHeader>
                <h2>My Design History</h2>
                <FilterContainer>
                  <FilterLabel>Sort by:</FilterLabel>
                  <FilterSelect>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                  </FilterSelect>
                </FilterContainer>
              </ContentHeader>
              
              <DesignGrid>
                {userDesigns.map(design => (
                  <DesignCard key={design.id} className="hover-lift">
                    <DesignImage src={design.image} alt={design.title} />
                    <DesignInfo>
                      <DesignTitle>{design.title}</DesignTitle>
                      <DesignMeta>
                        <DesignDate>
                          <i className="far fa-calendar-alt"></i> {design.date}
                        </DesignDate>
                        <ViewButton onClick={() => navigate(`/design-preview/${design.id}`)}>Edit Design</ViewButton>
                      </DesignMeta>
                    </DesignInfo>
                  </DesignCard>
                ))}
                
                {userDesigns.length === 0 && (
                  <EmptyStateContainer>
                    <EmptyStateIcon>
                      <i className="fas fa-drafting-compass fa-3x"></i>
                    </EmptyStateIcon>
                    <EmptyStateText>You haven't created any designs yet</EmptyStateText>
                    <Link to="/ai-design">
                      <PromoButton>Create Your First Design</PromoButton>
                    </Link>
                  </EmptyStateContainer>
                )}
              </DesignGrid>
            </>
          )}

          
          <AiDesignPromo>
  <PromoContent>
    <PromoTitle>Create Your Dream Space with our AI Co-Interior Designer</PromoTitle>
    <PromoDescription>
      Use our AI-powered design tool to transform your space or create something entirely new.
    </PromoDescription>

    <PromoButton
      onClick={() => {
        window.location.href = "http://127.0.0.1:5000";
      }}
    >
      Try AI Design
    </PromoButton>
  </PromoContent>

  <PromoImage src="/Images/ai5.jpg" alt="AI Design Tool" />
</AiDesignPromo>

        </ContentContainer>
      </MainContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 0;
`;

const SearchContainer = styled.div`
  flex: 2;
  position: relative;
  max-width: 500px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #eee;
  border-radius: 50px;
  font-size: 0.9rem;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);
  }
`;

const NavLinks = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &.active {
    color: var(--primary-color);
  }
`;

const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #ff6b6b;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${ProfileButton}:hover & {
    filter: brightness(1.1);
  }
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: white;
  padding: 2rem 1.5rem;
  border-right: 1px solid #eee;
  height: calc(100vh - 73px);
  position: sticky;
  top: 73px;
  overflow-y: auto;
`;

const SidebarHeader = styled.h3`
  font-size: 1.1rem;
  color: var(--dark-color);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const CategoryItem = styled.li`
  padding: 0.8rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.3rem;
  
  &:hover {
    background-color: #f0f4f8;
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background-color: ${props => props.primary ? 'var(--primary-color)' : '#f0f4f8'};
  color: ${props => props.primary ? 'white' : 'var(--text-color)'};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#2a3f5f' : '#e1e8ef'};
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    margin: 0;
    color: var(--dark-color);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const DesignCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

// ProfileImage is already defined above

const DesignImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DesignInfo = styled.div`
  padding: 1.2rem;
`;

const DesignTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--dark-color);
`;

const DesignMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  
  svg {
    color: #ff6b6b;
  }
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const AiDesignPromo = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const PromoContent = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PromoTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const PromoDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.6;
`;

const PromoButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: #e5940f;
    transform: translateY(-2px);
  }
`;

const PromoImage = styled.img`
  flex: 1;
  object-fit: cover;
  max-width: 50%;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 100;
  margin-top: 10px;
  animation: fadeIn 0.2s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 24px;
    width: 12px;
    height: 12px;
    background: white;
    transform: rotate(45deg);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  display: flex;
  flex-direction: ${props => props.as ? 'row' : 'column'};
  align-items: ${props => props.as ? 'center' : 'flex-start'};
  gap: ${props => props.as ? '8px' : '2px'};
  color: #333;
  transition: background-color 0.2s;
  cursor: ${props => props.as || props.onClick ? 'pointer' : 'default'};
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.as || props.onClick ? '#f5f5f5' : 'transparent'};
  }
  
  strong {
    font-weight: 600;
    font-size: 14px;
  }
  
  small {
    font-size: 12px;
    color: #666;
  }
  
  i {
    font-size: 16px;
    width: 20px;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 8px 0;
`;

const DesignDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
  
  i {
    font-size: 14px;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  grid-column: 1 / -1;
`;

const EmptyStateIcon = styled.div`
  color: #ccc;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
`;

const LoadingMessage = styled.div`
  padding: 1rem;
  color: #666;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  color: #d9534f;
  font-style: italic;
`;

export default DashboardPage;