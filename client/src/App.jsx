import Nav from './components/nav'
import darkTheme from './themes/darkTheme'
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <>
      <ChakraProvider theme={darkTheme}>
        <Nav></Nav>
        
      </ChakraProvider>

    </>




  )
}

export default App
