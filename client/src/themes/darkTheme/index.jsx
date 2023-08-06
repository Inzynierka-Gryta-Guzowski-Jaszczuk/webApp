import { extendTheme } from "@chakra-ui/react";


const darkTheme = extendTheme({
  styles:{
    global:{
      body:{
        bg: "#2d2f31",  
      },
      nav:{
        
        
        bgGradient: 'linear(to-b, #0D0D0D, #404040)',
        
      }
    }
  },
  colors: {
    
    primary: "#9b9d97",
    hover: "#e2eceb",
    secondary: "#3366FF", 
  },
});

export default darkTheme;