import { defineStyleConfig } from '@chakra-ui/react'

const MenuItem = defineStyleConfig({
    baseStyle: {
        color: '#9b9d97',
        // bgGradient: 'linear(to-b, #0D0D0D, #404040)',
        bg: 'red',
        _hover: { color: '#ece6e2' }, 
    },
   
   
})
export default MenuItem;