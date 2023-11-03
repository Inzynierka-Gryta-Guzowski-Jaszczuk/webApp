import AxiosApi from "../../../services/axios.config";
import { useEffect, useState, useRef } from "react";
import {
  Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter, CardHeader, useDisclosure, Button, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  MenuButton,
  MenuItem,
  Menu,
  MenuList

} from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons'
import React from "react";

function UserRecipes() {
  const theme = useTheme();
  const [recipes, setRecipes] = useState([]);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);
  var token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  debugger;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userUrl = "user/myProfile";
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'token': `Bearer ${token}`
          }
        };
        const { data: user } = await AxiosApi.get(userUrl, config);
        const recipesUrl = "recipe/public/user/" + user._id;
        const { data: res } = await AxiosApi.get(recipesUrl, config);
        setRecipes(res);
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
  }, [recipes]);

  const onDelete = async () => {
    try {
      const url = 'recipe';
      token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${token}`
        },
        data: {
          'id': recipeIdToDelete
        }
      };
      const { data: res } = await AxiosApi.delete(url, config);

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      }
    }
  };


  return (
    <>
      <Heading textAlign='center' mt={10} color={theme.colors.primary}>Twoje przepisy</Heading>
      <Flex justify='center' textAlign='center' align='center' flexWrap='wrap' mb={100} >
        {recipes.map((recipe) => (
          <Card
            key={recipe.recipe_id}
            display='flex'
            align='center'
            size='lg'
            mt={100}
            w='800px'
            minW='45%'
            mx='2%'
            pb={10}
            variant='outline'
            bg={theme.colors.secondary}
            color={theme.colors.primary}
            boxShadow={theme.cardStyle.boxShadow}
          >
            <CardHeader display='flex' justifyContent='end' align='end' width='100%'>
              <Menu>
                <MenuButton as={SettingsIcon}>
                  
                </MenuButton>
                <MenuList>
                  <MenuItem as={Button}
                      variant='outline'
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

            <LinkBox
              as={CardBody}
              mx={2}
              px='10%'
              width='100%'
              display='flex'
              justifyContent='center'
            >
              <LinkOverlay href={`/przepisy/${recipe.recipe_id}`}>
                <Image src={recipe.image}></Image>
                <Text fontSize='2xl' mt='50px'>{recipe.name}</Text>
                <Card
                  mt={4}
                  variant='outline'
                  bg={theme.colors.secondary}
                  color={theme.colors.primary}
                  boxShadow={theme.cardStyle.boxShadow}>

                  <Flex as={CardBody} justifyContent={"space-between"}>
                    <Text fontSize='2xl' ml='auto' mx={2}>Liczba porcji: {recipe.portions}</Text>
                    <Text fontSize='2xl' ml='auto' mx={2}>Poziom trudności: {recipe.difficulty}</Text>
                  </Flex>
                  <Flex as={CardFooter} justifyContent={"space-between"}>
                    <Text fontSize='2xl' ml='auto' mx={2}>Kalorie: {recipe.calories}</Text>
                    <Text fontSize='2xl' ml='auto' mx={2}>Zapisano: #{recipe.saved_count}</Text>
                  </Flex>
                </Card>
              </LinkOverlay>
            </LinkBox>

          </Card>



        ))}

      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Usuń przepis
            </AlertDialogHeader>

            <AlertDialogBody>
              Jesteś pewny? Nie można tego cofnąć.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Anuluj
              </Button>

              <Button type="submit" onClick={() => onDelete(recipeIdToDelete)} ml={3}>
                Usuń
              </Button>


            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </>

  );
}
export default UserRecipes;