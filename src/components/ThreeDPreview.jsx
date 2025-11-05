import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import styled from 'styled-components';

const ThreeDPreview = ({ modelUrl, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef();

  useEffect(() => {
    // Reset loading state when model URL changes
    setIsLoading(true);
    setLoadingProgress(0);
  }, [modelUrl]);

  const handleProgress = (progress) => {
    setLoadingProgress(Math.round(progress.loaded / progress.total * 100));
    if (progress.loaded === progress.total) {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    console.error('3D Preview Error:', error);
    onError?.(error);
  };

  return (
    <PreviewContainer>
        {isLoading && (
          <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>{loadingProgress}% Loading...</LoadingText>
          </LoadingOverlay>
        )}
        
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: '#f0f0f0' }}
          shadows
          dpr={[1, 2]} // Optimize for different pixel ratios
          performance={{ min: 0.5 }} // Lower bound for frame rate
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              {/* Add your 3D model component here */}
            </Stage>
            <Environment preset="city" />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <ControlsOverlay>
          <ControlButton onClick={() => canvasRef.current?.resetOrbit?.()}>
            Reset View
          </ControlButton>
          <ControlButton onClick={() => canvasRef.current?.toggleAutoRotate?.()}>
            Auto Rotate
          </ControlButton>
          <ControlButton onClick={() => canvasRef.current?.zoomToFit?.()}>
            Zoom to Fit
          </ControlButton>
        </ControlsOverlay>
      </PreviewContainer>
  );
};

// Styled Components
const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--dark-color);
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background: #fff1f0;
  color: #cf1322;
  text-align: center;
  border-radius: 8px;
`;

const ControlsOverlay = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 5;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--dark-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ThreeDPreview;