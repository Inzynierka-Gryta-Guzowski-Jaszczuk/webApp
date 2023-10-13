import { Box, Flex, InputGroup, InputLeftElement, Input, Link, useTheme, Menu, MenuButton, Avatar, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Nav() {
    const theme = useTheme();
    const token = localStorage.getItem("token");

    return (
        <nav>
            <Flex justify='end'>    
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
                    <Link href="/recipes" mr={4}>Ranking przepisów</Link>
                    <Link href="/" mr={4}>Kategorie</Link>
                    {token === null ? (
                        <Link href="/login" mr={4}>Zaloguj</Link>

                    ) : (
                        <Menu>
                            <MenuButton as={Avatar} size='sm' bg="#2d2f31"></MenuButton>
                            <MenuList bg="#2d2f31" borderColor={theme.colors.primary} m={0} p={0} borderRadius={0}>
                                <MenuItem justifyContent='center' bgGradient='linear(to-b, #0D0D0D, #404040)' borderBottom="1px solid" borderColor={theme.colors.primary}>
                                    <Link as={Button} onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.href = '/login'
                                    }} >Wyloguj</Link>
                                </MenuItem>
                               
                            </MenuList>
                            
                        </Menu>
                        
                    )}
                </Flex>
            </Flex>
        </nav>





    );
}

export default Nav;