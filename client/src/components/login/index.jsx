import { React, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AxiosApi from '../../services/axios.config';

function Login() {
    const theme = useTheme();
    const [message, setMessage] = useState("");
    const [formDisabled,setFormDisabled] = useState(false);

    const {register, handleSubmit, formState: { errors, isSubmitting  }} = useForm({mode: 'onBlur'})

    const onSubmit = async (data) => {
        try {
            const url = "user/login"
            const response = await AxiosApi.post(url, data)
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            setMessage(response.data.message);
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
    console.log(errors)
    return (
        <Flex justify='center' textAlign='center' mb={100}>
            <Card display='flex' align='center' size='md' mt={100} px={60} mx={40} pb={20} variant='outline' bg={theme.colors.secondary} color={theme.colors.primary}  boxShadow={theme.cardStyle.boxShadow}>
                <CardHeader>
                    <Heading>Zaloguj</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={theme.colors.primary} borderRadius='20' px={40}>
                    <form onSubmit={handleSubmit(onSubmit)}>  
                        <FormControl isInvalid={errors.userName} px={10}>
                            <FormLabel>Nazwa użytkownika</FormLabel>
                            <Input id="userName" width='md' {...register('userName', {
                                 required: 'To pole jest wymagane',
                                 minLength: { value: 4, message: 'Minimum length should be 4'}
                            })} />
                                {!errors.userName ? (
                                <div><br></br></div>
                            ) : (
                                <FormErrorMessage>{errors.userName.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.password} px={10} py={2}  h={100}>
                            <FormLabel>Hasło</FormLabel>
                            <Input id="password" type='password' {...register('password', {
                                 required: 'This is required',
                                 minLength: { value: 4, message: 'Minimum length should be 4'}
                            })} />
                                <FormErrorMessage >{errors.password ? errors.password.message : "test123" }</FormErrorMessage>
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