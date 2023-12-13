import { defineStyleConfig } from '@chakra-ui/react';

const Link = defineStyleConfig({
  baseStyle: (props) => ({
    // color: props.colorMode === 'dark' ? '#e2eceb' : '#6b6b6b', // Replace with your light mode selected color
    _hover: { color: props.colorMode === 'dark' ? '#e2eceb' : '#6b6b6b' }, // Replace with your light mode hover color
  }),
  variants: {
    underline: {
      textDecoration: 'underline',
    },
    default: {
      textDecoration: 'none',
    },
    selected: (props) => ({
      textDecoration: 'underline',
    //   color: props.colorMode === 'dark' ? '#e2eceb' : '#6b6b6b', // Replace with your light mode selected color
    }),
  },
  defaultProps: {
    variant: 'default',
  },
});

export default Link;
