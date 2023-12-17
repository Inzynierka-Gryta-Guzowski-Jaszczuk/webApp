import { Button, Grid, GridItem, useTheme, Text, Image, Card, CardHeader, Heading, CardBody, UnorderedList, ListItem, OrderedList, Box, Divider, CardFooter, useDisclosure, Drawer, DrawerContent, DrawerCloseButton, DrawerOverlay, DrawerBody, Textarea, DrawerHeader, useColorModeValue, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AxiosApi from "../../../services/axios.config";
import React from "react";
import ReactStars from "react-rating-stars-component";
import restaurant from '../../../assets/icons/restaurant.svg';
import easy from '../../../assets/icons/difficulty-easy.svg';
import medium from '../../../assets/icons/difficulty-medium.svg';
import hard from '../../../assets/icons/difficulty-hard.svg';
import clock from '../../../assets/icons/clock-five.svg';
import bolt from '../../../assets/icons/bolt.svg';



function RecipesDetails() {
    const theme = useTheme();
    const primaryColor = useColorModeValue(theme.colors.primary.light, theme.colors.primary.dark);
    const secondaryColor = useColorModeValue(theme.colors.secondary.light, theme.colors.secondary.dark);
    const boxShadow = useColorModeValue(theme.cardStyle.boxShadow.light, theme.cardStyle.boxShadow.dark);
    const [recipe, setRecipe] = useState([]);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [formDisabled, setFormDisabled] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [isSaved, setSaved] = useState(false);
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
    const [data, setData] = useState({
        comment: "",
    });
    const ratingChanged = async (newRating) => {
        console.log(newRating);
        try {
            debugger;
            const url = "rating/recipe/" + id;
            token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                }
            };
            const { data: res } = await AxiosApi.post(url, { rate: newRating }, config);
            setRatingValue(newRating);

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setMessage(error.response.data.message);
            }
        }
    };
    var token = localStorage.getItem('token');
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "comment/recipe/" + id;
            token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                }
            };
            const { data: res } = await AxiosApi.post(url, data, config);
            setFormDisabled(true);
            location.reload();

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setMessage(error.response.data.message);
            }
        }
    }
    const saveUserRecipe = async (e) => {
        e.preventDefault()
        try {
            token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                }
            };
            debugger;
            if (isSaved) {
                const url = "recipe/saved/" + id;
                const { data: res } = await AxiosApi.delete(url, config);
            }
            else {
                const url = "recipe/saved";
                const data = { recipeId: id };
                const { data: res } = await AxiosApi.post(url, data, config);
            }
            location.reload();

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setMessage(error.response.data.message);
            }
        }
    }
    const fetchRecipeDetails = async () => {
        try {
            token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                }
            };
            const ratingUrl = "rating/recipe/" + id;
            const { data: rating } = await AxiosApi.get(ratingUrl, config);
            setRatingValue(rating.userRate);
            const isSavedUrl = "recipe/saved/" + id;
            const { data: isSaved } = await AxiosApi.get(isSavedUrl, config);
            setSaved(isSaved);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
            }
        }
    };
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recepieUrl = "recipe/public/" + id;
                const { data: recepie } = await AxiosApi.get(recepieUrl);
                setRecipe(recepie);

            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                }
            }
        };
        fetchRecipe();
        fetchRecipeDetails();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsUrl = "comment/recipe/" + id;
                const { data: comments } = await AxiosApi.get(commentsUrl);
                setComments(comments);

            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                }
            }
        };

        fetchComments();
    }, []);

    return (
        <>
            <Grid
                mt={10}
                mx={10}
                templateRows='repeat(11, 1fr)'
                templateColumns='repeat(12, 1fr)'
                gap={6}


            >
                <GridItem rowSpan={4} colSpan={4} align='center'><Image src={recipe.image} w='600px' h='400px' mx='auto' objectFit='contain'></Image></GridItem>
                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={5}

                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <CardHeader align='center'>
                        <Heading>
                            {recipe.name}
                        </Heading>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody>
                        <Text fontSize='2xl'>
                            {recipe.description}
                        </Text>
                    </CardBody>

                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={10}

                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <CardHeader align='center'>
                        <Heading>Treść przepisu</Heading>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody fontSize='2xl'>
                        <OrderedList>
                            {recipe.instructions ? (
                                recipe.instructions.map((instruction) => (
                                    <ListItem>{instruction}</ListItem>
                                ))
                            ) : (
                                <p>Brak instrukcji.</p>
                            )}

                        </OrderedList>

                    </CardBody>


                </GridItem>

                <GridItem
                    colSpan={4}
                    py={2}
                >
                    <Flex wrap="wrap" gap="15px">
                        {recipe.tags ? recipe.tags.map((tag) => (
                            <Card
                                variant='outline'
                                bg={secondaryColor}
                                color={primaryColor}
                                boxShadow={boxShadow}
                                padding="5px 10px"
                                display="inline-flex"
                            >
                                <Text fontSize='xl'>{tag}</Text>
                            </Card>
                        )) : null}
                    </Flex>

                </GridItem>

                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    py={2}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <Box mx='auto'>
                        <Image src={getDifficultyImage(recipe.difficulty)} alt={`Poziom trudności`} title='Poziom trudności' w={10} h={10} mx='auto' />
                        <Text fontSize='2xl' >{difficultyMap[recipe.difficulty]}</Text>
                    </Box>
                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    pt={2}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <Box mx='auto'>
                        <Image src={restaurant} alt={`Liczba porcji`} title='Liczba porcji' w={10} h={10} mx='auto' />
                        <Text fontSize='2xl'>{recipe.portions} porcje</Text>
                    </Box>
                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={5}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <CardHeader align='center'>
                        <Heading>
                            Składniki
                        </Heading>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody>
                        <UnorderedList fontSize='2xl'>
                            {recipe.ingredients ? (
                                recipe.ingredients.map((ingredient) => (
                                    <ListItem>{ingredient.name} {ingredient.ammount} {ingredient.unit}</ListItem>
                                ))
                            ) : (
                                <p>Brak składników.</p>
                            )}

                        </UnorderedList>
                    </CardBody>


                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    py={2}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <Box mx='auto'>
                        <Image src={clock} alt={`Czas`} title='Czas' w={10} h={10} mx='auto' />
                        <Text fontSize='2xl' >{recipe.time} minut</Text>
                    </Box>
                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    py={2}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}>
                    <Box mx='auto'>
                        <Image src={bolt} alt={`Kalorie`} title='Kalorie' w={10} h={10} mx='auto' />
                        <Text fontSize='2xl' >{recipe.calories}</Text>
                    </Box>
                </GridItem>


                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={1}
                    variant='outline'
                    bg={secondaryColor}
                    color={primaryColor}
                    boxShadow={boxShadow}
                    align='center'>
                    {token ? (
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            value={ratingValue}
                            activeColor="#ffd700"
                            isHalf={true}

                        />) : (
                        <></>
                    )}
                    <Text fontSize='2xl'>Ocena użytkowników: {recipe?.rating?.toFixed(2)}</Text>

                </GridItem>
                {token ? (
                    isSaved ? (
                        <GridItem
                            as={Button}
                            onClick={saveUserRecipe}
                            colStart={2}
                            colSpan={2}
                            rowSpan={1}
                        >
                            Usuń z zapisanych
                        </GridItem>
                    ) : (
                        <GridItem
                            as={Button}
                            onClick={saveUserRecipe}
                            colStart={2}
                            colSpan={2}
                            rowSpan={1}
                        >
                            Zapisz
                        </GridItem>
                    )
                ) : null}


            </Grid>
            <Card variant='outline'
                bg={secondaryColor}
                color={primaryColor}
                boxShadow={boxShadow}
                m={10}>

                <CardHeader align='center'>
                    <Heading>Opinie</Heading>
                </CardHeader>
                <Divider></Divider>
                <Box maxHeight='200px' overflowY="auto">
                    <CardBody>
                        <UnorderedList fontSize='2xl'>
                            {comments ? (
                                comments.map((comment) => (
                                    <>
                                        <ListItem>{comment.user}: {comment.comment}</ListItem>
                                    </>

                                ))
                            ) : (
                                <p>Brak komentarzy.</p>
                            )}

                        </UnorderedList>
                    </CardBody>
                </Box>
                <CardFooter>
                    {token ? (
                        <Button ref={btnRef} onClick={onOpen}>
                            Dodaj komentarz
                        </Button>
                    ) : (
                        <></>
                    )}

                    <Drawer
                        isOpen={isOpen}
                        placement='bottom'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg={secondaryColor} color={primaryColor}>
                            <DrawerHeader>
                                <DrawerCloseButton />
                            </DrawerHeader>
                            <DrawerBody>
                                <form onSubmit={handleSubmit}>
                                    <Textarea placeholder="Napisz komentarz" name="comment" value={data.comment} onChange={handleChange}></Textarea>
                                    <Button mt={4} type="submit" isDisabled={formDisabled}>Dodaj</Button>
                                </form>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>


                </CardFooter>
            </Card>


        </>
    )

}
export default RecipesDetails