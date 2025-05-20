import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ScaleFade,
  Divider,
  Tag,
  Icon,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import {
  FaStar,
  FaMusic,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaEye,
  FaSave,
  FaShareAlt,
  FaThumbsUp,
} from "react-icons/fa";

// Updated artists with real Mexican artist names
const artists = [
  {
    name: "Luis Miguel",
    avatar: "/avatars/avt3.jpg",
    trending: true,
  },
  {
    name: "Selena Quintanilla",
    avatar: "/avatars/avt1.jpg",
  },
  {
    name: "Juan Gabriel",
    avatar: "/avatars/avt2.jpg",
  },
  {
    name: "Thalía",
    avatar: "/avatars/avt4.jpg",
    trending: true,
  },
  {
    name: "Vicente Fernández",
    avatar: "/avatars/avt5.jpg",
  },
  {
    name: "Paulina Rubio",
    avatar: "/avatars/avt6.jpg",
  },
  {
    name: "Alejandro Fernández",
    avatar: "/avatars/avt7.jpg",
  },
  {
    name: "Gloria Trevi",
    avatar: "/avatars/avt8.jpg",
    trending: true,
  },
];

// Real bios, followers, likes, and views for each artist
const artistDetails = {
  "Luis Miguel": {
    bio: "Luis Miguel, known as 'El Sol de México', is one of the most successful artists in Latin America, famous for his romantic ballads and powerful voice.",
    genre: "Latin Pop",
    followers: "7.2M",
    likes: "3.1M",
    views: "1.2B",
    socials: {
      instagram: "https://instagram.com/luismiguel",
      twitter: "https://twitter.com/luismiguel",
    },
    awards: ["6 Grammy Awards", "Latin Grammy Person of the Year"],
  },
  "Selena Quintanilla": {
    bio: "Selena was a beloved Mexican-American singer, known as the 'Queen of Tejano Music'. Her legacy lives on through her timeless hits.",
    genre: "Tejano, Latin Pop",
    followers: "5.8M",
    likes: "4.5M",
    views: "980M",
    socials: {
      instagram: "https://instagram.com/selenalaleyenda",
      twitter: "https://twitter.com/selenaqofficial",
    },
    awards: ["Grammy Award for Best Mexican-American Album"],
  },
  "Juan Gabriel": {
    bio: "Juan Gabriel was a prolific Mexican singer-songwriter, known for his flamboyant style and heartfelt compositions that touched millions.",
    genre: "Ranchera, Ballad",
    followers: "6.5M",
    likes: "3.9M",
    views: "1.1B",
    socials: {
      instagram: "https://instagram.com/soyjuangabriel",
      twitter: "https://twitter.com/soyjuangabriel",
    },
    awards: ["Billboard Latin Music Hall of Fame"],
  },
  Thalía: {
    bio: "Thalía is a Mexican singer, songwriter, and actress, recognized internationally as the 'Queen of Latin Pop'.",
    genre: "Latin Pop",
    followers: "8.1M",
    likes: "4.2M",
    views: "1.5B",
    socials: {
      instagram: "https://instagram.com/thalia",
      twitter: "https://twitter.com/thalia",
    },
    awards: ["Latin Grammy Award", "Billboard Latin Music Award"],
  },
  "Vicente Fernández": {
    bio: "Vicente Fernández, 'El Rey de la Música Ranchera', was a legendary Mexican singer and actor, beloved for his powerful voice and charisma.",
    genre: "Ranchera",
    followers: "7.9M",
    likes: "5.0M",
    views: "1.8B",
    socials: {
      instagram: "https://instagram.com/_vicentefdez",
      twitter: "https://twitter.com/_vicentefdez",
    },
    awards: ["3 Grammy Awards", "8 Latin Grammy Awards"],
  },
  "Paulina Rubio": {
    bio: "Paulina Rubio is a Mexican singer and actress, known as the 'Queen of Latin Pop' for her energetic performances and chart-topping hits.",
    genre: "Latin Pop",
    followers: "4.7M",
    likes: "2.8M",
    views: "700M",
    socials: {
      instagram: "https://instagram.com/paulinarubio",
      twitter: "https://twitter.com/paulinarubio",
    },
    awards: ["Lo Nuestro Award", "Billboard Latin Music Award"],
  },
  "Alejandro Fernández": {
    bio: "Alejandro Fernández, son of Vicente Fernández, is a celebrated Mexican singer known for his romantic ballads and ranchera songs.",
    genre: "Ranchera, Latin Pop",
    followers: "6.2M",
    likes: "3.7M",
    views: "950M",
    socials: {
      instagram: "https://instagram.com/alexoficial",
      twitter: "https://twitter.com/alexoficial",
    },
    awards: ["2 Latin Grammy Awards", "Billboard Latin Music Award"],
  },
  "Gloria Trevi": {
    bio: "Gloria Trevi is a Mexican singer-songwriter, dancer, and actress, famous for her bold style and energetic stage presence.",
    genre: "Pop Rock, Latin Pop",
    followers: "5.5M",
    likes: "3.3M",
    views: "800M",
    socials: {
      instagram: "https://instagram.com/gloriatrevi",
      twitter: "https://twitter.com/gloriatrevi",
    },
    awards: ["Billboard Latin Music Award", "Premios Lo Nuestro"],
  },
};

