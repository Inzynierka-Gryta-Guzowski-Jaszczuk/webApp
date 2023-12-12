import AxiosApi from "../../services/axios.config";
import { useEffect, useState } from "react";
import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter } from "@chakra-ui/react";
import CardBox from "../cardBox";

function Recipes() {
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
          <CardBox recipe={recipe}></CardBox>
        ))}
      </Flex>
    </>

  );
}
export default Recipes;