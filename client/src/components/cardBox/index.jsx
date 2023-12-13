import React from 'react';
import {
    LinkBox,
    LinkOverlay,
    Card,
    Image,
    Text,
    Flex,
    Box,
    CardBody,
    CardHeader,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    CardFooter,
    Button,
    useTheme,
    useColorModeValue,
    Heading
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons'
import pot from '../../assets/icons/pot.svg';
import restaurant from '../../assets/icons/restaurant.svg';
import easy from '../../assets/icons/difficulty-easy.svg';
import medium from '../../assets/icons/difficulty-medium.svg';
import hard from '../../assets/icons/difficulty-hard.svg';
import clock from '../../assets/icons/clock-five.svg';


const CardBox = ({ recipe, showUserRecipe }) => {
    const theme = useTheme();
    const primaryColor = useColorModeValue(theme.colors.primary.light, theme.colors.primary.dark);
    const secondaryColor = useColorModeValue(theme.colors.secondary.light, theme.colors.secondary.dark);
    const boxShadow = useColorModeValue(theme.cardStyle.boxShadow.light, theme.cardStyle.boxShadow.dark);
    const navigate = useNavigate();
    const difficultyMap = {
        easy: 'Łatwy',
        medium: 'Średni',
        hard: 'Trudny',
    };

    const getDifficultyImage = () => {
        if (!recipe.difficulty) {
            return '';
        }
        switch (recipe.difficulty) {
            case 'easy':
                return easy;
            case 'medium':
                return medium
            case 'hard':
                return hard;
        }
    };
    const userRecipes = (
        <CardHeader display='flex' justifyContent='end' align='end' width='100%'>
            <Menu>
                <MenuButton as={SettingsIcon} />
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            navigate(`/edytuj_przepis/${recipe.recipe_id}`);
                        }}
                    >
                        Edytuj przepis
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setRecipeIdToDelete(recipe.recipe_id);
                            onOpen();
                        }}
                    >
                        Usuń przepis
                    </MenuItem>
                </MenuList>
            </Menu>
        </CardHeader>
    );

    return (


        <Card
            key={recipe.recipe_id}
            display='flex'
            align='center'
            size='lg'
            mt={100}
            pt={showUserRecipe ? 0 : '2%'}
            w='800px'
            minW='45%'
            mx='2%'
            pb={10}
            variant='outline'
            bg={secondaryColor}
            color={primaryColor}
            boxShadow={boxShadow}
        >
            {showUserRecipe && userRecipes}

            <LinkBox 
            as={CardBody}
            >
                <LinkOverlay href={`/przepisy/${recipe.recipe_id}`}>
                    <Image src={recipe.image} w='500px' h='250px' mx='auto' objectFit='cover' />
                    <Heading fontSize='4xl' mt='50px'>{recipe.name}</Heading>
                    <Card
                        mt={4}
                        variant='outline'
                        bg={secondaryColor}
                        color={theme.colors.primary}
                        boxShadow={boxShadow}>

                        <Flex as={CardBody} justifyContent="space-between">
                            <Box mx='auto'>
                                <Image src={getDifficultyImage(recipe.difficulty)} alt={`Poziom trudności`} title='Poziom trudności' w={10} h={10} mx='auto' />
                                <Text fontSize='2xl' >{difficultyMap[recipe.difficulty]}</Text>
                            </Box>
                            <Box mx='auto'>
                                <Image src={restaurant} alt={`Liczba porcji`} title='Liczba porcji' w={10} h={10} mx='auto' />
                                <Text fontSize='2xl'>{recipe.portions} porcje</Text>
                            </Box>
                            <Box>
                                <Image src={clock} alt={`Czas`} title='Czas' w={10} h={10} mx='auto' />
                                <Text fontSize='2xl' >{recipe.time} minut</Text>
                            </Box>

                           
                        </Flex>
                        <Flex as={CardFooter} justifyContent="space-between">


                            <Text fontSize='2xl' mx='auto'>Polubienia: {recipe.saved_count}</Text>
                        </Flex>
                    </Card>
                </LinkOverlay>

            </LinkBox>
        </Card>
    );
};

export default CardBox;
