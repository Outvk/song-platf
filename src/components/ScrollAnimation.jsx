'use client'

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "framer-motion"
import { useRef, useState } from "react"
import styled from "styled-components"
import { 
    Avatar, 
    Button, 
    Badge, 
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    HStack,
    VStack,
    Icon,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Image,
    IconButton
} from "@chakra-ui/react"
import { FaHeart, FaPlay, FaChartLine, FaFire, FaStar } from 'react-icons/fa'

const albumData = {
    "Premium Music": {
        image: "https://picsum.photos/id/64/400/400",
        artist: "Various Artists",
        releaseDate: "2024",
        trending: "+25%",
        likes: "2.3M",
        bestSeller: true,
        description: "A curated collection of high-fidelity audio tracks showcasing the best in modern music production.",
        lastAlbum: "Acoustic Sessions Vol. 1",
        rating: 4.8
    },
    "Personalized Playlists": {
        image: "https://picsum.photos/id/65/400/400",
        artist: "AI DJ",
        releaseDate: "2024",
        trending: "+42%",
        likes: "1.8M",
        bestSeller: true,
        description: "AI-powered playlist featuring tracks tailored to your unique music taste and preferences.",
        lastAlbum: "Your 2023 Rewind",
        rating: 4.9
    },
    "Offline Mode": {
        image: "https://picsum.photos/id/68/400/400",
        artist: "Local Favorites",
        releaseDate: "2024",
        trending: "+18%",
        likes: "956K",
        bestSeller: false,
        description: "Your favorite tracks available offline, perfect for on-the-go listening without internet.",
        lastAlbum: "Travel Mix 2024",
        rating: 4.7
    },
    "Cross-Platform Sync": {
        image: "https://picsum.photos/id/76/400/400",
        artist: "Cloud Service",
        releaseDate: "2024",
        trending: "+33%",
        likes: "1.2M",
        bestSeller: false,
        description: "Seamlessly synced playlists and preferences across all your devices.",
        lastAlbum: "Device Mix",
        rating: 4.6
    },
    "Social Sharing": {
        image: "https://picsum.photos/id/77/400/400",
        artist: "Community Picks",
        releaseDate: "2024",
        trending: "+55%",
        likes: "3.1M",
        bestSeller: true,
        description: "Most shared tracks and playlists from our vibrant community of music lovers.",
        lastAlbum: "Viral Hits 2024",
        rating: 4.9
    },
    "Live Lyrics": {
        image: "https://picsum.photos/id/78/400/400",
        artist: "Lyric Masters",
        releaseDate: "2024",
        trending: "+28%",
        likes: "1.5M",
        bestSeller: false,
        description: "Enhanced music experience with perfectly synchronized lyrics for sing-along fun.",
        lastAlbum: "Karaoke Hits",
        rating: 4.7
    }
};

