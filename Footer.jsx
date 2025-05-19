import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
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
  FaSearch,
  FaEnvelope,
  FaDonate,
  FaHeart,
  FaSave,
  FaShareAlt,
  FaThumbsUp,
} from "react-icons/fa";

export default function Footer() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSearch = () => {
    toast({
      title: "Search submitted",
      description: `You searched for: ${search}`,
      status: "info",
      duration: 2000,
    });
    setSearch("");
  };

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

  return (
    <Box
      as="footer"
      w="100%"
      bg="rgba(10,10,10,0.85)"
      color={useColorModeValue("gray.100", "gray.200")}
      py={10}
      px={{ base: 4, md: 12 }}
      mt={16}
      borderTopRadius="2xl"
      boxShadow="0 -8px 32px 0 rgba(128,0,128,0.12)"
      position="relative"
      zIndex={10}
      style={{
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1.5px solid rgba(255,255,255,0.10)",
      }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
        maxW="container.xl"
        mx="auto"
      >
        {/* Social Media */}
        <HStack spacing={3}>
          <Tooltip label="Instagram" hasArrow>
            <IconButton
              as={Link}
              href="https://instagram.com/"
              target="_blank"
              icon={<FaInstagram />}
              aria-label="Instagram"
              colorScheme="pink"
              variant="ghost"
              fontSize="xl"
              rounded="full"
            />
          </Tooltip>
          <Tooltip label="Twitter" hasArrow>
            <IconButton
              as={Link}
              href="https://twitter.com/"
              target="_blank"
              icon={<FaTwitter />}
              aria-label="Twitter"
              colorScheme="twitter"
              variant="ghost"
              fontSize="xl"
              rounded="full"
            />
          </Tooltip>
          <Tooltip label="Facebook" hasArrow>
            <IconButton
              as={Link}
              href="https://facebook.com/"
              target="_blank"
              icon={<FaFacebook />}
              aria-label="Facebook"
              colorScheme="facebook"
              variant="ghost"
              fontSize="xl"
              rounded="full"
            />
          </Tooltip>
          <Tooltip label="YouTube" hasArrow>
            <IconButton
              as={Link}
              href="https://youtube.com/"
              target="_blank"
              icon={<FaYoutube />}
              aria-label="YouTube"
              colorScheme="red"
              variant="ghost"
              fontSize="xl"
              rounded="full"
            />
          </Tooltip>
          <Tooltip label="GitHub" hasArrow>
            <IconButton
              as={Link}
              href="https://github.com/"
              target="_blank"
              icon={<FaGithub />}
              aria-label="GitHub"
              colorScheme="gray"
              variant="ghost"
              fontSize="xl"
              rounded="full"
            />
          </Tooltip>
        </HStack>

        {/* Search Bar */}
        <InputGroup maxW="300px">
          <Input
            placeholder="Search music, artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg={useColorModeValue("whiteAlpha.200", "gray.800")}
            color="white"
            border="none"
            _placeholder={{ color: "gray.400" }}
            rounded="full"
          />
          <InputRightElement>
            <IconButton
              icon={<FaSearch />}
              aria-label="Search"
              colorScheme="purple"
              variant="ghost"
              rounded="full"
              onClick={handleSearch}
              isDisabled={!search}
            />
          </InputRightElement>
        </InputGroup>

        {/* Donate/Support */}
        <Button
          leftIcon={<FaDonate />}
          colorScheme="yellow"
          variant="solid"
          rounded="full"
          px={6}
          fontWeight="bold"
          onClick={handleDonate}
        >
          Support Us
        </Button>
      </Flex>

      <Divider my={8} borderColor="purple.700" />

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
        maxW="container.xl"
        mx="auto"
      >
        {/* Contact/Send Feedback */}
        <InputGroup maxW="320px">
          <Input
            placeholder="Your email for feedback/help"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg={useColorModeValue("whiteAlpha.200", "gray.800")}
            color="white"
            border="none"
            _placeholder={{ color: "gray.400" }}
            rounded="full"
            type="email"
          />
          <InputRightElement>
            <IconButton
              icon={<FaEnvelope />}
              aria-label="Send"
              colorScheme="purple"
              variant="ghost"
              rounded="full"
              onClick={handleContact}
              isDisabled={!email}
            />
          </InputRightElement>
        </InputGroup>

        {/* General Features */}
        <HStack spacing={6} fontSize="md" color="gray.300">
          <HStack>
            <FaHeart color="#ED64A6" />
            <Text>Favorites</Text>
          </HStack>
          <HStack>
            <FaSave color="#ECC94B" />
            <Text>Saved</Text>
          </HStack>
          <HStack>
            <FaShareAlt color="#63B3ED" />
            <Text>Share</Text>
          </HStack>
          <HStack>
            <FaThumbsUp color="#F6E05E" />
            <Text>Like</Text>
          </HStack>
        </HStack>

        {/* Copyright */}
        <Text fontSize="sm" color="gray.500" textAlign="center">
          &copy; {new Date().getFullYear()} OutVibs. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}
