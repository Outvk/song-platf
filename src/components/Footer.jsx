import React from 'react';
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Image,
  IconButton,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaHeadphones,
} from 'react-icons/fa';

const Footer = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box
      as="footer"
      bg={isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'}
      backdropFilter="blur(10px)"
      borderTop="1px solid"
      borderColor={isDark ? 'whiteAlpha.200' : 'gray.200'}
      py={8}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={8}
        >
          {/* Social Media Icons */}
          <Stack direction="row" spacing={4}>
            <IconButton
              icon={<FaInstagram />}
              aria-label="Instagram"
              variant="ghost"
              colorScheme="purple"
              fontSize="20px"
              _hover={{
                transform: 'translateY(-2px)',
                color: '#E1306C',
              }}
            />
            <IconButton
              icon={<FaTwitter />}
              aria-label="Twitter"
              variant="ghost"
              colorScheme="purple"
              fontSize="20px"
              _hover={{
                transform: 'translateY(-2px)',
                color: '#1DA1F2',
              }}
            />
            <IconButton
              icon={<FaFacebook />}
              aria-label="Facebook"
              variant="ghost"
              colorScheme="purple"
              fontSize="20px"
              _hover={{
                transform: 'translateY(-2px)',
                color: '#1877F2',
              }}
            />
            <IconButton
              icon={<FaYoutube />}
              aria-label="YouTube"
              variant="ghost"
              colorScheme="purple"
              fontSize="20px"
              _hover={{
                transform: 'translateY(-2px)',
                color: '#FF0000',
              }}
            />
          </Stack>

          {/* Logo */}
          <Box
            position="relative"
            mx={{ base: 'auto', md: 8 }}
            boxSize={{ base: '70px', md: '90px' }}
          >
            <Image
              src="/logo.png"
              alt="OutVibs Logo"
              boxSize="100%"
              objectFit="contain"
              filter={isDark ? 'brightness(0.8)' : 'none'}
            />
          </Box>

          {/* Support Button */}
          <Button
            leftIcon={<FaHeadphones />}
            colorScheme="purple"
            variant="solid"
            size="lg"
            borderRadius="full"
            px={8}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Support
          </Button>
        </Flex>

        {/* Copyright Text */}
        <Text
          textAlign="center"
          mt={8}
          color={isDark ? 'whiteAlpha.600' : 'gray.600'}
          fontSize="sm"
        >
          © {new Date().getFullYear()} OutVibs. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;