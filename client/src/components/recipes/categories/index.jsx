import AxiosApi from "../../../services/axios.config";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter } from "@chakra-ui/react";
import CardBox from "../../cardBox";

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
          <CardBox recipe={recipe}></CardBox>

        ))}

      </Flex>
    </>

  );
}
export default Categories;