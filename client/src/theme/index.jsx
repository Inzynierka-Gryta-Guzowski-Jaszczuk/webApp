import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Link from "./Link";

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false, 
  },
  components: {
    Button,
    Link,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#2d2f31" : "#d3e7c1",
        color: props.colorMode === "dark" ? "#9b9d97" : "#232422",
      },
      nav: {
        bgGradient: props.colorMode === "dark"
          ? 'linear(to-b, #0D0D0D, #404040)'
          : 'linear(to-b, #73a942, #aad576)',
      },
    }),
  },

  colors: {
    primary: {
      light: "#232422",
      dark: "#9b9d97",
    },
    hover: "#e2eceb",
    secondary: {
      light: "#a0cf73",
      dark: "#232422",
    },
  },
  cardStyle: {
    boxShadow: {
      light: "4px 4px 15px 4px #5e8a38",
      dark: "4px 4px 15px 4px #070707",
    } 
  },
});

export default theme;


// primary: "#d1d4cb", //rozważyć trochę jaśniejszy odcień