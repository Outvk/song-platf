import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, VStack, Text as ChakraText, useColorModeValue } from '@chakra-ui/react';

// Simple rotating cube component
function RotatingCube() {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}

// Main component
export default function MusicGame3D() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack
      w="100%"
      py={6}
      px={{ base: 1, md: 4 }}
      bg={bgColor}
      borderRadius="2xl"
      boxShadow="lg"
      my={8}
      maxW="1264px"
      mx="auto"
      position="relative"
      overflow="hidden"
      minH="420px"
      border="1px solid"
      borderColor={borderColor}
    >
      <ChakraText
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        color={useColorModeValue("purple.600", "purple.300")}
        mb={4}
        textAlign="center"
        letterSpacing="tight"
      >
        Music Rhythm Game
      </ChakraText>

      <Box w="100%" h="400px" position="relative">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Canvas>
      </Box>

      <ChakraText
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.400")}
        textAlign="center"
        px={4}
      >
        Coming soon: Interactive 3D music game!
      </ChakraText>
    </VStack>
  );
} 