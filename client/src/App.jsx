import Nav from './components/nav'
import darkTheme from './themes/darkTheme'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './routes';

function App() {
  return (
    
      <ChakraProvider theme={darkTheme}>
        <BrowserRouter>
          <Nav></Nav>
          <UserRoutes></UserRoutes>
        </BrowserRouter>

      </ChakraProvider>

    




  )
}

export default App
