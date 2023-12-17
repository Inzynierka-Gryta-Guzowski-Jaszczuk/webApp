import { React, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import AxiosApi from '../../services/axios.config';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';



function Register() {
    const theme = useTheme();
    const primaryColor = useColorModeValue(theme.colors.primary.light, theme.colors.primary.dark);
    const secondaryColor = useColorModeValue(theme.colors.secondary.light, theme.colors.secondary.dark);
    const boxShadow = useColorModeValue(theme.cardStyle.boxShadow.light, theme.cardStyle.boxShadow.dark);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' });
    const navigate = useNavigate()


    const passwordValidation = {
        required: "Hasło jest wymagane",
        minLength: {
            value: 8,
            message: "Hasło musi zawierać co najmniej 8 znaków"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Hasło musi zawierać wielką literę, cyfrę i znak specjalny"
        }
    };

    const [test, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const url = "user/register";
            const { data: res } = await AxiosApi.post(url, data);
            setMessage(res.message);
            navigate('/login');

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
            <Card display='flex' align='center' size='lg' mt={100} px={60} mx={40} pb={20} mb={100} variant='outline' bg={secondaryColor} color={primaryColor} boxShadow={boxShadow}>
                <CardHeader>
                    <Heading>Zarejestruj</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={primaryColor} borderRadius='20' px={40}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.userName}>
                            <FormLabel>Nazwa użytkownika</FormLabel>
                            <Input {...register('userName', { required: 'Nazwa użytkownika jest wymagana' })} width='md' />
                            <FormErrorMessage>
                                {errors.userName && errors.userName.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.firstName}>
                            <FormLabel>Imię</FormLabel>
                            <Input {...register('firstName', { required: 'Imię jest wymagane' })} width='md' />
                            <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.lastName}>
                            <FormLabel>Nazwisko</FormLabel>
                            <Input {...register('lastName', { required: 'Nazwisko użytkownika jest wymagane' })} width='md' />
                            <FormErrorMessage>
                                {errors.lastName && errors.lastName.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input {...register('email', { required: 'Email jest wymagany', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Nieprawidłowy format email" } })} type='email' width='md' />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Hasło</FormLabel>
                            <Input {...register('password', passwordValidation)} type='password' width='md' />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button mt={4} type="submit" >Zarejestruj</Button>
                        {test !== '' ? (
                            <Text>{test}</Text>
                        ) : (
                            <div><br></br></div>
                        )}

                    </form>

                </CardBody>
                <CardFooter>
                    <Text fontSize='2xl'>Masz juz konto? Kliknij <Link as={ReactRouterLink} to="/zaloguj" variant='underline'> Zaloguj</Link></Text>

                </CardFooter>

            </Card>
        </Flex>



    )
}
export default Register;