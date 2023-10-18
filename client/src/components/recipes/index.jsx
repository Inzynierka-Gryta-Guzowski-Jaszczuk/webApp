import AxiosApi from "../../services/axios.config";
import { useEffect, useState } from "react";
import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardHeader, CardFooter} from "@chakra-ui/react";

function Recipes(){
    const theme = useTheme();
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = "recipe/public";
          const { data: res } = await AxiosApi.get(url);
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
            <LinkOverlay href={`/recipes/${recipe.recipe_id}`}>
              <CardBody>
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
              </CardBody>
            </LinkOverlay>
          </LinkBox>
          
          
            
            ))}

        </Flex>
        </>
        
    );
}
export default Recipes;