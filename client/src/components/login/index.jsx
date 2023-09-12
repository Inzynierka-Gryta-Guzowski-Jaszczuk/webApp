import { React, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link } from "@chakra-ui/react";
import axios from "axios";

function Login() {
    const theme = useTheme();
    const [data, setData] = useState({ userName: "", password: "" });
    const [errors, setErrors] = useState({ userName: false, password: false });
    const [message, setMessage] = useState("");
    const [formDisabled,setFormDisabled] = useState(false);
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        if (input.value === '') {
            setErrors({ ...errors, [input.name]: true });
        }
        else {
            setErrors({ ...errors, [input.name]: false });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault()
        debugger;
        try {
            const url = "/api/user/login"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            setMessage(res.message);
            setFormDisabled(true);
            setTimeout(function() {
                window.location = "/";
            },3000);
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
    return (
        <Flex justify='center' textAlign='center' mb={100}>
            <Card display='flex' align='center' size='md' mt={100} px={60} mx={40} pb={20} variant='outline' bg={theme.colors.secondary} color={theme.colors.primary} borderColor={theme.colors.secondary} boxShadow={theme.cardStyle.boxShadow}>
                <CardHeader>
                    <Heading>Zaloguj</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={theme.colors.primary} borderRadius='20' px={40}>
                    <form onSubmit={handleSubmit}>  
                        <FormControl isInvalid={errors.userName} px={10}>
                            <FormLabel>Nazwa użytkownika</FormLabel>
                            <Input name='userName'  width='md' value={data.userName} onChange={handleChange} />
                            {!errors.userName ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>Email jest wymagany</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.password} px={10} py={2}>
                            <FormLabel>Hasło</FormLabel>
                            <Input name='password' type='password' value={data.password} onChange={handleChange} />
                            {!errors.password ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage >Hasło jest wymagane</FormErrorMessage>
                            )}
                        </FormControl>
                        <Button mt={4} type="submit" isDisabled={formDisabled}>Zaloguj</Button>
                        {message !== '' ?(
                            <Text>{message}</Text>
                        ): ( 
                            <div><br></br></div>
                        )}
                    </form>

                </CardBody>
                <CardFooter>
                    <Text fontSize='2xl'>Nie masz konta? Kliknij <Link href="/register" variant='underline'> Zarejestruj</Link></Text> 
                    
                </CardFooter>

            </Card>
        </Flex>



    )
}
export default Login;