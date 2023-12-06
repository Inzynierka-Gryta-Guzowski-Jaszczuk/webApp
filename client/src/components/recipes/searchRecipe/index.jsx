import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter, FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import AxiosApi from "../../../services/axios.config";
import React from "react";

function SearchRecipes() {
  const theme = useTheme();
  const [recipes, setRecipes] = useState([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
    mode: 'onBlur',
    // defaultValues: useMemo(() => {
    //     return recipeData;
    // }, [recipeData])
  })
  const onSubmit = async (data) => {

    try {
      var token = localStorage.getItem("token");
      var config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `Bearer ${token}`
        }
      }
      const url = `recipe/public/search/fridge?ingredients=${data.ingredients}` ;
      const { data: res } = await AxiosApi.get(url,config);
      setRecipes(res);


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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //         var token = localStorage.getItem("token");
  //         const url = "recipe/saved";
  //         const config = {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'token': `Bearer ${token}`
  //             }
  //         }
  //         const { data: res } = await AxiosApi.get(url,config);
  //         setRecipes(res);
  //     } catch (error) {
  //       if (
  //         error.response &&
  //         error.response.status >= 400 &&
  //         error.response.status <= 500
  //       ) {
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
      <Heading textAlign='center' mt={10} color={theme.colors.primary}>Twoja lodówka</Heading>
      <Flex justify='center' textAlign='center' align='center' flexDirection='row' mt={30} mb={100}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.ingredients} px={2} h={100}>
            <Input id="name" width='md' placeholder="Podaj składniki"  {...register('ingredients', {
              required: 'To pole jest wymagane',  
            })} />
            <Button ml={4} type="submit">Szukaj</Button>
            {!errors.ingredients ? (
              <></>
            ) : (
              <FormErrorMessage>{errors?.ingredients?.message}</FormErrorMessage>
            )}
            
          </FormControl>
          
          
        </form>
      </Flex>
      <Flex justify='center' textAlign='center' align='center' flexWrap='wrap' mb={100}>
        {recipes.map((recipe) => (
          <LinkBox
            key={recipe.recipe_id}
            as={Card}
            display='flex'
            align='center'
            size='lg'
            mt={100}
            px='8%'
            pt='5%'
            mx='auto'
            pb={10}
            variant='outline'
            bg={theme.colors.secondary}
            color={theme.colors.primary}
            boxShadow={theme.cardStyle.boxShadow}
          >
            <LinkOverlay href={`/przepisy/${recipe.recipe_id}`}>
              <CardBody textAlign='center'>
                <Image src={recipe.image} w='400px' h='200px' mx='auto' objectFit='cover'></Image>
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
              </CardBody>
            </LinkOverlay>
          </LinkBox>



        ))}

      </Flex>
    </>

  );
}
export default SearchRecipes