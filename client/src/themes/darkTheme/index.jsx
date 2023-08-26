import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Link from "./Link";


const darkTheme = extendTheme({
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
      }
    }
  },
  colors: {
    
    primary: "#9b9d97",
    hover: "#e2eceb",
    secondary: "#232422", 
  },
  cardStyle: {
    boxShadow: "1px 1px 10px 1px  #070707",
  }
});

export default darkTheme;