export default function ScrollAnimation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedAlbumName, setSelectedAlbumName] = useState(null);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [ratings, setRatings] = useState({});
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ 
        container: ref,
        offset: ["start start", "end end"] 
    });
    const maskImage = useScrollOverflowMask(scrollYProgress);

    const handleView = (albumName) => {
        setSelectedAlbum(albumData[albumName]);
        setIsOpen(true);
    };

    const handleRateClick = (albumName) => {
        setSelectedAlbumName(albumName);
        setIsRatingOpen(true);
    };

    const handleRatingSubmit = (rating) => {
        setRatings(prev => ({
            ...prev,
            [selectedAlbumName]: rating
        }));
        setIsRatingOpen(false);
        setHoveredRating(0);
    };

    const renderStars = (isHover = false) => {
        const rating = isHover ? hoveredRating : ratings[selectedAlbumName] || 0;
        return [...Array(5)].map((_, index) => (
            <IconButton
                key={index}
                icon={<FaStar />}
                variant="ghost"
                color={index < rating ? "yellow.400" : "gray.400"}
                _hover={{ transform: "scale(1.2)" }}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingSubmit(index + 1)}
                aria-label={`Rate ${index + 1} stars`}
            />
        ));
    };

    return (
        <StyledWrapper>
            <div className="scroll-container">
                <svg className="progress" width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="30"
                        pathLength="1"
                        className="indicator"
                        style={{ pathLength: scrollYProgress }}
                    />
                </svg>
                <motion.ul ref={ref} style={{ maskImage }}>
                    <li style={{ background: "#ff0088" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/64/200/300" />
                            <Badge colorScheme="purple" px="2">Premium</Badge>
                            {ratings["Premium Music"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Premium Music"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Premium Music Quality</h3>
                        <p>Experience crystal clear audio with our high-fidelity streaming.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Premium Music")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Premium Music"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Premium Music")}
                            >
                                {ratings["Premium Music"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                    <li style={{ background: "#dd00ee" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/65/200/300" />
                            <Badge bg="#22c55e" color="white" px="2">New</Badge>
                            {ratings["Personalized Playlists"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Personalized Playlists"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Personalized Playlists</h3>
                        <p>Get custom recommendations based on your music taste.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Personalized Playlists")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Personalized Playlists"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Personalized Playlists")}
                            >
                                {ratings["Personalized Playlists"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                    <li style={{ background: "#9911ff" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/68/200/300" />
                            <Badge bgGradient="linear(to-r, blue.400, purple.500)" color="white" px="2">Popular</Badge>
                            {ratings["Offline Mode"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Offline Mode"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Offline Mode</h3>
                        <p>Download your favorite tracks for offline listening.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Offline Mode")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Offline Mode"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Offline Mode")}
                            >
                                {ratings["Offline Mode"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                    <li style={{ background: "#0d63f8" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/76/200/300" />
                            <Badge bg="orange.400" color="white" px="2">Featured</Badge>
                            {ratings["Cross-Platform Sync"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Cross-Platform Sync"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Cross-Platform Sync</h3>
                        <p>Seamlessly switch between devices without missing a beat.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Cross-Platform Sync")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Cross-Platform Sync"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Cross-Platform Sync")}
                            >
                                {ratings["Cross-Platform Sync"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                    <li style={{ background: "#0cdcf7" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/77/200/300" />
                            <Badge bgGradient="linear(to-r, pink.400, red.400)" color="white" px="2">Trending</Badge>
                            {ratings["Social Sharing"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Social Sharing"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Social Sharing</h3>
                        <p>Share your favorite music with friends and family.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Social Sharing")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Social Sharing"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Social Sharing")}
                            >
                                {ratings["Social Sharing"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                    <li style={{ background: "#8df0cc" }}>
                        <Flex align="center" gap="2" mb="2">
                            <Avatar size="sm" src="https://picsum.photos/id/78/200/300" />
                            <Badge bgGradient="linear(to-r, cyan.300, teal.400)" color="white" px="2">Beta</Badge>
                            {ratings["Live Lyrics"] && (
                                <Badge colorScheme="yellow" ml="auto">
                                    <Icon as={FaStar} mr={1} />
                                    {ratings["Live Lyrics"]}.0
                                </Badge>
                            )}
                        </Flex>
                        <h3>Live Lyrics</h3>
                        <p>Follow along with synchronized lyrics as you listen.</p>
                        <Flex justify="flex-end" gap="2" mt="2">
                            <Button size="xs" variant="outline" color="white" onClick={() => handleView("Live Lyrics")}>View</Button>
                            <Button 
                                size="xs" 
                                colorScheme={ratings["Live Lyrics"] ? "yellow" : "purple"}
                                onClick={() => handleRateClick("Live Lyrics")}
                            >
                                {ratings["Live Lyrics"] ? "Update Rating" : "Rate"}
                            </Button>
                        </Flex>
                    </li>
                </motion.ul>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent bg="rgba(0, 0, 0, 0.9)" color="white" borderRadius="20px">
                    <ModalHeader p={6}>
                        <Flex gap={6} align="center">
                            <Image 
                                src={selectedAlbum?.image} 
                                alt="Album Cover"
                                boxSize="100px"
                                objectFit="cover"
                                borderRadius="xl"
                            />
                            <VStack align="start" spacing={2}>
                                <HStack>
                                    <Text fontSize="2xl" fontWeight="bold">{selectedAlbum?.artist}</Text>
                                    {selectedAlbum?.bestSeller && (
                                        <Badge colorScheme="yellow">
                                            <Icon as={FaStar} mr={1} />
                                            Bestseller
                                        </Badge>
                                    )}
                                </HStack>
                                <Text color="gray.400">Released: {selectedAlbum?.releaseDate}</Text>
                            </VStack>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody p={6}>
                        <VStack spacing={6} align="stretch">
                            <Text>{selectedAlbum?.description}</Text>
                            
                            <Box bg="whiteAlpha.100" p={4} borderRadius="xl">
                                <Text fontWeight="semibold" mb={2}>Last Album: {selectedAlbum?.lastAlbum}</Text>
                                <HStack spacing={8}>
                                    <Stat>
                                        <StatLabel>Trending</StatLabel>
                                        <StatNumber>
                                            <StatArrow type="increase" />
                                            {selectedAlbum?.trending}
                                        </StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Likes</StatLabel>
                                        <StatNumber>
                                            <Icon as={FaHeart} color="red.400" mr={2} />
                                            {selectedAlbum?.likes}
                                        </StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Rating</StatLabel>
                                        <StatNumber>
                                            <Icon as={FaStar} color="yellow.400" mr={2} />
                                            {selectedAlbum?.rating}
                                        </StatNumber>
                                    </Stat>
                                </HStack>
                            </Box>

                            <Flex gap={4} mt={4}>
                                <Button leftIcon={<FaPlay />} colorScheme="purple" flex={1}>
                                    Play Now
                                </Button>
                                <Button leftIcon={<FaHeart />} variant="outline" colorScheme="red">
                                    Like
                                </Button>
                            </Flex>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} size="sm">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent bg="rgba(0, 0, 0, 0.9)" color="white" borderRadius="20px">
                    <ModalHeader textAlign="center">
                        Rate {selectedAlbumName}
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody>
                        <VStack spacing={4} pb={6}>
                            <Text fontSize="sm" color="gray.400">
                                Click on a star to submit your rating
                            </Text>
                            <HStack spacing={2}>
                                {renderStars(true)}
                            </HStack>
                            {hoveredRating > 0 && (
                                <Text fontSize="lg" color="yellow.400">
                                    {hoveredRating}.0 / 5.0
                                </Text>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </StyledWrapper>
    );
}

const top = `0%`
const bottom = `100%`
const topInset = `20%`
const bottomInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollYProgress) {
    const maskImage = useMotionValue(
        `linear-gradient(180deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
    )

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(180deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(180deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottom}, ${opaque})`
            )
        } else if (
            scrollYProgress.getPrevious() === 0 ||
            scrollYProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(180deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottomInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #20300;
    margin-top: 100px;
    color: white;
    padding: 2rem;

    /* Selection color */
    ::selection {
        background: #B794F4;
        color: white;
    }
    
    ::-moz-selection {
        background: #B794F4;
        color: white;
    }

    .scroll-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        height: 400px;
        margin: 0 auto;
    }

    .progress {
        position: fixed;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        z-index: 10;
    }

    .bg {
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 5;
    }

    .indicator {
        stroke: var(--accent,rgb(87, 76, 97));
        stroke-width: 5;
    }

    ul {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px 40px 16px 80px;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    li {
        background: var(--card-bg);
        padding: 16px;
        border-radius: 16px;
        min-height: 190px;
        display: flex;
        flex-direction: column;
        transform-origin: left;
        position: relative;
        
        h3 {
            font-size: 18px;
            margin: 0 0 8px 0;
            font-weight: 600;
        }

        p {
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            opacity: 0.8;
            flex-grow: 1;
        }
    }

    ::-webkit-scrollbar {
        width: 6px;
        background: rgba(255, 255, 255, 0.1);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--accent, #a855f7);
        border-radius: 10px;
    }
`; 