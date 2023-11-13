import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Link from "./Link";


const darkTheme = extendTheme({

  config: {
    initialColorMode: 'dark',
  },
  components: {
    Button,
    Link,

  },
  styles:{
    global:{
      body:{
        bg: "#2d2f31",  
      },
      nav:{ 
        bgGradient: 'linear(to-b, #0D0D0D, #404040)',
        // bgGradient: 'linear(to-b, #1c1c1c 0%, #404040 100%)',
      }
    }
  },
  colors: {
    
    primary: "#9b9d97",
    // primary: "#d1d4cb", //rozważyć trochę jaśniejszy odcień
    hover: "#e2eceb",
    secondary: "#232422", 
  },
  cardStyle: {
    // boxShadow: "1px 1px 10px 1px  #070707",
    boxShadow: "4px 4px 15px 4px  #070707",
  }
});

export default darkTheme;