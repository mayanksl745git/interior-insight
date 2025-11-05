import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/AiDesignPage.css';
import Scene3D from '../components/Scene3D';
import ImageUploader from '../components/ImageUploader';
import ProductRecommendation from '../components/ProductRecommendation';

const AiDesignPage = () => {
  const [designPrompt, setDesignPrompt] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('bedroom');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [view3D, setView3D] = useState(false);
  const [customizationMode, setCustomizationMode] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('budget');
  
  // Load user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, []);
  
  // Mock room types
  const roomTypes = [
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'livingRoom', name: 'Living Room' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'office', name: 'Home Office' },
    { id: 'diningRoom', name: 'Dining Room' },
  ];
  
  // Mock design styles
  const designStyles = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'scandinavian', name: 'Scandinavian' },
    { id: 'bohemian', name: 'Bohemian' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'midCentury', name: 'Mid-Century' },
    { id: 'coastal', name: 'Coastal' },
  ];
  
  // Mock furniture items for customization by budget category
  const allFurnitureOptions = {
    budget: [
      { id: 'sofa1', name: 'Budget Sofa', category: 'sofa', price: '$399', image: '/assets/furniture/sofa1.jpg' },
      { id: 'chair1', name: 'Simple Chair', category: 'chair', price: '$149', image: '/assets/furniture/chair1.jpg' },
      { id: 'table1', name: 'Basic Coffee Table', category: 'table', price: '$99', image: '/assets/furniture/table1.jpg' },
      { id: 'lamp1', name: 'Standard Lamp', category: 'lighting', price: '$59', image: '/assets/furniture/lamp1.jpg' },
      { id: 'rug1', name: 'Simple Rug', category: 'rug', price: '$79', image: '/assets/furniture/rug1.jpg' },
    ],
    midrange: [
      { id: 'sofa2', name: 'Modern Sofa', category: 'sofa', price: '$899', image: '/assets/furniture/sofa2.jpg' },
      { id: 'chair2', name: 'Accent Chair', category: 'chair', price: '$349', image: '/assets/furniture/chair1.jpg' },
      { id: 'table2', name: 'Designer Coffee Table', category: 'table', price: '$249', image: '/assets/furniture/table1.jpg' },
      { id: 'lamp2', name: 'Floor Lamp', category: 'lighting', price: '$129', image: '/assets/furniture/lamp1.jpg' },
      { id: 'rug2', name: 'Area Rug', category: 'rug', price: '$199', image: '/assets/furniture/rug1.jpg' },
    ],
    luxury: [
      { id: 'sofa3', name: 'Premium Sectional', category: 'sofa', price: '$2,499', image: '/assets/furniture/sofa2.jpg' },
      { id: 'chair3', name: 'Designer Armchair', category: 'chair', price: '$899', image: '/assets/furniture/chair1.jpg' },
      { id: 'table3', name: 'Marble Coffee Table', category: 'table', price: '$799', image: '/assets/furniture/table1.jpg' },
      { id: 'lamp3', name: 'Artisan Floor Lamp', category: 'lighting', price: '$459', image: '/assets/furniture/lamp1.jpg' },
      { id: 'rug3', name: 'Luxury Persian Rug', category: 'rug', price: '$1,299', image: '/assets/furniture/rug1.jpg' },
    ]
  };
  
  // Get furniture options based on selected budget
  const furnitureOptions = allFurnitureOptions[selectedBudget] || allFurnitureOptions.budget;
  
  // Mock color palette options
  const colorPalettes = [
    { id: 'neutral', name: 'Neutral', colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575'] },
    { id: 'warm', name: 'Warm', colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'] },
    { id: 'cool', name: 'Cool', colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5'] },
    { id: 'earth', name: 'Earth', colors: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63'] },
    { id: 'bold', name: 'Bold', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'] },
  ];
  
  // Handle file upload
  const handleImageUpload = (processedImages) => {
    if (processedImages && processedImages.length > 0) {
      setUploadedImage(processedImages[0].base64Data);
    }
  };
  
  // Handle design generation
  const handleGenerateDesign = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      setGeneratedDesign({
        id: 'generated-1',
        image: `/assets/designs/${selectedRoom}-${selectedStyle}.jpg`,
        prompt: designPrompt,
        roomType: selectedRoom,
        style: selectedStyle,
        objects: [
          { id: 'obj1', type: 'sofa', position: { x: 100, y: 200 }, removable: true },
          { id: 'obj2', type: 'table', position: { x: 300, y: 250 }, removable: true },
          { id: 'obj3', type: 'lamp', position: { x: 400, y: 150 }, removable: true },
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };
  
  // Toggle 3D view
  const handleToggle3D = () => {
    // Simply toggle the 3D view state
    setView3D(!view3D);
  };
  
  // Enter customization mode
  const handleCustomize = () => {
    setCustomizationMode(true);
  };
  
  // Select object for customization
  const handleSelectObject = (objectId) => {
    setSelectedObject(objectId);
  };
  
  // Replace selected object
  const handleReplaceObject = (newFurnitureId) => {
    // In a real app, this would update the generated design with the new furniture
    console.log(`Replacing object ${selectedObject} with ${newFurnitureId}`);
    // For demo purposes, just deselect the object
    setSelectedObject(null);
  };
  
  // Save the design
  const handleSaveDesign = () => {
    alert('Design saved successfully!');
    // In a real app, this would save the design to the user's account
  };
  
  return (
    <PageContainer>
      <Navbar>
        <LogoContainer>
          <Link to="/">
            <Logo>Interior Insight</Logo>
          </Link>
        </LogoContainer>
        
        <NavLinks>
          <NavLink to="/dashboard">Gallery</NavLink>
          <NavLink to="/ai-design" className="active">AI Design</NavLink>
          <NavLink to="/saved-designs">Saved</NavLink>
          <ProfileButton onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <ProfileImage 
              src={userInfo?.profileImage || "/assets/profile-placeholder.svg"} 
              alt="Profile" 
            />
            {showProfileDropdown && (
              <ProfileDropdown>
                <DropdownItem>
                  <strong>{userInfo?.username || "Guest"}</strong>
                  <small>{userInfo?.email || "Not logged in"}</small>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem as={Link} to="/profile">
                  <i className="fas fa-user"></i> Edit Profile
                </DropdownItem>
                <DropdownItem as={Link} to="/settings">
                  <i className="fas fa-cog"></i> Settings
                </DropdownItem>
              </ProfileDropdown>
            )}
          </ProfileButton>
        </NavLinks>
      </Navbar>
      
      <MainContent>
        {!generatedDesign ? (
          <DesignInputContainer>
            <InputSection>
              <SectionTitle>Create Your Dream Space</SectionTitle>
              <SectionDescription>
                Describe your ideal interior design or upload a photo of your space to transform it.
              </SectionDescription>
              
              <InputGroup>
                <Label>I want to design my:</Label>
                <RoomTypeSelector>
                  {roomTypes.map(room => (
                    <RoomTypeOption 
                      key={room.id}
                      className={selectedRoom === room.id ? 'active' : ''}
                      onClick={() => setSelectedRoom(room.id)}
                    >
                      {room.name}
                    </RoomTypeOption>
                  ))}
                </RoomTypeSelector>
              </InputGroup>
              
              <InputGroup>
                <Label>Design Style:</Label>
                <StyleSelector>
                  {designStyles.map(style => (
                    <StyleOption 
                      key={style.id}
                      className={selectedStyle === style.id ? 'active' : ''}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      {style.name}
                    </StyleOption>
                  ))}
                </StyleSelector>
              </InputGroup>
              
              <InputGroup>
                <Label>Describe your vision (optional):</Label>
                <PromptTextarea 
                  placeholder="E.g., I want a cozy bedroom with natural light, plants, and a reading nook..."
                  value={designPrompt}
                  onChange={(e) => setDesignPrompt(e.target.value)}
                />
              </InputGroup>
              
              <InputGroup>
                <Label>Or upload a photo of your space:</Label>
                <ImageUploader
                  onUpload={handleImageUpload}
                  onError={(error) => console.error('Upload error:', error)}
                  maxFiles={1}
                  acceptedTypes="image/jpeg,image/png,image/webp"
                  dropzoneText="Drag and drop a photo of your space here or click to select"
                />
              </InputGroup>
              
              <GenerateButton 
                onClick={handleGenerateDesign}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner />
                    Generating Your Design...
                  </>
                ) : (
                  'Generate My Design'
                )}
              </GenerateButton>
            </InputSection>
            
            <PreviewSection>
              <InspirationGallery>
                <GalleryTitle>Design Inspiration</GalleryTitle>
                <GalleryGrid>
                  <InspirationCard>
                    <InspirationImage src="/assets/designs/bedroom-modern.jpg" alt="Modern Bedroom" />
                    <InspirationCaption>Modern Bedroom</InspirationCaption>
                  </InspirationCard>
                  <InspirationCard>
                    <InspirationImage src="/assets/designs/livingRoom-scandinavian.jpg" alt="Scandinavian Living Room" />
                    <InspirationCaption>Scandinavian Living Room</InspirationCaption>
                  </InspirationCard>
                  <InspirationCard>
                    <InspirationImage src="/assets/designs/kitchen-industrial.jpg" alt="Industrial Kitchen" />
                    <InspirationCaption>Industrial Kitchen</InspirationCaption>
                  </InspirationCard>
                  <InspirationCard>
                    <InspirationImage src="/assets/designs/bathroom-minimalist.jpg" alt="Minimalist Bathroom" />
                    <InspirationCaption>Minimalist Bathroom</InspirationCaption>
                  </InspirationCard>
                </GalleryGrid>
              </InspirationGallery>
              
              <DesignTips>
                <TipsTitle>Design Tips</TipsTitle>
                <TipsList>
                  <TipItem>
                    <TipIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </TipIcon>
                    <TipText>Be specific about colors, materials, and mood in your description</TipText>
                  </TipItem>
                  <TipItem>
                    <TipIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </TipIcon>
                    <TipText>For best results, upload clear photos with good lighting</TipText>
                  </TipItem>
                  <TipItem>
                    <TipIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </TipIcon>
                    <TipText>Try different style combinations for more design options</TipText>
                  </TipItem>
                  <TipItem>
                    <TipIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </TipIcon>
                    <TipText>You can customize any generated design with our editing tools</TipText>
                  </TipItem>
                </TipsList>
              </DesignTips>
            </PreviewSection>
          </DesignInputContainer>
        ) : (
          <DesignResultContainer>
            <ResultHeader>
              <ResultTitle>
                Your {designStyles.find(s => s.id === selectedStyle)?.name} {roomTypes.find(r => r.id === selectedRoom)?.name}
              </ResultTitle>
              <ResultActions>
                <ActionButton onClick={handleToggle3D}>
                  <ActionIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </ActionIcon>
                  {view3D ? 'View 2D' : 'View 3D'}
                </ActionButton>
                <ActionButton onClick={handleCustomize}>
                  <ActionIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </ActionIcon>
                  Customize
                </ActionButton>
                <ActionButton onClick={() => setGeneratedDesign(null)}>
                  <ActionIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3l18 18"></path>
                      <path d="M10.5 10.5L3 18"></path>
                      <path d="M21 3l-7.5 7.5"></path>
                    </svg>
                  </ActionIcon>
                  Start Over
                </ActionButton>
                <SaveButton onClick={handleSaveDesign}>
                  <ActionIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                  </ActionIcon>
                  Save Design
                </SaveButton>
              </ResultActions>
            </ResultHeader>
            
            <DesignDisplayContainer>
              <DesignImageContainer className={view3D ? 'view-3d' : ''}>
                {view3D ? (
                  <Scene3D
                    modelUrl={`/models/${selectedRoom}-${selectedStyle}.glb`}
                    environmentPreset="apartment"
                    onSceneLoaded={() => console.log('3D scene loaded')}
                  />
                ) : (
                  <DesignImage 
                    src={generatedDesign.image} 
                    alt="Generated design"
                  />
                )}
              </DesignImageContainer>
              
              {customizationMode && (
                <CustomizationPanel>
                  <PanelHeader>
                    <PanelTitle>Customize Your Design</PanelTitle>
                    <CloseButton onClick={() => setCustomizationMode(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </CloseButton>
                  </PanelHeader>
                  
                  <CustomizationTabs>
                    <CustomTab className="active">Furniture</CustomTab>
                    <CustomTab>Colors</CustomTab>
                    <CustomTab>Lighting</CustomTab>
                    <CustomTab>Decor</CustomTab>
                  </CustomizationTabs>
                  
                  <CustomizationContent>
                    {selectedObject ? (
                      <>
                        <SelectedObjectInfo>
                          <p>Replace selected {selectedObject} with:</p>
                        </SelectedObjectInfo>
                        <ProductRecommendation
                          title="Recommended Replacements"
                          onProductSelect={handleReplaceObject}
                          products={furnitureOptions.map(item => ({
                            id: item.id,
                            name: item.name,
                            price: parseFloat(item.price.replace('$', '')),
                            rating: 4.5,
                            reviews: 50,
                            image: item.image,
                            category: item.category,
                            shopUrl: '#'
                          }))}
                        />
                      </>
                    ) : (
                      <>
                        <InstructionText>Click on an item in the design to customize it</InstructionText>
                        <ColorPalettes>
                          <PaletteTitle>Color Schemes</PaletteTitle>
                          {colorPalettes.map(palette => (
                            <ColorPalette key={palette.id}>
                              <PaletteName>{palette.name}</PaletteName>
                              <ColorSwatches>
                                {palette.colors.map((color, index) => (
                                  <ColorSwatch key={index} style={{ backgroundColor: color }} />
                                ))}
                              </ColorSwatches>
                            </ColorPalette>
                          ))}
                        </ColorPalettes>
                      </>
                    )}
                  </CustomizationContent>
                </CustomizationPanel>
              )}
            </DesignDisplayContainer>
            
            <ProductRecommendations>
              <RecommendationsTitle>Shop This Look</RecommendationsTitle>
              <BudgetSelector>
                <BudgetOption 
                  className={selectedBudget === 'budget' ? 'active' : ''}
                  onClick={() => setSelectedBudget('budget')}
                >
                  Budget-Friendly
                </BudgetOption>
                <BudgetOption 
                  className={selectedBudget === 'midrange' ? 'active' : ''}
                  onClick={() => setSelectedBudget('midrange')}
                >
                  Mid-Range
                </BudgetOption>
                <BudgetOption 
                  className={selectedBudget === 'luxury' ? 'active' : ''}
                  onClick={() => setSelectedBudget('luxury')}
                >
                  Luxury
                </BudgetOption>
              </BudgetSelector>
              <ProductGrid>
                {allFurnitureOptions[selectedBudget].map(product => (
                  <ProductCard key={product.id}>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>{product.price}</ProductPrice>
                      <ShopButton>
                        Shop Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </ShopButton>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
            </ProductRecommendations>
          </DesignResultContainer>
        )}
      </MainContent>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
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

const NavLinks = styled.div`
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
  background: none;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 220px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  z-index: 100;
  margin-top: 10px;
`;

const DropdownItem = styled.div`
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #f5f8fa;
  }
  
  strong {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  
  small {
    color: #666;
    font-size: 0.8rem;
  }
  
  i {
    margin-right: 0.5rem;
    color: var(--primary-color);
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 0.5rem 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const DesignInputContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const InputSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const RoomTypeSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const RoomTypeOption = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: #f0f4f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e1e8ef;
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const StyleSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const StyleOption = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: #f0f4f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e1e8ef;
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const PromptTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(58, 80, 107, 0.1);
  }
`;

const UploadContainer = styled.div`
  margin-bottom: 1rem;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  background-color: #f0f4f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover {
    background-color: #e1e8ef;
  }
`;

const UploadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadPreview = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const UploadedImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const RemoveUploadButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const GenerateButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: #e5940f;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InspirationGallery = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const GalleryTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--dark-color);
  margin-bottom: 1.5rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InspirationCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const InspirationImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const InspirationCaption = styled.div`
  padding: 0.8rem;
  background-color: #f8f9fa;
  font-size: 0.9rem;
  text-align: center;
`;

const DesignTips = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const TipsTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--dark-color);
  margin-bottom: 1.5rem;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const TipIcon = styled.div`
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: 0.2rem;
`;

const TipText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const DesignResultContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--dark-color);
  margin: 0;
`;

const ResultActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background-color: #f0f4f8;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e1e8ef;
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: #2a3f5f;
  }
`;

const DesignDisplayContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const DesignImageContainer = styled.div`
  flex: 2;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: white;
  position: relative;
  
  &.view-3d {
    background-color: #f0f4f8;
  }
`;

const DesignImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  
  &.hidden {
    display: none;
  }
`;

const ThreeDPlaceholder = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  
  span {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  p {
    max-width: 300px;
    text-align: center;
  }
`;

const CustomizationPanel = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  
  @media (max-width: 992px) {
    max-width: none;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: var(--dark-color);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f4f8;
  }
`;

const CustomizationTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const CustomTab = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &.active {
    color: var(--primary-color);
    box-shadow: inset 0 -2px 0 var(--primary-color);
  }
`;

const CustomizationContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
`;

const SelectedObjectInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  p {
    margin: 0;
    font-weight: 500;
  }
`;

const FurnitureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const FurnitureItem = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const FurnitureImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  display: block;
`;

const FurnitureName = styled.div`
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FurniturePrice = styled.div`
  padding: 0 0.5rem 0.5rem 0.5rem;
  font-size: 0.8rem;
  color: #666;
`;

const InstructionText = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const ColorPalettes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PaletteTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--dark-color);
`;

const ColorPalette = styled.div`
  margin-bottom: 1rem;
`;

const PaletteName = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ColorSwatches = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ColorSwatch = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProductRecommendations = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const RecommendationsTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--dark-color);
  margin-bottom: 1.5rem;
`;

const BudgetSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const BudgetOption = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: #f0f4f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e1e8ef;
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ShopButton = styled.button`
  background-color: transparent;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
  }
`;

export default AiDesignPage;