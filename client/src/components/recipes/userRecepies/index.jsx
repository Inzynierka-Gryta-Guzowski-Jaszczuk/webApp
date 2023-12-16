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
  MenuList,
  Link

} from "@chakra-ui/react";
import { AddIcon, SettingsIcon } from '@chakra-ui/icons'
import React from "react";
import { useNavigate } from 'react-router-dom';
import CardBox from "../../cardBox";

function UserRecipes() {
  const theme = useTheme();
  const [recipes, setRecipes] = useState([]);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);
  var token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${token}`
        }
      };
      const recipesUrl = "recipe/all";
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
  }
  useEffect(() => {


    fetchData();
  }, []);

  const onDelete = async () => {
    try {
      const url = `recipe/${recipeIdToDelete}`;
      token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${token}`
        },
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
      <Link href="/dodaj_przepis">
        <AddIcon></AddIcon>
      </Link>
      <Flex justify='center' textAlign='center' align='center' flexWrap='wrap' mb={100} >
        {recipes.map((recipe) => (
          <CardBox recipe={recipe} showUserRecipe={true}></CardBox>
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