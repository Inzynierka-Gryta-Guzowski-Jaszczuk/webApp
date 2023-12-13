import Nav from './components/nav'
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './routes';

function App() {
  return (
    
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Nav></Nav>
          <UserRoutes></UserRoutes>
        </BrowserRouter>

      </ChakraProvider>
    
    




  )
}

export default App
