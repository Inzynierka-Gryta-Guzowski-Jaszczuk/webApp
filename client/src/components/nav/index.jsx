import { Box, Flex, InputGroup, InputLeftElement, Input, Link, useTheme } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Nav() {
    const theme = useTheme();
    const token = localStorage.getItem("token");

    return (
        <nav>

            <Flex justify='end'>
                <Box justifyContent='center' m={3}>
                    <InputGroup size='sm'>
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color={theme.colors.primary}></SearchIcon>
                        </InputLeftElement>
                        <Input type="text" placeholder="Wyszukaj" color={theme.colors.primary} border='none'></Input>
                    </InputGroup>
                </Box>
                <Flex pr={4} m={4} ml='auto' justifyContent='center' flexWrap='nowrap'>
                    {token === null ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Link href="/" mr={4} >Książka Kucharska</Link>
                            <Link href="/" mr={4}>Twoje przepisy</Link>
                        </>
                    )}
                    <Link href="/"  mr={4}>Twoja lodówka</Link>
                    <Link href="/" mr={4}>Ranking przepisów</Link>
                    <Link href="/" mr={4}>Kategorie</Link>
                    {token === null ? (
                        <Link href="/login" mr={4}>Zaloguj</Link>

                    ) : (
                        <>
                        </>
                    )}
                </Flex>
            </Flex>
        </nav>





    );
}

export default Nav;