const scrollRow = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const scrollRowReverse = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const ArtistRow = ({ reverse, speed, badgeColor, onFollow }) => {
  const rowRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const rowArtists = [...artists, ...artists];

  // Get the appropriate gradient colors based on color mode
  const gradientStart = useColorModeValue("whiteAlpha.900", "blackAlpha.900");
  const gradientMiddle = useColorModeValue("whiteAlpha.800", "blackAlpha.800");

  useEffect(() => {
    if (!rowRef.current || !containerRef.current) return;

    const row = rowRef.current;
    const container = containerRef.current;
    let animationFrame;
    let startTime = null;
    let lastTime = 0;
    const duration = parseFloat(speed) * 1000 || 20000;
    const direction = reverse ? -1 : 1;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      if (isHovered) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const translateX = progress * 100 * direction;

      // Use transform3d for hardware acceleration
      row.style.transform = `translate3d(${translateX}%, 0, 0)`;
      
      // Reset animation when it completes one cycle
      if (elapsed >= duration) {
        startTime = currentTime;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [reverse, speed, isHovered]);

  return (
    <Box
      ref={containerRef}
      w="100%"
      position="relative"
      py={2}
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        overflowX: "hidden !important",
        overflowY: "hidden !important",
        "&": {
          scrollbarWidth: "none !important",
          msOverflowStyle: "none !important",
        },
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
      }}
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: { base: "40px", md: "80px" },
        zIndex: 2,
        pointerEvents: "none",
        bgGradient: `linear(to-r, ${gradientStart} 0%, ${gradientMiddle} 50%, transparent 100%)`,
      }}
      _after={{
        content: '""',
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: { base: "40px", md: "80px" },
        zIndex: 2,
        pointerEvents: "none",
        bgGradient: `linear(to-l, ${gradientStart} 0%, ${gradientMiddle} 50%, transparent 100%)`,
      }}
    >
      <Flex
        ref={rowRef}
        gap={6}
        align="center"
        minW="max-content"
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          transition: isHovered ? "transform 0.3s ease-out" : "none",
        }}
      >
        {rowArtists.map((artist, idx) => (
          <Box
            key={`${artist.name}-${idx}`}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="xl"
            boxShadow="md"
            p={4}
            minW="160px"
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            position="relative"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Avatar
              src={artist.avatar}
              name={artist.name}
              size="xl"
              mb={2}
              border="2px solid"
              borderColor={useColorModeValue("purple.400", "purple.300")}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
            <Text fontWeight="bold" fontSize="lg" mb={1}>
              {artist.name}
            </Text>
            {artist.trending && (
              <Badge
                colorScheme={badgeColor}
                position="absolute"
                top={2}
                right={2}
                fontSize="0.7em"
              >
                Trending
              </Badge>
            )}
            <Button
              size="sm"
              colorScheme="purple"
              variant="outline"
              mt={2}
              _hover={{
                bg: useColorModeValue("purple.50", "purple.900"),
                transform: "scale(1.05)",
                boxShadow: "0 0 16px #a855f7",
              }}
              onClick={() => onFollow(artist)}
            >
              Follow
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

function ArtistModal({ artist, isOpen, onClose }) {
  const details = artist ? artistDetails[artist.name] : null;
  const [likes, setLikes] = useState(
    details?.likes ? parseInt(details.likes.replace(/[^0-9]/g, "")) : 0
  );
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setLikes(
      details?.likes ? parseInt(details.likes.replace(/[^0-9]/g, "")) : 0
    );
    setSaved(false);
    setShared(false);
  }, [artist]);

  const handleLike = () => setLikes((l) => l + 1);
  const handleSave = () => setSaved(true);
  const handleShare = () => {
    setShared(true);
    if (navigator.share && artist) {
      navigator.share({
        title: artist.name,
        text: details?.bio,
        url: window.location.href,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay
        bg="blackAlpha.700"
        backdropFilter="blur(6px) hue-rotate(10deg)"
      />
      <ScaleFade initialScale={0.8} in={isOpen}>
        <ModalContent
          borderRadius="2xl"
          bg="rgba(10,10,10,0.85)"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1.5px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          }}
          color="white"
          p={2}
          position="relative"
          overflow="hidden"
        >
          <ModalHeader>
            <Flex align="center" gap={4}>
              <Box
                p="6px"
                borderRadius="full"
                bg="linear-gradient(135deg, #a855f7 60%, #fbb6ce 100%)"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={artist?.avatar}
                  name={artist?.name}
                  size="xl"
                  border="3px solid"
                  borderColor="#fff"
                  sx={{
                    boxShadow: "none",
                  }}
                  mr={2}
                />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                  {artist?.name}
                </Text>
                {details?.genre && (
                  <Tag colorScheme="purple" mt={1}>
                    <Icon as={FaMusic} mr={1} /> {details.genre}
                  </Tag>
                )}
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Divider mb={4} borderColor="purple.400" />
            <ScaleFade in={isOpen}>
              <Box>
                <Text fontSize="md" mb={3} opacity={0.85}>
                  {details?.bio || "No bio available."}
                </Text>
                <Flex align="center" gap={3} mb={3} flexWrap="wrap">
                  <Icon as={FaHeart} color="pink.300" />
                  <Text fontWeight="bold">
                    Followers:{" "}
                    <span style={{ color: "#fbb6ce" }}>
                      {details?.followers || "N/A"}
                    </span>
                  </Text>
                  <Icon as={FaEye} color="cyan.300" ml={4} />
                  <Text fontWeight="bold">
                    Views:{" "}
                    <span style={{ color: "#81e6d9" }}>
                      {details?.views || "N/A"}
                    </span>
                  </Text>
                  <Icon as={FaThumbsUp} color="yellow.300" ml={4} />
                  <Text fontWeight="bold">
                    Likes:{" "}
                    <span style={{ color: "#faf089" }}>
                      {likes.toLocaleString()}
                    </span>
                  </Text>
                </Flex>
                {details?.awards && (
                  <Flex gap={2} mb={3} flexWrap="wrap">
                    {details.awards.map((award, i) => (
                      <Tag key={i} colorScheme="yellow" variant="subtle">
                        <Icon as={FaStar} mr={1} /> {award}
                      </Tag>
                    ))}
                  </Flex>
                )}
                {details?.socials && (
                  <Flex gap={4} mt={2}>
                    {details.socials.instagram && (
                      <Button
                        as="a"
                        href={details.socials.instagram}
                        target="_blank"
                        leftIcon={<FaInstagram />}
                        colorScheme="pink"
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "pink.700", color: "white" }}
                      >
                        Instagram
                      </Button>
                    )}
                    {details.socials.twitter && (
                      <Button
                        as="a"
                        href={details.socials.twitter}
                        target="_blank"
                        leftIcon={<FaTwitter />}
                        colorScheme="twitter"
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "twitter.700", color: "white" }}
                      >
                        Twitter
                      </Button>
                    )}
                  </Flex>
                )}
                <HStack mt={6} spacing={4} justify="center">
                  <Button
                    leftIcon={<FaThumbsUp />}
                    colorScheme="yellow"
                    variant={
                      likes >
                      (details?.likes
                        ? parseInt(details.likes.replace(/[^0-9]/g, ""))
                        : 0)
                        ? "solid"
                        : "outline"
                    }
                    onClick={handleLike}
                    _hover={{ bg: "yellow.400", color: "black" }}
                  >
                    Like
                  </Button>
                  <Button
                    leftIcon={<FaSave />}
                    colorScheme="purple"
                    variant={saved ? "solid" : "outline"}
                    onClick={handleSave}
                    _hover={{ bg: "purple.400", color: "white" }}
                  >
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    leftIcon={<FaShareAlt />}
                    colorScheme="cyan"
                    variant={shared ? "solid" : "outline"}
                    onClick={handleShare}
                    _hover={{ bg: "cyan.400", color: "white" }}
                  >
                    {shared ? "Shared!" : "Share"}
                  </Button>
                </HStack>
              </Box>
            </ScaleFade>
          </ModalBody>
        </ModalContent>
      </ScaleFade>
    </Modal>
  );
}

