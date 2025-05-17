import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Link,
  Container,
  useColorMode,
} from '@chakra-ui/react'
import { FiGithub, FiUser, FiSun, FiMoon } from 'react-icons/fi'
import { GiMusicalNotes } from 'react-icons/gi'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box
      position="fixed"
      w="100%"
      zIndex={1000}
      bg={isDark ? 'gray.800' : 'white'}
      boxShadow="sm"
      borderBottom="1px"
      borderColor={isDark ? 'gray.700' : 'gray.200'}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <HStack spacing={8} alignItems="center">
            <Box as="a" href="/" display="flex" alignItems="center">
              <GiMusicalNotes size="24px" color={isDark ? 'white' : 'black'} />
              <Text ml={2} fontSize="xl" fontWeight="bold">
                MusicHub
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
            <Link href="/new" fontWeight="medium">New</Link>
            <Link href="/playlist" fontWeight="medium">Playlist</Link>
            <Link href="/artists" fontWeight="medium">Artists</Link>
          </HStack>

          {/* Right Side Icons */}
          <HStack spacing={2}>
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Toggle theme"
              icon={isDark ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
            />
            <IconButton
              size="md"
              variant="ghost"
              aria-label="GitHub"
              icon={<FiGithub />}
              as="a"
              href="https://github.com"
              target="_blank"
            />
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Profile"
              icon={<FiUser />}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar 