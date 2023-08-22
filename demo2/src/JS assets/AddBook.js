import { Button, FormHelperText, TextField, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { GetAllCategories } from '../services/GetAllCategories';
import { toast } from 'react-toastify';
import { AddBookService } from '../services/AddBookService';
import { useNavigate } from 'react-router-dom';
 import * as Yup from 'yup';

export const AddBooks = () => {
    const [cat, setCat] = useState([]);
    const [catId, setCatId] = useState(0);
    const navigate = useNavigate();

    const getAllCategory = async () => {
        await GetAllCategories().then((response) => {
            setCat(response.data.result);
        }).catch(() => {
            toast.error("GetAllCategories failed", { position: 'bottom-right' });
        })
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleImg = (files, setFieldValue) => {
        if (files?.length) {
            const selectedFiles = files[0];
            const fileNameArray = selectedFiles.name.split(".");
            const extension = fileNameArray.pop();
            if (["png", "jpeg", "jpg"].includes(extension?.toLowerCase())) {
                /*if (selectedFiles.size > 50000) {
                    toast.error("File should not be greater than 50KB", { position: 'bottom-right' })
                    return;
                }*/
                const reader = new FileReader();
                reader.readAsDataURL(selectedFiles);
                reader.onload = function(){
                    setFieldValue('Img', reader.result);
                    console.log(reader.result);
                };
                // reader.onerror = function() {
                //     throw error;
                // };
            } else {
                toast.error("Only jpg and png format are allowed!",{position: 'bottom-right'})
            }

        } else {
            setFieldValue('Img', "");
        } 

    }

    const handleSubmit = async(values) =>{
        const payload = {
            name: values.Name,
            description: values.Description,
            price: values.Price,
            categoryId: catId,
            base64image: values.Img
        }

        await AddBookService(payload).then((Response) => {
            if(Response && Response.status === 200) {
                toast.success("Book Uploaded sucessfully", {position: 'bottom-right'});
                navigate("/booklist");
            }
        }).catch(() => {
            toast.error("Book not added", {position: 'bottom-right'});
        })
    }

    const vSchema = Yup.object().shape({
        Name: Yup.string().
            matches(/^[a-zA-Z]+/, "invalid name").
            required("name field cannot be empty!"),
        Description: Yup.string().required("Description field must not be emmpty"),
        CategoryId: Yup.string().required("Category field must not be emmpty"),
        Img: Yup.string().required("Image field must not be emmpty"),
        Price: Yup.number().required("Price field must not be emmpty")
    })

    return (
        <div style={{
            height: '100vmax'
        }}>
            <Formik
                initialValues={{
                    Name: "",
                    Description: "",
                    Price: "",
                    CategoryId: 0,
                    Img: ""
                }}
            onSubmit={(values) => handleSubmit(values)}
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
                                        Add New Book
                                    </Typography>

                                    {/* textfields */}
                                    <Typography style={{
                                        marginTop: '2%',
                                        width: '50%',
                                        float: 'left'
                                    }}>
                                        <TextField variant='outlined' label='Name' name='Name'
                                            onChange={(e) => { setFieldValue("Name", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Name}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Name' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '2%',
                                        float: 'right',
                                        marginRight: '25%',
                                        marginBottom: '2%',
                                    }}>
                                        <TextField variant='outlined' label='Price' name='Price'
                                            onChange={(e) => { setFieldValue("Price", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Price}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Price' />
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
                                        <Select onChange={(e) => { setCatId(e.target.value) }}
                                            label='Category'
                                            id='sel_category'
                                            labelId='lab_category'
                                            value={catId}
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
                                            <ErrorMessage name='CategoryId' />
                                        </FormHelperText>
                                    </FormControl>

                                    <Typography style={{
                                        marginTop: '2%',
                                    }}
                                    >
                                        <TextField name='Img'
                                            type='file'
                                            style={{
                                                float: 'right',
                                                marginRight: '25%',
                                                marginBottom: '2%', //width: '19%'
                                            }}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                handleImg(files, setFieldValue)}}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Img' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '2%',
                                    }}>
                                        <TextField variant='outlined' label='Description' name='Description'
                                            onChange={(e) => { setFieldValue("Description", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Description}
                                            multiline
                                            rows={4}
                                            style={{ width: '40%', marginRight: '40%', }}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Description' />
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