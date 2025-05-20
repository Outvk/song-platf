import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Tooltip,
  Link,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaGithub,
  FaEnvelope,
  FaDonate,
  FaMusic,
  FaHeadphones,
  FaMicrophone,
  FaUser,
  FaShareAlt,
} from "react-icons/fa";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2} color={useColorModeValue("gray.700", "gray.200")}>
      {children}
    </Text>
  );
};

const FooterLink = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      color={useColorModeValue("gray.600", "gray.400")}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("purple.600", "purple.400"),
        bg: useColorModeValue("purple.50", "whiteAlpha.100"),
        px: 2,
        py: 1,
        rounded: "md",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {children}
    </Link>
  );
};

const SocialIcon = ({ icon: Icon, label, href, colorScheme }) => {
  const hoverBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
  const hoverColor = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.300`);

  return (
    <Tooltip label={label} hasArrow>
      <IconButton
        as={Link}
        href={href}
        target="_blank"
        icon={<Icon />}
        aria-label={label}
        colorScheme={colorScheme}
        variant="ghost"
        fontSize="xl"
        rounded="full"
        _hover={{
          bg: hoverBg,
          color: hoverColor,
          transform: "translateY(-2px)",
          boxShadow: "md",
        }}
        transition="all 0.2s ease-in-out"
      />
    </Tooltip>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleDonate = () => {
    toast({
      title: "Thank you!",
      description: "Your support helps us grow.",
      status: "success",
      duration: 2500,
    });
  };

  const handleContact = () => {
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
      status: "success",
      duration: 2500,
    });
    setEmail("");
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("purple.200", "purple.700");

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={textColor}
      mt={16}
      position="relative"
      zIndex={10}
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Safety Center</FooterLink>
            <FooterLink href="#">Community Guidelines</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Features</ListHeader>
            <FooterLink href="#"><FaMusic style={{ display: 'inline', marginRight: '8px' }} /> Music Library</FooterLink>
            <FooterLink href="#"><FaHeadphones style={{ display: 'inline', marginRight: '8px' }} /> Playlists</FooterLink>
            <FooterLink href="#"><FaMicrophone style={{ display: 'inline', marginRight: '8px' }} /> Live Sessions</FooterLink>
            <FooterLink href="#"><FaUser style={{ display: 'inline', marginRight: '8px' }} /> Artist Profiles</FooterLink>
            <FooterLink href="#"><FaShareAlt style={{ display: 'inline', marginRight: '8px' }} /> Social Sharing</FooterLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Stay Updated</ListHeader>
            <InputGroup size="md">
              <Input
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.700", "gray.200")}
                border="1px solid"
                borderColor={borderColor}
                _placeholder={{ color: textColor }}
                rounded="full"
                type="email"
                _hover={{
                  borderColor: useColorModeValue("purple.400", "purple.500"),
                }}
                _focus={{
                  borderColor: useColorModeValue("purple.500", "purple.400"),
                  boxShadow: `0 0 0 1px ${useColorModeValue("purple.500", "purple.400")}`,
                }}
              />
              <InputRightElement>
                <IconButton
                  icon={<FaEnvelope />}
                  aria-label="Subscribe"
                  colorScheme="purple"
                  variant="ghost"
                  rounded="full"
                  onClick={handleContact}
                  isDisabled={!email}
                  _hover={{
                    bg: useColorModeValue("purple.50", "purple.900"),
                    color: useColorModeValue("purple.600", "purple.300"),
                  }}
                />
              </InputRightElement>
            </InputGroup>
            <Text fontSize="sm" color={textColor}>
              Subscribe to our newsletter for updates and exclusive content.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor={dividerColor} />

      <Box py={10}>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          maxW="6xl"
          mx="auto"
          px={4}
          gap={8}
        >
          <Stack direction="row" spacing={6} align="center">
            <SocialIcon icon={FaInstagram} label="Instagram" href="https://instagram.com/" colorScheme="pink" />
            <SocialIcon icon={FaTwitter} label="Twitter" href="https://twitter.com/" colorScheme="twitter" />
            <SocialIcon icon={FaFacebook} label="Facebook" href="https://facebook.com/" colorScheme="facebook" />
            <SocialIcon icon={FaYoutube} label="YouTube" href="https://youtube.com/" colorScheme="red" />
            <SocialIcon icon={FaGithub} label="GitHub" href="https://github.com/" colorScheme="gray" />
          </Stack>

          <Box
            as="img"
            src="/images/m.gif"
            alt="Music Logo"
            boxSize={{ base: "70px", md: "90px" }}
            objectFit="contain"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.1)",
              filter: "brightness(1.2)",
            }}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          />

          <Button
            leftIcon={<FaDonate />}
            colorScheme="yellow"
            variant="solid"
            rounded="full"
            px={6}
            fontWeight="bold"
            onClick={handleDonate}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s ease-in-out"
          >
            Support Us
          </Button>
        </Flex>
      </Box>

      <Box py={6} bg={useColorModeValue("gray.100", "gray.800")}>
        <Container maxW="6xl">
          <Text textAlign="center" fontSize="sm" color={textColor}>
            © {new Date().getFullYear()} Song Platform. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
