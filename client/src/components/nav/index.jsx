import { Box, Flex, Link, useTheme } from "@chakra-ui/react";

function Nav() {
    const theme = useTheme();

    return (
        <nav>
            <Flex justify='end'>
                <Box pr={4} m = {2} justifyContent='center'>
                    <Link  href="/" color={theme.colors.primary}  _hover={{color: theme.colors.hover}} mr={6}>Twoja lodówka</Link>
                    <Link  href="/" color={theme.colors.primary}  _hover={{color: theme.colors.hover}} mr={6}>Ranking przepisów</Link>
                    <Link  href="/" color={theme.colors.primary}  _hover={{color: theme.colors.hover}} mr={6}>Kategorie</Link>
                    <Link  href="/login" color={theme.colors.primary}  _hover={{color: theme.colors.hover}} mr={6}>Zaloguj</Link>
                </Box>
            </Flex>
        </nav>





    );
}

export default Nav;