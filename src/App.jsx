import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useColorMode,
  Image,
  Icon,
  Drawer as ChakraDrawer,
  DrawerBody as ChakraDrawerBody,
  DrawerHeader as ChakraDrawerHeader,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerContent as ChakraDrawerContent,
  DrawerCloseButton as ChakraDrawerCloseButton,
  useDisclosure,
  IconButton,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CardCarousel from "./components/CardCarousel";
import ScrollAnimation from "./components/ScrollAnimation";
import AudioPlayerModal from "./components/AudioPlayerModal";
import styled from "styled-components";
import {
  FaPlay,
  FaHeadphones,
  FaArrowRight,
  FaHome,
  FaSearch,
  FaCog,
  FaHeart,
  FaArrowDown,
  FaThumbsUp,
  FaStar,
  FaPlus,
  FaFolderOpen,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLink,
} from "react-icons/fa";
import { useState } from "react";
import ArtistCarousel from "../ArtistCarousel";
import Footer from "../Footer";

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
  font-size: 55px;
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
  opacity: ${(props) => (props.isDark ? 1 : 0)};
  visibility: ${(props) => (props.isDark ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isPlayerOpen,
    onOpen: onPlayerOpen,
    onClose: onPlayerClose,
  } = useDisclosure();
  const [paramAlbum, setParamAlbum] = useState(null);
  const [isParamOpen, setIsParamOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isParamDrawerOpen, setIsParamDrawerOpen] = useState(false);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    file: null,
    description: "",
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
    website: "",
  });
  const toast = useToast();

  const [albums] = useState([
    { title: "Shape of You", album: "Divide" },
    { title: "Blinding Lights", album: "After Hours" },
    { title: "Levitating", album: "Future Nostalgia" },
    { title: "Peaches", album: "Justice" },
    { title: "Save Your Tears", album: "After Hours" },
    { title: "Don't Start Now", album: "Future Nostalgia" },
  ]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter albums by title or album name
  const filteredAlbums = albums.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.album.toLowerCase().includes(searchInput.toLowerCase())
  );

  const features = [
    {
      title: "Premium Music Quality",
      description:
        "Experience crystal clear audio with our high-fidelity streaming.",
      icon: "🎵",
      color: "#ff0088",
    },
    {
      title: "Personalized Playlists",
      description: "Get custom recommendations based on your music taste.",
      icon: "🎯",
      color: "#dd00ee",
    },
    {
      title: "Offline Mode",
      description: "Download your favorite tracks for offline listening.",
      icon: "💾",
      color: "#9911ff",
    },
    {
      title: "Cross-Platform Sync",
      description: "Seamlessly switch between devices without missing a beat.",
      icon: "🔄",
      color: "#0d63f8",
    },
    {
      title: "Social Sharing",
      description: "Share your favorite music with friends and family.",
      icon: "🤝",
      color: "#0cdcf7",
    },
    {
      title: "Live Lyrics",
      description: "Follow along with synchronized lyrics as you listen.",
      icon: "📝",
      color: "#8df0cc",
    },
  ];

  // Open parameter modal for an album
  const openParamModal = (album) => {
    setParamAlbum(album);
    setFavorite(false);
    setDownloaded(false);
    setIsParamOpen(true);
  };

  // Lists for favorite, downloaded, liked, and "engestri"
  const [favList, setFavList] = useState([]);
  const [downList, setDownList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [engestriList, setEngestriList] = useState([]);

  // Add/remove logic for each list
  const toggleFav = (album) => {
    setFavList((list) =>
      list.some((a) => a.title === album.title)
        ? list.filter((a) => a.title !== album.title)
        : [...list, album]
    );
  };
  const toggleDown = (album) => {
    setDownList((list) =>
      list.some((a) => a.title === album.title)
        ? list.filter((a) => a.title !== album.title)
        : [...list, album]
    );
  };
  const toggleLike = (album) => {
    setLikeList((list) =>
      list.some((a) => a.title === album.title)
        ? list.filter((a) => a.title !== album.title)
        : [...list, album]
    );
  };
  const toggleEngestri = (album) => {
    setEngestriList((list) =>
      list.some((a) => a.title === album.title)
        ? list.filter((a) => a.title !== album.title)
        : [...list, album]
    );
  };

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
            width: "100%",
            height: "120%",
            objectFit: "cover",
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
        <Box minH="100vh" display="flex" alignItems="center" pt="64px">
          <Container maxW="container.xl">
            <Flex
              direction={{ base: "column", lg: "row" }}
              align="center"
              justify="space-between"
              gap="8"
            >
              {/* Left Content */}
              <Box
                flex="1"
                color="white"
                textAlign={{ base: "center", lg: "left" }}
                mb={{ base: "12", lg: "0" }}
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
                <Heading as="h1" size="2xl" mb="6" lineHeight="1.2">
                  Discover & Share <br />
                  Your Favorite Music
                </Heading>
                <Text fontSize="xl" mb="8" opacity="0.9">
                  Join our community of music lovers. Share your playlists,
                  discover new artists, and connect with people who share your
                  taste in music.
                </Text>
                <Flex gap="4" justify={{ base: "center", lg: "flex-start" }}>
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
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    Learn More
                  </Button>
                </Flex>
              </Box>

              {/* Right Content - Card Carousel */}
              <Box
                flex="1"
                width="auto"
                height={{ base: "500px", lg: "600px" }}
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
              direction={{ base: "column", lg: "row" }}
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
              <Box flex="1" color={isDark ? "white" : "gray.800"}>
                <Heading as="h2" size="2xl" mb="6" fontSize="55px">
                  Experience <AnimatedGradientSpan>Music</AnimatedGradientSpan>{" "}
                  Like Never Before
                </Heading>
                <Text fontSize="lg" mb="8" opacity="0.9">
                  Discover a world of endless possibilities with our
                  cutting-edge music platform. Immerse yourself in crystal-clear
                  sound quality, personalized playlists, and a vast library of
                  tracks from around the globe.
                </Text>
                <Flex gap="4" flexWrap="wrap">
                  <Button colorScheme="purple" size="lg" rounded="full" px="8">
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
                      bg: isDark ? "whiteAlpha.200" : "purple.50",
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

        {/* Artist Carousel Section */}
        <ArtistCarousel />

        {/* Features Drawer */}
        <ChakraDrawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={onDrawerClose}
          size="md"
        >
          <ChakraDrawerOverlay backdropFilter="blur(10px)" />
          <ChakraDrawerContent
            bg={isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)"}
            borderLeftWidth="1px"
            borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
          >
            <ChakraDrawerCloseButton
              color={isDark ? "white" : "gray.800"}
              _hover={{
                bg: isDark ? "whiteAlpha.200" : "purple.50",
              }}
            />
            <ChakraDrawerHeader
              borderBottomWidth="1px"
              borderColor={isDark ? "whiteAlpha.200" : "purple.100"}
              color={isDark ? "white" : "gray.800"}
            >
              OutVibs Features
            </ChakraDrawerHeader>

            <ChakraDrawerBody
              py={6}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: isDark
                    ? "rgba(0, 0, 0, 0.5)"
                    : "rgba(0, 0, 0, 0.3)",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(0, 0, 0, 0.7)"
                      : "rgba(0, 0, 0, 0.5)",
                  },
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                },
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
                      bg: isDark ? "whiteAlpha.100" : "purple.100",
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
            </ChakraDrawerBody>
          </ChakraDrawerContent>
        </ChakraDrawer>

        {/* Audio Player Modal */}
        <AudioPlayerModal isOpen={isPlayerOpen} onClose={onPlayerClose} />

        {/* Search Modal */}
        {isSearchOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="rgba(0,0,0,0.2)"
            zIndex="2000"
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <Box
              bg="black"
              p={8}
              borderRadius="lg"
              minW="350px"
              maxW="90vw"
              boxShadow="lg"
              position="relative"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                  backgroundColor: "black",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#222",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "black",
                  borderRadius: "4px",
                },
              }}
            >
              <Button
                size="sm"
                position="absolute"
                top="12px"
                right="12px"
                onClick={() => setIsSearchOpen(false)}
              >
                Close
              </Button>
              <Heading size="md" mb={4}>
                Search Albums & Titles
              </Heading>
              <input
                type="text"
                placeholder="Type to search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "16px",
                }}
                autoFocus
              />
              <Box
                maxH="250px"
                overflowY="auto"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    backgroundColor: "black",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#222",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "black",
                    borderRadius: "4px",
                  },
                }}
              >
                {filteredAlbums.length === 0 ? (
                  <Text>No results found.</Text>
                ) : (
                  filteredAlbums.map((item, idx) => (
                    <Flex
                      key={idx}
                      py={2}
                      borderBottom="1px solid #eee"
                      align="center"
                      gap={3}
                    >
                      <Avatar
                        size="sm"
                        name={item.title}
                        bg="purple.400"
                        color="white"
                        fontWeight="bold"
                      />
                      <Box flex="1">
                        <Text fontWeight="bold">{item.title}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {item.album}
                        </Text>
                      </Box>
                      <IconButton
                        icon={
                          <FaHeart
                            color={
                              favList.some((a) => a.title === item.title)
                                ? "#ED64A6"
                                : "#A0AEC0"
                            }
                          />
                        }
                        aria-label="Favorite"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFav(item)}
                        mr={1}
                      />
                      <IconButton
                        icon={
                          <FaArrowDown
                            color={
                              downList.some((a) => a.title === item.title)
                                ? "#4299E1"
                                : "#A0AEC0"
                            }
                          />
                        }
                        aria-label="Download"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDown(item)}
                        mr={1}
                      />
                      <IconButton
                        icon={
                          <FaThumbsUp
                            color={
                              likeList.some((a) => a.title === item.title)
                                ? "#48BB78"
                                : "#A0AEC0"
                            }
                          />
                        }
                        aria-label="Like"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(item)}
                        mr={1}
                      />
                      <IconButton
                        icon={
                          <FaStar
                            color={
                              engestriList.some((a) => a.title === item.title)
                                ? "#ECC94B"
                                : "#A0AEC0"
                            }
                          />
                        }
                        aria-label="Engestri"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEngestri(item)}
                        mr={1}
                      />
                      <IconButton
                        icon={<FaArrowRight />}
                        aria-label="View"
                        colorScheme="purple"
                        variant="outline"
                        size="sm"
                        onClick={() => openParamModal(item)}
                      />
                    </Flex>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Parameter Modal */}
        <Modal
          isOpen={isParamOpen}
          onClose={() => setIsParamOpen(false)}
          isCentered
          size="lg"
        >
          <ModalOverlay bg="rgba(0,0,0,0.5)" backdropFilter="blur(6px)" />
          <ModalContent bg="gray.900" color="white" borderRadius="lg">
            <ModalHeader>
              Parameters for{" "}
              <span style={{ color: "#b794f4" }}>{paramAlbum?.title}</span>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th color="purple.300">Parameter</Th>
                    <Th color="purple.300">Value</Th>
                    <Th color="purple.300">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Title</Td>
                    <Td>{paramAlbum?.title}</Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>Album</Td>
                    <Td>{paramAlbum?.album}</Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>Favorite</Td>
                    <Td>
                      <Switch
                        colorScheme="purple"
                        isChecked={favorite}
                        onChange={() => setFavorite((v) => !v)}
                      />
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="purple"
                        variant="ghost"
                        onClick={() => {
                          setFavorite(true);
                          toast({
                            title: "Marked as favorite!",
                            status: "success",
                            duration: 1200,
                          });
                        }}
                      >
                        Mark
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Downloaded</Td>
                    <Td>
                      <Switch
                        colorScheme="purple"
                        isChecked={downloaded}
                        onChange={() => setDownloaded((v) => !v)}
                      />
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="purple"
                        variant="ghost"
                        onClick={() => {
                          setDownloaded(true);
                          toast({
                            title: "Downloaded!",
                            status: "info",
                            duration: 1200,
                          });
                        }}
                      >
                        Download
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Share</Td>
                    <Td colSpan={2}>
                      <Button
                        size="sm"
                        colorScheme="purple"
                        variant="solid"
                        onClick={() => {
                          toast({
                            title: "Share link copied!",
                            status: "success",
                            duration: 1200,
                          });
                        }}
                      >
                        Copy Share Link
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Parameter Drawer (left side) */}
        <ChakraDrawer
          isOpen={isParamDrawerOpen}
          placement="left"
          onClose={() => setIsParamDrawerOpen(false)}
          size="md"
        >
          <ChakraDrawerOverlay backdropFilter="blur(8px)" />
          <ChakraDrawerContent bg="black" color="white" borderRightWidth="0">
            <ChakraDrawerCloseButton color="white" />
            <ChakraDrawerHeader
              borderBottomWidth="1px"
              borderColor="purple.700"
            >
              Parameters
            </ChakraDrawerHeader>
            <ChakraDrawerBody
              sx={{
                "&": {
                  maxHeight: "calc(100vh - 80px)",
                  overflowY: "auto",
                },
                "&::-webkit-scrollbar": {
                  width: "10px",
                  backgroundColor: "#18123a",
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #805ad5 100%)",
                  borderRadius: "8px",
                  minHeight: "40px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#1a1a2e",
                  borderRadius: "8px",
                },
              }}
            >
              {/* Account Parameters */}
              <Box mb={6} p={4} bg="gray.800" borderRadius="md" boxShadow="md">
                <Text fontWeight="bold" fontSize="lg" color="purple.200" mb={2}>
                  Account
                </Text>
                <Flex align="center" gap={3} mb={2}>
                  <Avatar name="John Doe" size="sm" bg="purple.500" />
                  <Box>
                    <Text fontWeight="bold">Out River</Text>
                    <Text fontSize="sm" color="gray.400">
                      river.out@email.com
                    </Text>
                  </Box>
                </Flex>
                <Flex gap={2} mt={2}>
                  <Button
                    size="xs"
                    colorScheme="purple"
                    variant="outline"
                    onClick={() => alert("Edit profile")}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    size="xs"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => alert("Logout")}
                  >
                    Logout
                  </Button>
                </Flex>
                <Flex gap={2} mt={3}>
                  <Button
                    size="xs"
                    colorScheme="yellow"
                    variant="outline"
                    onClick={() => alert("Upgrade to Premium")}
                  >
                    Upgrade
                  </Button>
                  <Button
                    size="xs"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => alert("Account Settings")}
                  >
                    Settings
                  </Button>
                </Flex>
              </Box>
              {/* Tabs for different parameter sections */}
              <Box mb={6}>
                <Flex gap={2} mb={4} flexWrap="wrap">
                  <Button
                    leftIcon={<FaHeart color="#ED64A6" />}
                    size="sm"
                    colorScheme="pink"
                    variant="solid"
                    bgGradient="linear(to-r, pink.400, pink.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, pink.500, pink.700)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #ED64A6",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={() => alert("Favorites tab clicked")}
                  >
                    Favorites
                  </Button>
                  <Button
                    leftIcon={<FaArrowDown color="#4299E1" />}
                    size="sm"
                    colorScheme="blue"
                    variant="solid"
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, blue.500, blue.700)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #4299E1",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={() => alert("Downloads tab clicked")}
                  >
                    Downloads
                  </Button>
                  <Button
                    leftIcon={<FaThumbsUp color="#48BB78" />}
                    size="sm"
                    colorScheme="green"
                    variant="solid"
                    bgGradient="linear(to-r, green.400, green.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, green.500, green.700)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #48BB78",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={() => alert("Likes tab clicked")}
                  >
                    Likes
                  </Button>
                  <Button
                    leftIcon={<FaStar color="#ECC94B" />}
                    size="sm"
                    colorScheme="yellow"
                    variant="solid"
                    bgGradient="linear(to-r, yellow.400, yellow.600)"
                    color="black"
                    _hover={{
                      bgGradient: "linear(to-r, yellow.500, yellow.700)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #ECC94B",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={() => alert("Engestri tab clicked")}
                  >
                    Engestri
                  </Button>
                  <Button
                    leftIcon={<FaCog />}
                    size="sm"
                    colorScheme="purple"
                    variant="solid"
                    bgGradient="linear(to-r, purple.400, purple.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, purple.500, purple.700)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #805ad5",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={toggleColorMode}
                  >
                    Toggle Theme
                  </Button>
                  <Button
                    leftIcon={<FaHome />}
                    size="sm"
                    colorScheme="gray"
                    variant="solid"
                    bgGradient="linear(to-r, gray.600, gray.800)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, gray.700, gray.900)",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 2px #718096",
                    }}
                    borderRadius="full"
                    px={5}
                    onClick={() => window.location.reload()}
                  >
                    Home
                  </Button>
                </Flex>
              </Box>
              {/* List counts */}
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th color="purple.300">List</Th>
                    <Th color="purple.300">Count</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Flex align="center" gap={2}>
                        <FaHeart color="#ED64A6" /> Fav List
                      </Flex>
                    </Td>
                    <Td>{favList.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex align="center" gap={2}>
                        <FaArrowDown color="#4299E1" /> Down List
                      </Flex>
                    </Td>
                    <Td>{downList.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex align="center" gap={2}>
                        <FaThumbsUp color="#48BB78" /> Like List
                      </Flex>
                    </Td>
                    <Td>{likeList.length}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex align="center" gap={2}>
                        <FaStar color="#ECC94B" /> Engestri List
                      </Flex>
                    </Td>
                    <Td>{engestriList.length}</Td>
                  </Tr>
                </Tbody>
              </Table>
              {/* Optionally, show items in each list */}
              <Box mt={6}>
                <Text fontWeight="bold" color="purple.200" mb={1}>
                  Fav List
                </Text>
                {favList.length === 0 ? (
                  <Text color="gray.400">Empty</Text>
                ) : (
                  favList.map((a) => (
                    <Flex key={a.title} align="center" gap={2}>
                      <FaHeart color="#ED64A6" />
                      <Text fontSize="sm">{a.title}</Text>
                    </Flex>
                  ))
                )}
                <Text fontWeight="bold" color="purple.200" mt={3} mb={1}>
                  Down List
                </Text>
                {downList.length === 0 ? (
                  <Text color="gray.400">Empty</Text>
                ) : (
                  downList.map((a) => (
                    <Flex key={a.title} align="center" gap={2}>
                      <FaArrowDown color="#4299E1" />
                      <Text fontSize="sm">{a.title}</Text>
                    </Flex>
                  ))
                )}
                <Text fontWeight="bold" color="purple.200" mt={3} mb={1}>
                  Like List
                </Text>
                {likeList.length === 0 ? (
                  <Text color="gray.400">Empty</Text>
                ) : (
                  likeList.map((a) => (
                    <Flex key={a.title} align="center" gap={2}>
                      <FaThumbsUp color="#48BB78" />
                      <Text fontSize="sm">{a.title}</Text>
                    </Flex>
                  ))
                )}
                <Text fontWeight="bold" color="purple.200" mt={3} mb={1}>
                  Engestri List
                </Text>
                {engestriList.length === 0 ? (
                  <Text color="gray.400">Empty</Text>
                ) : (
                  engestriList.map((a) => (
                    <Flex key={a.title} align="center" gap={2}>
                      <FaStar color="#ECC94B" />
                      <Text fontSize="sm">{a.title}</Text>
                    </Flex>
                  ))
                )}
              </Box>
              {/* Add more functions or tabs as needed */}
            </ChakraDrawerBody>
          </ChakraDrawerContent>
        </ChakraDrawer>

        {/* Add Song Modal */}
        <Modal
          isOpen={isAddSongOpen}
          onClose={() => setIsAddSongOpen(false)}
          isCentered
          size="lg"
        >
          <ModalOverlay />
          <ModalContent bg="gray.900" color="white" borderRadius="lg">
            <ModalHeader>
              <Flex align="center" gap={2}>
                <Avatar
                  icon={<FaFolderOpen />}
                  bg="purple.500"
                  size="md"
                  name={newSong.title || "Song"}
                  src={newSong.avatarPreview}
                  border="2px solid #a855f7"
                  cursor="pointer"
                  onClick={() =>
                    document.getElementById("song-avatar-input").click()
                  }
                />
                Add Your Song
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box as="form" pb={4}>
                {/* Avatar chooser */}
                <input
                  id="song-avatar-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setNewSong((song) => ({
                          ...song,
                          avatar: file,
                          avatarPreview: ev.target.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Text fontWeight="bold" mb={1}>
                  Song Title
                </Text>
                <input
                  type="text"
                  value={newSong.title}
                  onChange={(e) =>
                    setNewSong({ ...newSong, title: e.target.value })
                  }
                  placeholder="Enter song title"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    marginBottom: "12px",
                    background: "#18123a",
                    color: "white",
                  }}
                />
                <Text fontWeight="bold" mb={1}>
                  Song File
                </Text>
                <Flex align="center" gap={2} mb={3}>
                  <Avatar icon={<FaFolderOpen />} bg="purple.400" />
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setNewSong({ ...newSong, file: e.target.files[0] })
                    }
                    style={{
                      color: "white",
                      background: "#18123a",
                      borderRadius: "4px",
                      border: "1px solid #444",
                      padding: "6px",
                    }}
                  />
                </Flex>
                <Text fontWeight="bold" mb={1}>
                  Description
                </Text>
                <textarea
                  value={newSong.description}
                  onChange={(e) =>
                    setNewSong({ ...newSong, description: e.target.value })
                  }
                  placeholder="Describe your song..."
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    marginBottom: "12px",
                    background: "#18123a",
                    color: "white",
                    minHeight: "60px",
                    resize: "vertical",
                  }}
                />
                <Text fontWeight="bold" mb={1}>
                  Social Media Links
                </Text>
                <Flex direction="column" gap={2} mb={2}>
                  <Flex gap={2} align="center">
                    <Icon as={FaInstagram} color="#E1306C" minWidth="24px" />
                    <input
                      type="url"
                      placeholder="Instagram"
                      value={newSong.instagram}
                      onChange={(e) =>
                        setNewSong({ ...newSong, instagram: e.target.value })
                      }
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #444",
                        background: "#18123a",
                        color: "white",
                      }}
                    />
                  </Flex>
                  <Flex gap={2} align="center">
                    <Icon as={FaTwitter} color="#1DA1F2" minWidth="24px" />
                    <input
                      type="url"
                      placeholder="Twitter"
                      value={newSong.twitter}
                      onChange={(e) =>
                        setNewSong({ ...newSong, twitter: e.target.value })
                      }
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #444",
                        background: "#18123a",
                        color: "white",
                      }}
                    />
                  </Flex>
                  <Flex gap={2} align="center">
                    <Icon as={FaFacebook} color="#1877F3" minWidth="24px" />
                    <input
                      type="url"
                      placeholder="Facebook"
                      value={newSong.facebook}
                      onChange={(e) =>
                        setNewSong({ ...newSong, facebook: e.target.value })
                      }
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #444",
                        background: "#18123a",
                        color: "white",
                      }}
                    />
                  </Flex>
                  <Flex gap={2} align="center">
                    <Icon as={FaYoutube} color="#FF0000" minWidth="24px" />
                    <input
                      type="url"
                      placeholder="YouTube"
                      value={newSong.youtube}
                      onChange={(e) =>
                        setNewSong({ ...newSong, youtube: e.target.value })
                      }
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #444",
                        background: "#18123a",
                        color: "white",
                      }}
                    />
                  </Flex>
                  <Flex gap={2} align="center">
                    <Icon as={FaLink} color="#b794f4" minWidth="24px" />
                    <input
                      type="url"
                      placeholder="Website"
                      value={newSong.website}
                      onChange={(e) =>
                        setNewSong({ ...newSong, website: e.target.value })
                      }
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #444",
                        background: "#18123a",
                        color: "white",
                      }}
                    />
                  </Flex>
                </Flex>
                <Button
                  mt={4}
                  colorScheme="purple"
                  width="100%"
                  leftIcon={<FaPlus />}
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Song added!",
                      description: "Your song has been submitted.",
                      status: "success",
                      duration: 1800,
                    });
                    setIsAddSongOpen(false);
                    setNewSong({
                      title: "",
                      file: null,
                      avatar: null,
                      avatarPreview: undefined,
                      description: "",
                      instagram: "",
                      twitter: "",
                      facebook: "",
                      youtube: "",
                      website: "",
                    });
                  }}
                >
                  Add Song
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Sticky Blur Bar */}
        <BlurBar isDark={isDark}>
          <Flex gap={8}>
            <IconButton
              icon={<FaPlus />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              aria-label="Add Song"
              onClick={() => setIsAddSongOpen(true)}
            />
            <IconButton
              icon={<FaSearch />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            />
            <IconButton
              icon={<FaCog />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              aria-label="Settings"
              onClick={() => setIsParamDrawerOpen(true)}
            />
          </Flex>
        </BlurBar>

        {/* Show floating buttons in light mode */}
        {!isDark && (
          <Flex
            position="fixed"
            bottom="24px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={100}
            gap={8}
            bg="white"
            borderRadius="full"
            boxShadow="lg"
            px={6}
            py={2}
            align="center"
          >
            <IconButton
              icon={<FaPlus />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="purple.600"
              _hover={{ bg: "purple.50" }}
              aria-label="Add Song"
              onClick={() => setIsAddSongOpen(true)}
            />
            <IconButton
              icon={<FaSearch />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="purple.600"
              _hover={{ bg: "purple.50" }}
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            />
            <IconButton
              icon={<FaCog />}
              variant="ghost"
              colorScheme="purple"
              size="lg"
              color="purple.600"
              _hover={{ bg: "purple.50" }}
              aria-label="Settings"
              onClick={() => setIsParamDrawerOpen(true)}
            />
          </Flex>
        )}

        {/* Add padding only in dark mode */}
        {isDark && <Box pb="80px" />}
      </Box>
      {/* Place Footer at the end of your main Box */}
      <Footer />
    </Box>
  );
}

export default App;
