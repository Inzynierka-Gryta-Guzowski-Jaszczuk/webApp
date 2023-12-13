import { Flex, Link, useTheme, Menu, MenuButton, Avatar, MenuList, MenuItem, IconButton, MenuOptionGroup, MenuItemOption, MenuGroup, MenuDivider, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import AxiosApi from "../../services/axios.config";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';


function Nav() {
    const theme = useTheme();
    const primaryColor = useColorModeValue(theme.colors.primary.light, theme.colors.primary.dark);
    const secondaryColor = useColorModeValue(theme.colors.secondary.light, theme.colors.secondary.dark);
    const token = localStorage.getItem("token");
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const [categories, setCategories] = useState([]);
    let location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "recipe/tags";
                const { data: res } = await AxiosApi.get(url);
                setCategories(res);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                }
            }
        };
        fetchData();
    }, [location]);

    return (
        <nav>
            <Flex justify='end'>
                <Heading pr={4} m={2} >eCooker</Heading>

                <IconButton
                    m={2}
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    aria-label="Toggle color mode"
                />

                <Flex pr={4} m={4} ml='auto' justifyContent='center' >
                    {/* <Button onClick={toggleColorMode}>
                        Switch to {colorMode === "light" ? "dark" : "light"} mode
                    </Button> */}

                    {token === null ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Link href="/ksiazka_kucharska" mr={4} >Książka Kucharska</Link>
                            <Link href="/twoje_przepisy" mr={4}>Twoje przepisy</Link>
                        </>
                    )}
                    <Link href="/twoja_lodowka" mr={4}>Twoja lodówka</Link>
                    <Link href="/przepisy" mr={4}>Ranking przepisów</Link>
                    <Menu>
                        <MenuButton as={Link} mr={4}>
                            Kategorie
                        </MenuButton>
                        <MenuList bg={secondaryColor} >
                            <Flex flexWrap='wrap'>
                                {categories
                                    ? Object.keys(categories).map((categorie) => (
                                        <MenuGroup title={categorie} fontSize='xl' key={categorie}>                                            <MenuDivider></MenuDivider>
                                            {categories[categorie].map((tag) => (
                                                <MenuItem key={tag} bg={secondaryColor} >
                                                    <Link href={`/kategorie/${tag}`} fontSize='xl' >{tag}</Link>
                                                </MenuItem>
                                            ))}
                                        </MenuGroup>
                                    ))
                                    : null}
                            </Flex>
                        </MenuList>
                    </Menu>
                    {token === null ? (
                        <Link href="/zaloguj" mr={4}>Zaloguj</Link>

                    ) : (
                        <Menu>
                            <MenuButton as={Avatar} size='sm' bg="#2d2f31"></MenuButton>
                            <MenuList bg="#2d2f31" borderColor={primaryColor} m={0} p={0} borderRadius={0}>
                                <MenuItem justifyContent='center' borderBottom="1px solid" borderColor={primaryColor}>
                                    <Link onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.href = '/zaloguj'
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