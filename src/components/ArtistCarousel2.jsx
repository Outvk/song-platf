import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  IconButton,
  useColorMode,
  Image,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaHeart } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import MusicVisualizer from './MusicVisualizer';

const artists = [
  {
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    genre: 'R&B',
    followers: '170M',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    name: 'Billie Eilish',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    genre: 'Pop',
    followers: '140M',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    name: 'Post Malone',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    genre: 'Hip Hop',
    followers: '130M',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    name: 'Dua Lipa',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    genre: 'Pop',
    followers: '110M',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    name: 'Travis Scott',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    genre: 'Hip Hop',
    followers: '100M',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

const ArtistCarousel2 = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const carouselRef = useRef(null);
  const audioRef = useRef(null);

  const scrollToNext = () => {
    if (currentIndex < artists.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(artists.length - 1);
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
  };

  const handlePlay = (artist) => {
    if (currentArtist?.name === artist.name) {
      setIsPlaying(!isPlaying);
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
      }
    } else {
      setCurrentArtist(artist);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = artist.audioUrl;
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <Box
      py="12"
      pb="0"
      bg={isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'}
      position="relative"
      backdropFilter="blur(10px)"
      overflow="hidden"
      m={0}
      borderBottomRadius={0}
    >
      <Container maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Trending Artists
          </Heading>
          <Text
            textAlign="center"
            fontSize="md"
            color={isDark ? 'whiteAlpha.800' : 'gray.600'}
            maxW="500px"
            mx="auto"
          >
            Stay updated with the latest trending artists and their new releases.
            Follow your favorites and never miss a beat.
          </Text>

          <Box position="relative" overflow="hidden">
            <Flex
              ref={carouselRef}
              overflowX="auto"
              gap={4}
              py={2}
              px={2}
              sx={{
                scrollSnapType: 'x mandatory',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '& > *': {
                  scrollSnapAlign: 'start',
                },
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
              }}
            >
              {artists.map((artist, index) => (
                <Box
                  key={artist.name}
                  flex="0 0 250px"
                  scrollSnapAlign="start"
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="xl"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: 'scale(1.02)',
                  }}
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={4}
                    bgGradient="linear(to-t, blackAlpha.900, transparent)"
                  >
                    <VStack align="start" spacing={1}>
                      <Heading size="md" color="white">
                        {artist.name}
                      </Heading>
                      <HStack spacing={4}>
                        <Text color="whiteAlpha.800" fontSize="sm">{artist.genre}</Text>
                        <Text color="whiteAlpha.800" fontSize="sm">
                          {artist.followers} followers
                        </Text>
                      </HStack>
                      <HStack spacing={2} mt={1}>
                        <Button
                          leftIcon={<FaPlay />}
                          colorScheme="purple"
                          size="xs"
                          borderRadius="full"
                          onClick={() => handlePlay(artist)}
                        >
                          {currentArtist?.name === artist.name && isPlaying ? 'Pause' : 'Play'}
                        </Button>
                        <IconButton
                          icon={<FaHeart />}
                          colorScheme="pink"
                          variant="ghost"
                          size="xs"
                          borderRadius="full"
                          aria-label="Follow artist"
                        />
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
              ))}
            </Flex>

            <IconButton
              icon={<FaChevronLeft />}
              position="absolute"
              left="-2"
              top="50%"
              transform="translateY(-50%)"
              colorScheme="purple"
              variant="solid"
              size="sm"
              borderRadius="full"
              onClick={scrollToPrev}
              aria-label="Previous artist"
              display={{ base: 'none', md: 'flex' }}
            />
            <IconButton
              icon={<FaChevronRight />}
              position="absolute"
              right="-2"
              top="50%"
              transform="translateY(-50%)"
              colorScheme="purple"
              variant="solid"
              size="sm"
              borderRadius="full"
              onClick={scrollToNext}
              aria-label="Next artist"
              display={{ base: 'none', md: 'flex' }}
            />

            {/* Dots Navigation */}
            <Flex
              position="absolute"
              bottom="-8"
              left="50%"
              transform="translateX(-50%)"
              gap={2}
              zIndex={2}
              mb={2}
            >
              {artists.map((_, index) => (
                <Box
                  key={index}
                  w="2"
                  h="2"
                  borderRadius="full"
                  bg={currentIndex === index ? 'purple.400' : 'whiteAlpha.400'}
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: currentIndex === index ? 'purple.500' : 'whiteAlpha.600',
                    transform: 'scale(1.2)',
                  }}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </Flex>
          </Box>
        </VStack>
      </Container>
      <audio ref={audioRef} />
      <MusicVisualizer />
    </Box>
  );
};

export default ArtistCarousel2; 