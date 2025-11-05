import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AiDesignPage from './pages/AiDesignPage';
import AiDesignExplanationPage from './pages/AiDesignExplanationPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import TemplatesPage from './pages/TemplatesPage';
import ContactPage from './pages/ContactPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-design"
          element={
            <ProtectedRoute>
              <AiDesignPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-design-explanation"
          element={
            <ProtectedRoute>
              <AiDesignExplanationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;