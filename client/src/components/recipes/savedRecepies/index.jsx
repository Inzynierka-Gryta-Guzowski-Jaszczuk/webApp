import { Card, Flex, useTheme, Image, Heading, CardBody, Text, LinkBox, LinkOverlay, CardFooter } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AxiosApi from "../../../services/axios.config";
import React from "react";
import CardBox from "../../cardBox";

function SavedRecipes() {
    const theme = useTheme();
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                var token = localStorage.getItem("token");
                const url = "recipe/saved";
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `Bearer ${token}`
                    }
                }
                const { data: res } = await AxiosApi.get(url, config);
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
            <Heading textAlign='center' mt={10} color={theme.colors.primary}>Książka kucharska</Heading>
            <Flex justify='center' textAlign='center' align='center' flexWrap='wrap' mb={100}>
                {recipes.map((recipe) => (
                    <CardBox recipe={recipe}></CardBox>
                ))}

            </Flex>
        </>

    );
}
export default SavedRecipes