# Interior Insight - AI-Powered Interior Design Website

## Overview

Interior Insight is a web application that leverages AI to help users design and visualize interior spaces. The platform allows users to generate interior designs from text prompts, upload images of their spaces for AI-powered redesign, customize generated designs, and find product recommendations based on their preferences.

## Features

- **User Authentication**: Secure login and signup functionality
- **Design Gallery**: Browse interior designs categorized by room types (bedroom, kitchen, living room, etc.)
- **AI Design Generation**: Create interior designs from text descriptions
- **Image Upload**: Upload photos of your space for AI redesign
- **3D Preview**: View generated designs in 3D
- **Design Customization**: Modify furniture, colors, and other elements in generated designs
- **Product Recommendations**: Shop for items in your design with budget options
- **Drag-and-Drop Interface**: Rearrange objects within your design

## Tech Stack

- **Frontend**: React, React Router, Styled Components
- **UI/UX**: Modern, responsive design with animations
- **Visualization**: Three.js for 3D rendering
- **State Management**: React Hooks and Context API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/
├── public/            # Static assets
│   └── assets/        # Images and other media
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── styles/        # CSS and styled-components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
└── README.md          # Project documentation
```

## Usage

1. Create an account or log in
2. Browse the design gallery for inspiration
3. Use the AI Design tool to generate a new design:
   - Select a room type
   - Choose a design style
   - Describe your vision or upload a photo
   - Click "Generate My Design"
4. Customize your generated design:
   - Change furniture items
   - Modify colors and materials
   - Rearrange objects
5. View product recommendations and shop for items

## Future Enhancements

- Integration with real AI image generation models
- Advanced 3D modeling and rendering
- Social sharing features
- Design history and versioning
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.