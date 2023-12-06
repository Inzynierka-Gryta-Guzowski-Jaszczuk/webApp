import AxiosApi from "../../../services/axios.config";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter } from "@chakra-ui/react";

function Categories() {
  const theme = useTheme();
  const [recipes, setRecipes] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "recipe/public/search";
        const { data: res } = await AxiosApi.get(url, {
          params: {
            name: id
          }
        });
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
  }, []);
  return (
    <>
      <Heading textAlign='center' mt={10} color={theme.colors.primary}>Przepisy</Heading>
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
              <CardBody>
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
export default Categories;