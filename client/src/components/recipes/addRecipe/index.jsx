import AxiosApi from "../../../services/axios.config";
import { React, useState, useEffect, useMemo } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useTheme, Flex, Text, Link, Textarea, Select as SelectChakra, Box, Center } from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import FileUpload from "../../fileUpload";

function AddRecipe() {
    const theme = useTheme();
    const [message, setMessage] = useState("");
    const [formDisabled, setFormDisabled] = useState(false);
    const [recipeData, setRecipeData] = useState(null);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        mode: 'onBlur',
        defaultValues: useMemo(() => {
            return recipeData;
        }, [recipeData])
    })
    useEffect(() => {
        reset(recipeData);
    }, [recipeData]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });
    const { fields: stepFields, append: instructionAppend, remove: stepRemove } = useFieldArray({
        control,
        name: "instructions",
    });
    const [tags, setTags] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const { data } = await AxiosApi.get('/recipe/tags');
  
        
            var tempTags = []
            for (const [key, value] of Object.entries(data)) {
                tempTags = tempTags.concat(value)
            }
            tempTags = tempTags.map((element) => {
                return { "value": element, "label": element }
            })
            setTags(tempTags)

        }
        fetchData()
    }, [])

    var { id } = useParams();
    useEffect(() => {
        const fetchRecipe = async () => {

            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `Bearer ${token}`
                    }
                };
                const recepieUrl = "recipe/public/" + id;
                const { data: recepie } = await AxiosApi.get(recepieUrl, config);
                recepie.instructions = recepie.instructions.map(instruction => ({"name": instruction}));
                recepie.ingredients = recepie.ingredients.map(ingredient => ({"name": ingredient.name, "ammount": ingredient.ammount, "unit": ingredient.unit}));
                recepie.tags = recepie.tags.map(tag => {
                    return { "value": tag, "label": tag }
                });
                const { author,recipe_id, saved_count, rating, image , ...recepieFormData } = recepie;
                setRecipeData(recepieFormData);

            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                }
            }
        };
        if (id) {
            fetchRecipe();
        }
    }, []);
    const onSubmit = async (data) => {
        if (data.tags) {
            data.tags = data.tags.map(tag => tag.value);
        }
        else {
            data.tags = null;
        }
        data.instructions = data.instructions.map(instruction => instruction.name);
        const { image, ...recipeData } = data

        const formData = new FormData();

        formData.append('file', image);


        try {
            var token = localStorage.getItem("token");
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                }
            }
            const imageConfig = {
                headers: { 'Content-Type': 'multipart/form-data', 'token': `Bearer ${token}` }
            }
            if (id) {
                const url = `recipe`
                const response = await AxiosApi.put(url, {...recipeData, id:id}, config)
                if (image instanceof File) {
                    const imgUrl = `image/recipe/${id}`
                    const imgResponse = await AxiosApi.post(imgUrl, formData, imageConfig)
                }
            }
            else {
                const url = "recipe/add"
                const response = await AxiosApi.post(url, recipeData, config)
                if (image instanceof File) {
                    const imgUrl = `image/recipe/${response.data}`
                    const imgResponse = await AxiosApi.post(imgUrl, formData, imageConfig)
                }
            }


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

    useEffect(() => {
        append()
        instructionAppend()
        return () => {
            stepRemove(0)
            remove(0)
        }
    }, [])
    
    return (
        <Flex justify='center' mb={100}>
            <Card display='flex' size='md' mt={100} px={10} mx={40} pb={20} variant='outline' bg={theme.colors.secondary} color={theme.colors.primary} boxShadow={theme.cardStyle.boxShadow}>
                <CardHeader>
                    <Heading textAlign='center'>Dodaj przepis</Heading>
                </CardHeader>
                <CardBody mb={10} border='solid' borderColor={theme.colors.primary} borderRadius='20' px={10} >
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <FormControl isInvalid={errors.name} px={2} h={100}>
                            <FormLabel >Nazwa</FormLabel>
                            <Input id="name" width='md'  {...register('name', {
                                required: 'To pole jest wymagane',
                                minLength: { value: 4, message: 'Minimum length should be 4' }
                            })} />
                            {!errors.name ? (
                                <></>
                            ) : (
                                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.description} px={2} py={2} minHeight={100}>
                            <FormLabel>Opis</FormLabel>
                            <Textarea id="description" type='text' {...register('description'

                            )} />
                            <FormErrorMessage >{errors.description ? errors?.description?.message : "test123"}</FormErrorMessage>
                        </FormControl>
                        {fields.map((field, index) => {
                            return (
                                <Flex flexDirection="row" key={field.id} maxW='80%'>
                                    <FormControl isInvalid={errors.ingredients && errors?.ingredients[index]?.name} px={2} py={2} minHeight={100} textAlign='center' >
                                        <FormLabel>
                                            Nazwa składnika
                                        </FormLabel>
                                        <Input width='sm'  {...register(`ingredients.${index}.name`, {
                                            required: 'To pole jest wymagane',

                                        })} />
                                        {errors.ingredients && !errors?.ingredients[index]?.name?.message ? (
                                            <></>
                                        ) : (
                                            <FormErrorMessage>{errors.ingredients && errors?.ingredients[index]?.name?.message}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl isInvalid={errors.ingredients && errors?.ingredients[index]?.ammount} px={2} py={2} minHeight={100} >
                                        <FormLabel>
                                            Liczba
                                        </FormLabel>
                                        <Input width='sm'  {...register(`ingredients.${index}.ammount`, {
                                            required: 'To pole jest wymagane',

                                        })} />
                                        {errors.ingredients && !errors?.ingredients[index]?.ammount?.message ? (
                                            <></>
                                        ) : (
                                            <FormErrorMessage>{errors.ingredients && errors?.ingredients[index]?.ammount?.message}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl isInvalid={errors.ingredients && errors?.ingredients[index]?.unit} px={2} py={2} minHeight={100} >
                                        <FormLabel>
                                            Jednostka
                                        </FormLabel>
                                        <Input width='sm'  {...register(`ingredients.${index}.unit`, {
                                            required: 'To pole jest wymagane',

                                        })} />
                                        {errors.ingredients && !errors?.ingredients[index]?.unit?.message ? (
                                            <></>
                                        ) : (
                                            <FormErrorMessage>{errors.ingredients && errors?.ingredients[index]?.unit?.message}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    {index !== 0 && (

                                        <Button mt={10} onClick={() => remove(index)}>-</Button>
                                    )}
                                </Flex>
                            )
                        })}
                        <Button my={4} onClick={() => {
                            append({ name: "", ammount: "", unit: "" });
                        }}>Dodaj składnik</Button>
                        {stepFields.map((field, index) => {
                            return (
                                <Flex flexDirection="row" key={field.id} >
                                    <FormControl isInvalid={errors.instructions && errors?.instructions[index]?.name} px={2} py={2} minHeight={100}>
                                        <FormLabel>
                                            Krok
                                        </FormLabel>
                                        <Input  {...register(`instructions.${index}.name`, {
                                            required: 'To pole jest wymagane',

                                        })} />
                                        {errors.instructions && !errors?.instructions[index]?.name.message ? (
                                            <></>
                                        ) : (
                                            <FormErrorMessage>{errors.instructions && errors?.instructions[index]?.name.message}</FormErrorMessage>
                                        )}
                                    </FormControl>

                                    {index !== 0 && (

                                        <Button mt={10} onClick={() => stepRemove(index)}>-</Button>
                                    )}
                                </Flex>
                            )
                        })}
                        <Button my={4} onClick={() => {
                            instructionAppend({ name: "" });
                        }}>Dodaj krok</Button>
                        <Text my={4}>Tagi</Text>
                        <Controller

                            control={control}
                            name="tags"
                            render={({ field: { onChange, value, name, ref } }) => (
                                <Select
                                    mt={4}
                                    inputRef={ref}
                                    options={tags}
                                    onChange={val => {
                                        onChange(val)
                                    }}
                                    isMulti
                                />
                            )}
                        />

                        <Text mt={4}>Poziom trudności</Text>
                        <Controller
                            name="difficulty"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <SelectChakra mt={4} {...field}>
                                    <option disabled hidden value="">
                                        wybierz
                                    </option>
                                    <option value="easy">Łatwy</option>
                                    <option value="medium">Średni</option>
                                    <option value="hard">Trudny</option>
                                </SelectChakra>
                            )}
                        />
                        <FormControl isInvalid={errors.calories} px={2} py={2} h={100}>
                            <FormLabel>Kalorie</FormLabel>
                            <Input id="calories" width='md'  {...register('calories', {
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Wartość musi być dodatnia',
                                },

                            })} />
                            {!errors.calories ? (
                                <></>
                            ) : (
                                <FormErrorMessage>{errors?.calories?.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.portions} px={2} py={2} h={100}>
                            <FormLabel>Liczba porcji</FormLabel>
                            <Input id="portions" width='md'  {...register('portions', {
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Wartość musi być dodatnia',
                                },
                            })} />
                            {!errors.portions ? (
                                <></>
                            ) : (
                                <FormErrorMessage>{errors?.portions?.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.time} px={2} py={2} h={100}>
                            <FormLabel>Czas</FormLabel>
                            <Input id="time" width='md'  {...register('time', {
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: 'Wartość musi być dodatnia',
                                },
                            })} />
                            {!errors.time ? (
                                <></>
                            ) : (
                                <FormErrorMessage>{errors?.time?.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FileUpload name='image' placeholder='Wybierz zdjecie' acceptedFileTypes='image/*' control={control} label='Zdjęcie'></FileUpload>
                        {id ? (
                            <Button mt={4} type="submit" isDisabled={formDisabled}>Edytuj</Button>
                        ): (
                            <Button mt={4} type="submit" isDisabled={formDisabled}>Dodaj</Button>
                        )}
                        
                        {message !== '' ? (
                            <Text>{message}</Text>
                        ) : (
                            <div><br></br></div>
                        )}
                    </form>

                </CardBody>

            </Card>
        </Flex>


    );
}
export default AddRecipe;