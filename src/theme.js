import { extendTheme } from '@chakra-ui/theme-utils'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      }
    }
  },
  components: {
    // Custom glass effect
    Glass: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.800',
        backdropFilter: 'blur(10px)',
        borderRadius: 'lg',
        boxShadow: 'lg',
      }),
    },
  },
})

export default theme 