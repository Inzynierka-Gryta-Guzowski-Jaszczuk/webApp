import { Flex, Link, useTheme, Menu, MenuButton, Avatar, MenuList, MenuItem, Button, MenuOptionGroup, MenuItemOption, MenuGroup, MenuDivider } from "@chakra-ui/react";
import AxiosApi from "../../services/axios.config";
import { useEffect, useState } from "react";

function Nav() {
    const theme = useTheme();
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "recipe/tags";
                const { data: res } = await AxiosApi.get(url);
                setCategories(res);
                debugger;
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
    }, []);

    return (
        <nav>
            <Flex justify='end'>
                <Flex pr={4} m={4} ml='auto' justifyContent='center' >
                    {token === null ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Link href="/" mr={4} >Książka Kucharska</Link>
                            <Link href="/" mr={4}>Twoje przepisy</Link>
                        </>
                    )}
                    <Link href="/" mr={4}>Twoja lodówka</Link>
                    <Link href="/przepisy" mr={4}>Ranking przepisów</Link>
                    <Menu>
                        <MenuButton as={Link} mr={4}>
                            Kategorie
                        </MenuButton>
                        <MenuList bg={theme.colors.secondary} >
                            <Flex flexWrap='wrap'>
                                {categories
                                    ? Object.keys(categories).map((categorie) => (
                                        <MenuGroup title={categorie} fontSize='xl' key={categorie}>                                            <MenuDivider></MenuDivider>
                                            {categories[categorie].map((tag) => (
                                                <MenuItem key={tag} bg={theme.colors.secondary} >
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
                            <MenuList bg="#2d2f31" borderColor={theme.colors.primary} m={0} p={0} borderRadius={0}>
                                <MenuItem justifyContent='center' bgGradient='linear(to-b, #0D0D0D, #404040)' borderBottom="1px solid" borderColor={theme.colors.primary}>
                                    <Link as={Button} onClick={() => {
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