export default function ArtistCarousel() {
  const [modalArtist, setModalArtist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFollow = useCallback((artist) => {
    setModalArtist(artist);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setModalArtist(null), 300);
  }, []);

  return (
    <Box
      w="100%"
      py={6}
      px={{ base: 1, md: 4 }}
      bg={useColorModeValue("gray.50", "gray.900")}
      borderRadius="2xl"
      boxShadow="lg"
      my={8}
      maxW="1264px"
      mx="auto"
      position="relative"
      overflow="hidden"
      minH="420px"
      sx={{
        "&": {
          scrollbarWidth: "none !important",
          msOverflowStyle: "none !important",
        },
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
      }}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        color={useColorModeValue("purple.600", "purple.300")}
        mb={4}
        textAlign="center"
        letterSpacing="tight"
      >
        Featured Artists
      </Text>
      <Box overflow="hidden" position="relative">
        <ArtistRow speed="30" badgeColor="purple" onFollow={handleFollow} />
        <ArtistRow
          reverse
          speed="35"
          badgeColor="pink"
          onFollow={handleFollow}
        />
        <ArtistRow speed="25" badgeColor="yellow" onFollow={handleFollow} />
      </Box>
      {modalArtist && (
        <ArtistModal
          artist={modalArtist}
          isOpen={modalOpen}
          onClose={handleClose}
        />
      )}
    </Box>
  );
}
