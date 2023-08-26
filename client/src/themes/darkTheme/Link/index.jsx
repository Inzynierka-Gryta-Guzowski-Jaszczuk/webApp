import { defineStyleConfig } from '@chakra-ui/react'

const Link = defineStyleConfig({
    baseStyle: {
        color: '#9b9d97',
        _hover: { color: '#e2eceb' }, 
    },
    variants: {
        underline: {
            textDecoration: 'underline',
        },
        default: {
            textDecoration: 'none',
        },
        selected: {
            textDecoration: 'underline',
            color: '#e2eceb',
        }

    },
    defaultProps: {
        variant: 'default',
    },
})
export default Link;