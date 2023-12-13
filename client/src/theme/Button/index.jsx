import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 4,
    },
  },
  variants: {
    outline: (props) => ({
      border: 'none',
      color: props.colorMode === 'dark' ? '#9b9d97' : '#232422', 
      
    }),
    solid: (props) => ({
      bgGradient: props.colorMode === 'dark'
        ? 'linear(to-b, #0D0D0D, #404040)'
        : 'linear(to-b, #73a942, #aad576)', 
      color: props.colorMode === 'dark' ? '#9b9d97' : '#232422', 
      _hover: { bg: props.colorMode === 'dark' ? '#e2eceb' : '#648f3c' },
    }),
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
});

export default Button;
