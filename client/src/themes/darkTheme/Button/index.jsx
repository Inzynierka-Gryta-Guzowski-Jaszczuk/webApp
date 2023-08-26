import { defineStyleConfig } from '@chakra-ui/react'

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
    outline: {
      border: '2px solid',
      borderColor: '#9b9d97',
      color: '#9b9d97',
      _hover: { bg: '#e2eceb' },
    },
    solid: {
      bgGradient: 'linear(to-b, #0D0D0D, #404040)',
      color: '#9b9d97',
      _hover: { bg: '#e2eceb' },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
})

export default Button