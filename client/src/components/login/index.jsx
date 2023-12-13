import { React, useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AxiosApi from '../../services/axios.config';
import { useNavigate } from 'react-router-dom';

function Login() {
    const theme = useTheme();
    const primaryColor = useColorModeValue(theme.colors.primary.light, theme.colors.primary.dark);
    const secondaryColor = useColorModeValue(theme.colors.secondary.light, theme.colors.secondary.dark);
    const boxShadow = useColorModeValue(theme.cardStyle.boxShadow.light, theme.cardStyle.boxShadow.dark);
    const [message, setMessage] = useState("");
    const [formDisabled,setFormDisabled] = useState(false);
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors, isSubmitting  }} = useForm({mode: 'onBlur'})

    const onSubmit = async (data) => {
        try {
            const url = "user/login"
            const response = await AxiosApi.post(url, data)
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            setMessage(response.data.message);
            setFormDisabled(true);
            navigate('/');
            
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
            <Card display='flex' align='center' size='md' mt={100} px={60} mx={40} pb={20} variant='outline' bg={secondaryColor} color={primaryColor}  boxShadow={boxShadow}>
                <CardHeader>
                    <Heading>Zaloguj</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={primaryColor} borderRadius='20' px={40}>
                    <form onSubmit={handleSubmit(onSubmit)}>  
                        <FormControl isInvalid={errors.userName} px={10} h={100}>
                            <FormLabel>Nazwa użytkownika</FormLabel>
                            <Input id="userName" width='md' {...register('userName', {
                                 required: 'To pole jest wymagane',
                                 minLength: { value: 4, message: 'Minimum length should be 4'}
                            })} />
                                {!errors.userName ? (
                                <></>
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
                            <></>
                        )}
                    </form>

                </CardBody>
                <CardFooter>
                    <Text fontSize='2xl'>Nie masz konta? Kliknij <Link href="/zarejestruj" variant='underline'> Zarejestruj</Link></Text> 
                    
                </CardFooter>

            </Card>
        </Flex>



    )
}
export default Login;