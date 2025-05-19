import { Box, Button, Container, Flex, Heading, Text, useColorMode, Image, Icon, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import CardCarousel from './components/CardCarousel'
import ScrollAnimation from './components/ScrollAnimation'
import AudioPlayerModal from './components/AudioPlayerModal'
import styled from "styled-components"
import { FaPlay, FaHeadphones, FaArrowRight, FaHome, FaSearch, FaCog } from 'react-icons/fa'

// Add the animated heading component
const AnimatedGradientHeading = styled(Heading)`
  background: linear-gradient(
    to right,
    #ff0088,
    #a855f7,
    rgb(214, 97, 158),
    #805ad5,
    #ff0088
  );
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  margin-bottom: 10px;
  font-size:55px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 200px;
  letter-spacing: -0.02em;
  animation: shine 5s linear infinite;

  @keyframes shine {
    from {
      background-position: 0% center;
    }
    to {
      background-position: 200% center;
    }
  }
`;

const AnimatedGradientSpan = styled.span`
  background: linear-gradient(
    to right,
rgb(255, 111, 188),
rgb(199, 144, 252),
    rgb(233, 121, 179),
rgb(182, 148, 255),
rgb(255, 132, 198)
  );
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  margin-bottom: 10px;
  font-size: 55px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  animation: shine 5s linear infinite;

  @keyframes shine {
    from {
      background-position: 0% center;
    }
    to {
      background-position: 200% center;
    }
  }
`;

const BlurBar = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.36),
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1)
  );
  backdrop-filter: blur(5px);
  z-index: 100;
  opacity: ${props => props.isDark ? 1 : 0};
  visibility: ${props => props.isDark ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const { 
    isOpen: isDrawerOpen, 
    onOpen: onDrawerOpen, 
    onClose: onDrawerClose 
  } = useDisclosure();
  const {
    isOpen: isPlayerOpen,
    onOpen: onPlayerOpen,
    onClose: onPlayerClose
  } = useDisclosure();

  const features = [
    {
      title: "Premium Music Quality",
      description: "Experience crystal clear audio with our high-fidelity streaming.",
      icon: "🎵",
      color: "#ff0088"
    },
    {
      title: "Personalized Playlists",
      description: "Get custom recommendations based on your music taste.",
      icon: "🎯",
      color: "#dd00ee"
    },
    {
      title: "Offline Mode",
      description: "Download your favorite tracks for offline listening.",
      icon: "💾",
      color: "#9911ff"
    },
    {
      title: "Cross-Platform Sync",
      description: "Seamlessly switch between devices without missing a beat.",
      icon: "🔄",
      color: "#0d63f8"
    },
    {
      title: "Social Sharing",
      description: "Share your favorite music with friends and family.",
      icon: "🤝",
      color: "#0cdcf7"
    },
    {
      title: "Live Lyrics",
      description: "Follow along with synchronized lyrics as you listen.",
      icon: "📝",
      color: "#8df0cc"
    }
  ];

  return (
    <Box position="relative" minH="100vh" maxW="1400px" margin="auto">
      {/* Video Background */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        overflow="hidden"
        zIndex="0"
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '120%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/music-bg2.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg={isDark ? "blackAlpha.600" : "blackAlpha.100"}
          transition="background-color 0.2s ease-in-out"
        />
      </Box>

      {/* Content Layer */}
      <Box position="relative" zIndex="1">
        <Navbar />
        
        {/* Hero Section */}
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          pt="64px"
        >
          <Container maxW="container.xl">
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              align="center"
              justify="space-between"
              gap="8"
            >
              {/* Left Content */}
              <Box
                flex="1"
                color="white"
                textAlign={{ base: 'center', lg: 'left' }}
                mb={{ base: '12', lg: '0' }}
              >
                <Button
                  size="sm"
                  colorScheme="purple"
                  mb="4"
                  rounded="full"
                  px="6"
                  onClick={toggleColorMode}
                >
                  Welcome to OutVibs
                </Button>
                <Heading
                  as="h1"
                  size="2xl"
                  mb="6"
                  lineHeight="1.2"
                >
                  Discover & Share <br />
                  Your Favorite Music
                </Heading>
                <Text fontSize="xl" mb="8" opacity="0.9">
                  Join our community of music lovers. Share your playlists, discover new artists,
                  and connect with people who share your taste in music.
                </Text>
                <Flex 
                  gap="4" 
                  justify={{ base: 'center', lg: 'flex-start' }}
                >
                  <Button
                    colorScheme="purple"
                    size="lg"
                    rounded="full"
                    px="8"
                    onClick={onPlayerOpen}
                    leftIcon={<FaPlay />}
                  >
                    Start Listening
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    rounded="full"
                    px="8"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  >
                    Learn More
                  </Button>
                </Flex>
              </Box>

              {/* Right Content - Card Carousel */}
              <Box
                flex="1"
                width="auto"
                height={{ base: '500px', lg: '600px' }}
                mt={{ base: 8, lg: 0 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CardCarousel />
              </Box>
            </Flex>
          </Container>
        </Box>

        {/* New Features Section */}
        <Box
          bg={isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)"}
          py="20"
          position="relative"
          backdropFilter="blur(10px)"
        >
          <Container maxW="container.xl">
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              align="center"
              justify="space-between"
              gap="12"
            >
              {/* Left Side - Scroll Animation */}
              <Box 
                flex="1"
                height={{ base: "700px", lg: "800px" }}
                position="relative"
                overflow="visible"
                mx="-20px"
              >
                <ScrollAnimation />
              </Box>

              {/* Right Side - Content */}
              <Box 
                flex="1" 
                color={isDark ? "white" : "gray.800"}
              >
                <Heading 
                  as="h2" 
                  size="2xl" 
                  mb="6"
                  fontSize="55px"
                >
                  Experience <AnimatedGradientSpan>Music</AnimatedGradientSpan> Like Never Before
                </Heading>
                <Text fontSize="lg" mb="8" opacity="0.9">
                  Discover a world of endless possibilities with our cutting-edge music platform. 
                  Immerse yourself in crystal-clear sound quality, personalized playlists, and 
                  a vast library of tracks from around the globe.
                </Text>
                <Flex gap="4" flexWrap="wrap">
                  <Button
                    colorScheme="purple"
                    size="lg"
                    rounded="full"
                    px="8"
                  >
                    Start Listening
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    rounded="full"
                    px="8"
                    color={isDark ? "white" : "purple.600"}
                    borderColor={isDark ? "white" : "purple.600"}
                    _hover={{
                      bg: isDark ? "whiteAlpha.200" : "purple.50"
                    }}
                    rightIcon={<FaArrowRight />}
                    onClick={onDrawerOpen}
                  >
                    View Features
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Box>

        {/* Features Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={onDrawerClose}
          size="md"
        >
          <DrawerOverlay backdropFilter="blur(10px)" />
          <DrawerContent
            bg={isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"}
            borderLeftWidth="1px"
            borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
          >
            <DrawerCloseButton 
              color={isDark ? "white" : "gray.800"}
              _hover={{
                bg: isDark ? "whiteAlpha.200" : "purple.50"
              }}
            />
            <DrawerHeader
              borderBottomWidth="1px"
              borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
              color={isDark ? "white" : "gray.800"}
            >
              OutVibs Features
            </DrawerHeader>

            <DrawerBody 
              py={6} 
              sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                  }
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                }
              }}
            >
              <Flex direction="column" gap={6}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    p={6}
                    borderRadius="xl"
                    bg={isDark ? "whiteAlpha.50" : "purple.50"}
                    borderWidth="1px"
                    borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateX(-8px)",
                      bg: isDark ? "whiteAlpha.100" : "purple.100"
                    }}
                  >
                    <Flex align="center" gap={4}>
                      <Box
                        p={3}
                        borderRadius="lg"
                        fontSize="24px"
                        bg={feature.color}
                        color="white"
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color={isDark ? "white" : "gray.800"}
                          mb={1}
                        >
                          {feature.title}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={isDark ? "whiteAlpha.800" : "gray.600"}
                        >
                          {feature.description}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Audio Player Modal */}
        <AudioPlayerModal isOpen={isPlayerOpen} onClose={onPlayerClose} />

        {/* Sticky Blur Bar */}
        <BlurBar isDark={isDark}>
          <Flex gap={8}>
            <IconButton
              icon={<FaHome />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              aria-label="Home"
            />
            <IconButton
              icon={<FaSearch />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              aria-label="Search"
            />
            <IconButton
              icon={<FaCog />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              aria-label="Settings"
            />
          </Flex>
        </BlurBar>

        {/* Add padding only in dark mode */}
        {isDark && <Box pb="80px" />}
      </Box>
    </Box>
  )
}

export default App
