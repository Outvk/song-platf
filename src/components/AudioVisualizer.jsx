import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
} from 'react-icons/fa';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const gradientStart = useColorModeValue('purple.400', 'purple.600');
  const gradientEnd = useColorModeValue('pink.400', 'pink.600');

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Initialize audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;

        // Create canvas context
        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error('Canvas element not found');
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Set canvas dimensions
        const resizeCanvas = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Set up audio element
        const audio = new Audio('/music/M-me.mp3');
        audioRef.current = audio;

        // Wait for audio to be loaded
        await new Promise((resolve, reject) => {
          audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
            resolve();
          });
          audio.addEventListener('error', (e) => {
            reject(new Error('Failed to load audio: ' + e.message));
          });
        });

        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });

        // Connect audio to analyzer
        const source = audioContextRef.current.createMediaElementSource(audio);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        console.log('Audio context initialized successfully');
      } catch (err) {
        console.error('Error initializing audio:', err);
        setError(err.message);
      }
    };

    initializeAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      try {
        animationFrameRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          
          // Create gradient for each bar
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, gradientStart);
          gradient.addColorStop(1, gradientEnd);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );

          // Add glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = gradientEnd;
          ctx.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );
          ctx.shadowBlur = 0;

          x += barWidth + 1;
        }
      } catch (err) {
        console.error('Error in draw function:', err);
        setError(err.message);
      }
    };

    if (isPlaying) {
      draw();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isPlaying, gradientStart, gradientEnd]);

  const handlePlayPause = async () => {
    try {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Error in play/pause:', err);
      setError(err.message);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box
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
    >
      <VStack spacing={4} align="stretch">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color={useColorModeValue("purple.600", "purple.300")}
          textAlign="center"
          letterSpacing="tight"
        >
          Audio Visualizer
        </Text>

        {error && (
          <Text color="red.500" textAlign="center">
            Error: {error}
          </Text>
        )}

        <Box
          ref={canvasRef}
          w="100%"
          h="200px"
          borderRadius="xl"
          overflow="hidden"
          bg={useColorModeValue("gray.100", "gray.800")}
          border="1px solid"
          borderColor={borderColor}
        />

        <HStack spacing={4} justify="center">
          <Tooltip label="Shuffle">
            <IconButton
              aria-label="Shuffle"
              icon={<FaRandom />}
              colorScheme="purple"
              variant="ghost"
              rounded="full"
            />
          </Tooltip>

          <Tooltip label="Play/Pause">
            <IconButton
              aria-label="Play/Pause"
              icon={isPlaying ? <FaPause /> : <FaPlay />}
              colorScheme="purple"
              variant="solid"
              rounded="full"
              size="lg"
              onClick={handlePlayPause}
            />
          </Tooltip>

          <Tooltip label="Repeat">
            <IconButton
              aria-label="Repeat"
              icon={<FaRedo />}
              colorScheme="purple"
              variant="ghost"
              rounded="full"
            />
          </Tooltip>
        </HStack>

        <HStack spacing={4} px={4}>
          <IconButton
            aria-label="Mute"
            icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            colorScheme="purple"
            variant="ghost"
            rounded="full"
            onClick={handleMute}
          />
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            colorScheme="purple"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>

        <HStack spacing={2} px={4} justify="center">
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {formatTime(currentTime)}
          </Text>
          <Slider
            value={currentTime}
            max={duration}
            min={0}
            step={0.1}
            colorScheme="purple"
            onChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value;
                setCurrentTime(value);
              }
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {formatTime(duration)}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AudioVisualizer; 