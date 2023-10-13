import { React, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link } from "@chakra-ui/react";
import {Link as ReactRouterLink} from 'react-router-dom';
import AxiosApi from '../../services/axios.config';


function Register() {
    const theme = useTheme();
    const [data, setData] = useState({
        email: "",
        password: "",
        userName: "",
        firstName: "",
        lastName: ""
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        userName: false,
        firstName: false,
        lastName: false
    });

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
        try {
            const url = "user/register";
            const { data: res } = await AxiosApi.post(url, data);
            setMessage(res.message);
            setFormDisabled(true);
            setTimeout(function() {
                window.location = "/login";
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
        <Flex justify='center' textAlign='center'>
            <Card display='flex' align='center' size='lg' mt={100} px={60} mx={40} pb={20} mb={100} variant='outline' bg={theme.colors.secondary} color={theme.colors.primary} boxShadow={theme.cardStyle.boxShadow}>
                <CardHeader>
                    <Heading>Zarejestruj</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={theme.colors.primary} borderRadius='20' px={40}>
                    <form onSubmit={handleSubmit} >
                        <FormControl isInvalid={errors.userName} px={10}>
                            <FormLabel>Nazwa użytkownika</FormLabel>
                            <Input name='userName' width='md' value={data.userName} onChange={handleChange} required/>
                            {!errors.userName ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>Nazwa użytkownika jest wymagana</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.firstName} px={10}>
                            <FormLabel>Imię</FormLabel>
                            <Input name='firstName' width='md' value={data.firstName} onChange={handleChange} required/>
                            {!errors.firstName ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>Imię jest wymagane</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.lastName} px={10}>
                            <FormLabel>Nazwisko</FormLabel>
                            <Input name='lastName' width='md' value={data.lastName} onChange={handleChange} required/>
                            {!errors.lastName ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>Nazwisko użytkownika jest wymagane</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.email} px={10}>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email' width='md' value={data.email} onChange={handleChange} required/>
                            {!errors.email ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>Email jest wymagany</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.password} px={10} py={2}>
                            <FormLabel>Hasło</FormLabel>
                            <Input name='password' type='password' value={data.password} onChange={handleChange} required/>
                            {!errors.password ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage >Hasło jest wymagane</FormErrorMessage>
                            )}
                        </FormControl>
                        <Button mt={4} type="submit" isDisabled={formDisabled}>Zarejestruj</Button>
                        {message !== '' ?(
                            <Text>{message}</Text>
                        ): ( 
                            <div><br></br></div>
                        )}
                        
                    </form>

                </CardBody>
                <CardFooter>
                    <Text fontSize='2xl'>Masz juz konto? Kliknij <Link as={ReactRouterLink} to="/login" variant='underline'> Zaloguj</Link></Text>

                </CardFooter>

            </Card>
        </Flex>



    )
}
export default Register;