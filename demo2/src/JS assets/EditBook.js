import { Button, FormHelperText, TextField, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { GetAllCategories } from '../services/GetAllCategories';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBookById } from '../services/GetBookById';
 import * as Yup from 'yup';
import { EditBookServices } from '../services/EditBookServices';

const initials = {
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    base64image: ""
}

export const EditBook = () => {
    //constant declarations
    const { id } = useParams();
    const [ivalues, setIvalues] = useState(initials);
    const [cat, setCat] = useState([]);
    const navigate = useNavigate();


    //what to do at page load time
    useEffect(() => {
        getBookInfo();
        getAllCategory();
    }, []);


    //funciton to get all categories 
    const getAllCategory = async () => {
        await GetAllCategories().then((response) => {
            setCat(response.data.result);
        }).catch(() => {
            toast.error("GetAllCategories failed", { position: 'bottom-right' });
        })
    }

    //Function to get the initial book info
    const getBookInfo = async () => {
        await GetBookById(Number(id)).then((response) => {
            const res = response.data.result;
            setIvalues({
                ...ivalues,
                name: res.name,
                description: res.description,
                price: res.price,
                categoryId: res.categoryId,
                base64image: res.base64image
            });
        }).catch(() => {
            toast.error("Book can't be retrieved", { position: 'bottom-right' })
        })
    }

    //function to convert the image in base 64 form
    const handleImg = (files, setFieldValue) => {
        if (files?.length) {
            const selectedFiles = files[0];
            const fileNameArray = selectedFiles.name.split(".");
            const extension = fileNameArray.pop();
            if (["png", "jpeg", "jpg"].includes(extension?.toLowerCase())) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFiles);
                reader.onload = function(){
                    setFieldValue('base64image', reader.result);
                    console.log(reader.result);
                };
                // reader.onerror = function() {
                //     throw error;
                // };
            } else {
                toast.error("Only jpg and png format are allowed!",{position: 'bottom-right'})
            }

        } else {
            setFieldValue('base64image', "");
        } 

    }

    //Yup schema for validation 
    const vSchema = Yup.object().shape({
        name: Yup.string().
            matches(/^[a-zA-Z]+/, "invalid name").
            required("name field cannot be empty!"),
        description: Yup.string().required("Description field must not be emmpty"),
        categoryId: Yup.string().required("Category field must not be emmpty"),
        //base64image: Yup.string().required("Image field must not be emmpty"),
        price: Yup.number().required("Price field must not be emmpty")
    });

    //function to handle form submission 
    const handleSubmit = async(values) =>{
        const payload = {
            id: id,
            name: values.name,
            description: values.description,
            price: values.price,
            categoryId: values.categoryId,
            base64image: values.base64image
        }
        await EditBookServices(payload).then((Response) => {
            if(Response && Response.status === 200){
                toast.success("Book updated successfully", {position:'bottom-right'})
                navigate("/booklist");
            }
        }).catch(() =>{
            toast.error("Book can't be edited", {position:'bottom-right'});
        })
    }

    //return statement of the component
    return (
        <div style={{
            height: '110vmin'
        }}>
            <Formik
                initialValues={ivalues}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={vSchema}
            >
                {({ values, errors, setFieldValue, handleBlur }) => {
                    //return statement of Formik-----------------------------------------------
                    return (
                        <Form className='page'>
                            <div style={{
                                border: '2px solid',
                                borderColor: theme.palette.secondary.dark,
                                marginTop: '5%',
                                alignContent: 'center',
                            }}>
                                <div style={{
                                    marginLeft: '5%',
                                    marginTop: '5%',
                                    marginBottom: '5%',
                                }}>
                                    <Typography variant='h2' className='heading2'
                                        style={{
                                            marginLeft: '35%'
                                        }}
                                    >
                                        Edit Book
                                    </Typography>

                                    {/* textfields */}
                                    <Typography style={{
                                        marginTop: '2%',
                                        width: '50%',
                                        float: 'left'
                                    }}>
                                        <TextField variant='outlined' label='Name' name='name'
                                            onChange={(e) => { setFieldValue("name", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='name' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '2%',
                                        float: 'right',
                                        marginRight: '25%',
                                        marginBottom: '2%',
                                    }}>
                                        <TextField variant='outlined' label='Price' name='price'
                                            onChange={(e) => { setFieldValue("price", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.price}
                                            id='price'
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='price' />
                                        </FormHelperText>
                                    </Typography>

                                    <FormControl style={{
                                        marginTop: '2%',
                                        width: '30%',
                                        float: 'left',
                                        marginBottom: '2%'
                                    }}>
                                        <InputLabel id='lab_category'>
                                            Category
                                        </InputLabel>
                                        <Select onChange={(e) => { setFieldValue("categoryId",e.target.value) }}
                                            label='Category'
                                            name='categoryId'
                                            id='sel_category'
                                            labelId='lab_category'
                                            value={values.categoryId}
                                        >
                                            {cat.map((category, index) => {
                                                return (
                                                    <MenuItem value={category.id}
                                                        key={index}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        <FormHelperText error>
                                            <ErrorMessage name='categoryId' />
                                        </FormHelperText>
                                    </FormControl>

                                    <Typography style={{
                                        marginTop: '2%',
                                    }}
                                    >
                                        <TextField name='base64image'
                                            type='file'
                                            style={{
                                                float: 'right',
                                                marginRight: '25%',
                                                marginBottom: '2%', //width: '19%'
                                            }}
                                            //value={values.base64image}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                handleImg(files, setFieldValue)
                                            }}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='base64image' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '2%',
                                    }}>
                                        <TextField variant='outlined' label='Description' name='description'
                                            onChange={(e) => { setFieldValue("description", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            multiline
                                            rows={4}
                                            style={{ width: '40%', marginRight: '40%', }}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='description' />
                                        </FormHelperText>
                                    </Typography>

                                    {/* Button to submit the values */}
                                    <Button variant='contained' className='btnLogin' style={{
                                        marginTop: '2%',
                                        marginLeft: '45%'
                                    }} type='submit'>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    );
                }
                }

            </Formik>
        </div>


    );
}