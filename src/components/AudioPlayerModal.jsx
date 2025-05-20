import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  Progress,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  VStack,
  HStack,
  Tooltip
} from '@chakra-ui/react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaHeart, FaRandom } from 'react-icons/fa';

const trendingSongs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    duration: "3:45",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: "2.3M",
    trending: "+45%"
  },
  {
    id: 2,
    title: "Electric Sunset",
    artist: "Neon Pulse",
    duration: "4:20",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    likes: "1.8M",
    trending: "+38%"
  },
  {
    id: 3,
    title: "Urban Rhythm",
    artist: "City Beats",
    duration: "3:55",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    likes: "1.5M",
    trending: "+32%"
  }
];

const popularSongs = [
  {
    id: 4,
    title: "Ocean Waves",
    artist: "Coastal Vibes",
    duration: "4:10",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    likes: "3.1M",
    trending: "+28%"
  },
  {
    id: 5,
    title: "Mountain Echo",
    artist: "Nature Sound",
    duration: "3:50",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    likes: "2.7M",
    trending: "+25%"
  },
  {
    id: 6,
    title: "City Lights",
    artist: "Urban Dreams",
    duration: "4:05",
    avatar: "/images/hero-avatar.gif",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    likes: "2.4M",
    trending: "+22%"
  }
];

const SongRow = ({ song, isPlaying, onPlay, isActive }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      align="center"
      p={4}
      borderRadius="xl"
      bg={isActive ? (isDark ? 'whiteAlpha.100' : 'purple.50') : 'transparent'}
      transition="all 0.3s"
      _hover={{
        bg: isDark ? 'whiteAlpha.200' : 'purple.100',
        transform: 'translateX(8px)'
      }}
    >
      <Avatar src={song.avatar} size="md" mr={4} />
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="md">{song.title}</Text>
        <Text fontSize="sm" color={isDark ? 'whiteAlpha.700' : 'gray.600'}>{song.artist}</Text>
      </Box>
      <HStack spacing={4} align="center">
        <Badge colorScheme="green" variant="subtle">
          {song.trending}
        </Badge>
        <Text fontSize="sm" color={isDark ? 'whiteAlpha.700' : 'gray.600'}>
          {song.duration}
        </Text>
        <IconButton
          icon={isActive && isPlaying ? <FaPause /> : <FaPlay />}
          variant="ghost"
          colorScheme="purple"
          size="sm"
          onClick={() => onPlay(song)}
        />
      </HStack>
    </Flex>
  );
};

const AudioPlayerModal = ({ isOpen, onClose }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      handleNextSong();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  const handlePlay = (song) => {
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.play();
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;

    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const newProgress = (clickPosition / progressBarWidth) * 100;
    const newTime = (duration * newProgress) / 100;

    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  const handleVolumeChange = () => {
    if (!audioRef.current) return;
    
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    
    if (!newMuted && volume === 0) {
      setVolume(1);
      audioRef.current.volume = 1;
    }
  };

  const handlePreviousSong = () => {
    const allSongs = [...trendingSongs, ...popularSongs];
    const currentIndex = allSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex > 0) {
      handlePlay(allSongs[currentIndex - 1]);
    }
  };

  const handleNextSong = () => {
    const allSongs = [...trendingSongs, ...popularSongs];
    const currentIndex = allSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex < allSongs.length - 1) {
      handlePlay(allSongs[currentIndex + 1]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg={isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
      >
        <ModalHeader color={isDark ? "white" : "gray.800"}>
          OutVibs Player
        </ModalHeader>
        <ModalCloseButton color={isDark ? "white" : "gray.800"} />
        
        <ModalBody pb={6}>
          <audio ref={audioRef} />
          
          {/* Current Song Player */}
          {currentSong && (
            <Box mb={6}>
              <Flex align="center" mb={4}>
                <Avatar src={currentSong.avatar} size="lg" mr={4} />
                <Box flex={1}>
                  <Text fontSize="xl" fontWeight="bold" color={isDark ? "white" : "gray.800"}>
                    {currentSong.title}
                  </Text>
                  <Text fontSize="md" color={isDark ? "whiteAlpha.700" : "gray.600"}>
                    {currentSong.artist}
                  </Text>
                </Box>
                <HStack spacing={3}>
                  <IconButton
                    icon={<FaRandom />}
                    variant="ghost"
                    colorScheme="purple"
                    size="md"
                  />
                  <IconButton
                    icon={<FaHeart />}
                    variant="ghost"
                    colorScheme={isLiked ? "red" : "purple"}
                    size="md"
                    onClick={() => setIsLiked(!isLiked)}
                  />
                  <IconButton
                    icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    variant="ghost"
                    colorScheme="purple"
                    size="md"
                    onClick={handleVolumeChange}
                  />
                </HStack>
              </Flex>
              
              <Box mb={4}>
                <Box
                  as="div"
                  onClick={handleProgressClick}
                  cursor="pointer"
                  w="100%"
                  h="20px"
                  position="relative"
                  _hover={{ '& > div': { height: '8px' } }}
                >
                  <Progress
                    value={progress}
                    size="sm"
                    colorScheme="purple"
                    borderRadius="full"
                    bg={isDark ? "whiteAlpha.100" : "purple.100"}
                    transition="height 0.2s"
                    height="4px"
                  />
                </Box>
                <Flex justify="space-between" mt={2}>
                  <Text fontSize="sm" color={isDark ? "whiteAlpha.700" : "gray.600"}>
                    {formatTime(duration * (progress / 100))}
                  </Text>
                  <Text fontSize="sm" color={isDark ? "whiteAlpha.700" : "gray.600"}>
                    {formatTime(duration)}
                  </Text>
                </Flex>
              </Box>

              <Flex justify="center" gap={4}>
                <IconButton
                  icon={<FaStepBackward />}
                  variant="ghost"
                  colorScheme="purple"
                  size="lg"
                  onClick={handlePreviousSong}
                />
                <IconButton
                  icon={isPlaying ? <FaPause /> : <FaPlay />}
                  variant="solid"
                  colorScheme="purple"
                  size="lg"
                  onClick={togglePlayPause}
                />
                <IconButton
                  icon={<FaStepForward />}
                  variant="ghost"
                  colorScheme="purple"
                  size="lg"
                  onClick={handleNextSong}
                />
              </Flex>
            </Box>
          )}

          {/* Song Lists */}
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList mb={4}>
              <Tab>Trending</Tab>
              <Tab>Popular</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <VStack spacing={2} align="stretch">
                  {trendingSongs.map(song => (
                    <SongRow
                      key={song.id}
                      song={song}
                      isPlaying={isPlaying}
                      onPlay={handlePlay}
                      isActive={currentSong?.id === song.id}
                    />
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel p={0}>
                <VStack spacing={2} align="stretch">
                  {popularSongs.map(song => (
                    <SongRow
                      key={song.id}
                      song={song}
                      isPlaying={isPlaying}
                      onPlay={handlePlay}
                      isActive={currentSong?.id === song.id}
                    />
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AudioPlayerModal; 