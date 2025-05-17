import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'

function App() {
  return (
    <Box>
      <Navbar />
      <Box as="main" pt="16">
        {/* Your main content will go here */}
        <h1>Hello World</h1>
      </Box>
    </Box>
  )
}

export default App
