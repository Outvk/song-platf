import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Link,
  Container,
  useColorMode,
  Image
} from '@chakra-ui/react'
import { FiGithub, FiUser, FiSun, FiMoon } from 'react-icons/fi'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="64px"
      zIndex={1000}
      bg={isDark ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.39)'}
      backdropFilter="blur(5px)"
      borderBottom="1px"
      borderColor={isDark ? 'whiteAlpha.200' : 'blackAlpha.200'}
      transition="all 0.3s ease-in-out"
      color={isDark ? 'white' : 'gray.900'}
    >
      <Container maxW="container.xl" height="100%">
        <Flex height="100%" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <HStack spacing={8} alignItems="center">
            <Box as="a" href="/" display="flex" alignItems="center">
              <Image 
                src="/images/m.gif" 
                alt="Music Logo"
                boxSize="50px"
                objectFit="contain"
                mr={2}
              />
              <Text ml={2} fontSize="xl" fontWeight="bold" color="white">
                
              </Text>
            </Box>
          </HStack>

          {/* Navigation Links */}
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            <Link href="/new" fontWeight="medium" _hover={{ color: isDark ? 'purple.300' : 'purple.600' }}>New</Link>
            <Link href="/playlist" fontWeight="medium" _hover={{ color: isDark ? 'purple.300' : 'purple.600' }}>Playlist</Link>
            <Link href="/artists" fontWeight="medium" _hover={{ color: isDark ? 'purple.300' : 'purple.600' }}>Artists</Link>
          </HStack>

          {/* Right Side Icons */}
          <HStack spacing={2}>
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Toggle theme"
              icon={isDark ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              color={isDark ? 'white' : 'gray.900'}
              _hover={{ bg: isDark ? 'whiteAlpha.200' : 'blackAlpha.100' }}
            />
            <IconButton
              size="md"
              variant="ghost"
              aria-label="GitHub"
              icon={<FiGithub />}
              as="a"
              href="https://github.com"
              target="_blank"
              color={isDark ? 'white' : 'gray.900'}
              _hover={{ bg: isDark ? 'whiteAlpha.200' : 'blackAlpha.100' }}
            />
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Profile"
              icon={<FiUser />}
              color={isDark ? 'white' : 'gray.900'}
              _hover={{ bg: isDark ? 'whiteAlpha.200' : 'blackAlpha.100' }}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar 