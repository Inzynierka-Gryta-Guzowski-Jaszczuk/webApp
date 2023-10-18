import { Button, Grid, GridItem, useTheme, Text, Image, Card, CardHeader, Heading, CardBody, UnorderedList, ListItem, OrderedList, Box, Divider, CardFooter, useDisclosure, Drawer, DrawerContent, DrawerCloseButton, DrawerOverlay, DrawerBody, Textarea, DrawerHeader } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AxiosApi from "../../../services/axios.config";
import React from "react";

function RecipesDetails() {
    const theme = useTheme();
    const [recipe, setRecipe] = useState([]);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [formDisabled, setFormDisabled] = useState(false);
    const [data, setData] = useState({
        comment: "",
    });
    var token = localStorage.getItem('token'); 
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            debugger;
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
    }, [comments]);
    return (
        <>
            <Grid
                mt={10}
                mx={10}
                templateRows='repeat(12, 1fr)'
                templateColumns='repeat(12, 1fr)'
                gap={6}
              

            >
                <GridItem rowSpan={4} colSpan={4} align='center'><Image src={recipe.image}></Image></GridItem>
                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={5}

                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
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
                    rowSpan={8}

                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
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
                                    <ListItem>{ingredient.name} {ingredient.amount} {ingredient.unit}</ListItem>
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
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
                    <Text fontSize='2xl' py={2} textAlign='center'>Liczba porcji: {recipe.portions}</Text>
                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
                    <Text fontSize='2xl' py={2} textAlign='center'>Poziom trudności: {recipe.difficulty}</Text>
                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
                    <Text fontSize='2xl' py={2} textAlign='center'>Kalorie: {recipe.calories}</Text>

                </GridItem>
                <GridItem
                    as={Card}
                    colSpan={2}
                    rowSpan={1}
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
                    <Text fontSize='2xl' py={2} textAlign='center'>Zapisano: #{recipe.saved_count}</Text>

                </GridItem>
                
                <GridItem
                    as={Card}
                    colSpan={4}
                    rowSpan={7}
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
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
                    as={Card}
                    colSpan={4}
                    rowSpan={1}
                    variant='outline'
                    bg={theme.colors.secondary}
                    color={theme.colors.primary}
                    boxShadow={theme.cardStyle.boxShadow}>
                    <Text fontSize='2xl' py={2} textAlign='center'>Gwiazdki tu będą</Text>

                </GridItem>


                

            </Grid>

            <Card variant='outline'
                bg={theme.colors.secondary}
                color={theme.colors.primary}
                boxShadow={theme.cardStyle.boxShadow}
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
                    ): (
                        <></>
                    )}
                    
                    <Drawer
                        isOpen={isOpen}
                        placement='bottom'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg={theme.colors.secondary} color={theme.colors.primary}>
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