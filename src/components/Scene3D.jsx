import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import styled from 'styled-components';

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const ControlButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

// Default room model component
const Room = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
};

// Camera controller component
const CameraController = () => {
  const { camera, gl } = useThree();
  useFrame(() => {
    camera.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.05}
      minDistance={2}
      maxDistance={10}
      target={[0, 0, 0]}
      camera={camera}
      domElement={gl.domElement}
    />
  );
};

const Scene3D = ({
  modelUrl = '/models/default-room.glb',
  environmentPreset = 'apartment',
  onSceneLoaded
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([5, 2, 5]);

  // Camera presets
  const cameraPresets = {
    front: [0, 2, 5],
    top: [0, 5, 0],
    side: [5, 2, 0]
  };

  const handleCameraPreset = (preset) => {
    setCameraPosition(cameraPresets[preset]);
  };

  const handleSceneLoad = () => {
    setIsLoading(false);
    onSceneLoaded?.();
  };

  return (
    <SceneContainer>
      {isLoading && (
        <LoadingOverlay>
          Loading 3D Scene...
        </LoadingOverlay>
      )}

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={75}
          />
          <CameraController />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
          />
          
          {/* Environment */}
          <Environment preset={environmentPreset} />
          
          {/* 3D Model */}
          <Room modelUrl={modelUrl} onLoad={handleSceneLoad} />
        </Suspense>
      </Canvas>

      <Controls>
        <ControlButton onClick={() => handleCameraPreset('front')}>
          Front View
        </ControlButton>
        <ControlButton onClick={() => handleCameraPreset('top')}>
          Top View
        </ControlButton>
        <ControlButton onClick={() => handleCameraPreset('side')}>
          Side View
        </ControlButton>
      </Controls>
    </SceneContainer>
  );
};

export default Scene3D;