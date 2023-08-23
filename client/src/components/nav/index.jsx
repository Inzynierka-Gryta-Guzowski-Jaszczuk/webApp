import { Box, Flex, InputGroup, InputLeftElement, Input, Link, useTheme } from "@chakra-ui/react";
// import Cookies from 'js-cookie';
import { SearchIcon } from "@chakra-ui/icons";

function Nav() {
    const theme = useTheme();
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //   }, []);

    return (
        <nav>

            <Flex justify='end'>
                <Box justifyContent='center' m={2}>
                    <InputGroup>
                    <InputLeftElement>
                        <SearchIcon color = {theme.colors.primary}></SearchIcon>
                    </InputLeftElement>
                        <Input type="text" placeholder="Wyszukaj" width="xs" color={theme.colors.primary} border='none'></Input>
                    </InputGroup>
                </Box>
                <Box pr={4} m={4} ml='auto' justifyContent='center'>
                    <Link href="/" color={theme.colors.primary} _hover={{ color: theme.colors.hover }} mr={6}>Twoja lodówka</Link>
                    <Link href="/" color={theme.colors.primary} _hover={{ color: theme.colors.hover }} mr={6}>Ranking przepisów</Link>
                    <Link href="/" color={theme.colors.primary} _hover={{ color: theme.colors.hover }} mr={6}>Kategorie</Link>
                    <Link href="/login" color={theme.colors.primary} _hover={{ color: theme.colors.hover }} mr={6}>Zaloguj</Link>
                </Box>
            </Flex>
        </nav>





    );
}

export default Nav;