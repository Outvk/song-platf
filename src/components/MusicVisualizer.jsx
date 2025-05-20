import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, useColorModeValue, Text } from '@chakra-ui/react';

const LOCAL_AUDIO = '/miss-me.mp3';
const REMOTE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // fallback

const COLOR_GRADIENTS = [
  ['#00F0FF', '#FF00C8'],
  ['#FFB300', '#FF005C'],
  ['#00FFB8', '#005CFF'],
  ['#FF00A8', '#FFB347'],
  ['#00FFEA', '#FF00A8'],
];

const MusicVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [animationId, setAnimationId] = useState(null);
  const [gradientIndex, setGradientIndex] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [audioSrc, setAudioSrc] = useState(LOCAL_AUDIO);
  const sourceRef = useRef(null);

  const bg = useColorModeValue('#18122B', '#18122B');

  // Try to load local audio, fallback to remote if error
  useEffect(() => {
    setAudioError(false);
    const audio = audioRef.current;
    if (!audio) return;
    const handleError = () => {
      setAudioError(true);
      setAudioSrc(REMOTE_AUDIO);
    };
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);

  // Resize canvas on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation and audio context
  useEffect(() => {
    if (!isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (animationId) cancelAnimationFrame(animationId);
      return;
    }
    let ctx, analyserNode, dataArray, bufferLength;
    let rafId;
    let audioCtx = audioContext;
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(audioCtx);
    }
    if (!analyser) {
      analyserNode = audioCtx.createAnalyser();
      setAnalyser(analyserNode);
    } else {
      analyserNode = analyser;
    }
    // Only create the source node once
    if (audioRef.current && audioCtx && analyserNode && !sourceRef.current) {
      sourceRef.current = audioCtx.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);
    }
    if (analyserNode) {
      analyserNode.fftSize = 128;
      bufferLength = analyserNode.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      ctx = canvasRef.current.getContext('2d');
      const draw = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // Gradient for bars
        const grad = ctx.createLinearGradient(0, 0, canvasRef.current.width, 0);
        const colors = COLOR_GRADIENTS[gradientIndex % COLOR_GRADIENTS.length];
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(1, colors[1]);
        analyserNode.getByteFrequencyData(dataArray);
        const barWidth = (canvasRef.current.width / bufferLength) * 1.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 1.2;
          ctx.save();
          ctx.shadowColor = colors[1];
          ctx.shadowBlur = 20;
          ctx.fillStyle = grad;
          ctx.fillRect(x, canvasRef.current.height - barHeight, barWidth, barHeight);
          ctx.restore();
          x += barWidth + 2;
        }
        rafId = requestAnimationFrame(draw);
      };
      draw();
      setAnimationId(rafId);
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line
  }, [isPlaying, gradientIndex, audioSrc]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => audioRef.current.play(), 100);
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  const handleGradientChange = () => {
    setGradientIndex((prev) => prev + 1);
  };

  return (
    <Box w="100%" maxW="900px" mx="auto" mt={8} mb={8} p={4} borderRadius="2xl" bg={bg} boxShadow="2xl" position="relative">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '220px', display: 'block', borderRadius: '1.5rem', background: bg }}
        width={900}
        height={220}
      />
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      {audioError && (
        <Text color="red.400" mt={2} textAlign="center">
          Local audio not found, using fallback audio.
        </Text>
      )}
      <Box position="absolute" left="50%" bottom="20px" transform="translateX(-50%)" display="flex" gap={4}>
        <Button colorScheme="purple" borderRadius="full" onClick={handlePlayPause} size="lg" boxShadow="md">
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button colorScheme="pink" borderRadius="full" onClick={handleGradientChange} size="lg" boxShadow="md">
          Change Colors
        </Button>
      </Box>
    </Box>
  );
};

export default MusicVisualizer;
