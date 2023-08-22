import { Button, FormHelperText, TextField, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { GetCategoryById } from '../services/GetCategoryById';
import * as Yup from 'yup';
import { EditCategoryServices } from '../services/EditCategoryServices';

const initials = {
    name: ""
}

export const EditCategory = () => {
    //constant declarations
    const { id } = useParams();
    const [ivalues, setIvalues] = useState(initials);
    const [cat, setCat] = useState([]);
    const navigate = useNavigate();


    //what to do at page load time
    useEffect(() => {
        getBookInfo();
    }, []);

    //Function to get the initial book info
    const getBookInfo = async () => {
        await GetCategoryById(Number(id)).then((response) => {
            const res = response.data.result;
            setIvalues({
                ...ivalues,
                name: res.name
            });
        }).catch(() => {
            toast.error("Category can't be retrieved", { position: 'bottom-right' })
        })
    }


    //Yup schema for validation 
    const vSchema = Yup.object().shape({
        name: Yup.string().
            matches(/^[a-zA-Z]+/, "invalid name").
            required("name field cannot be empty!")
    });

    //function to handle form submission 
    const handleSubmit = async (values) => {
        const payload = {
            id: id,
            name: values.name
        }
        await EditCategoryServices(payload).then((Response) => {
            if (Response && Response.status === 200) {
                toast.success("Category updated successfully", { position: 'bottom-right' })
                navigate("/categories");
            }
        }).catch(() => {
            toast.error("Category can't be edited", { position: 'bottom-right' });
        })
    }

    //return statement of the component
    return (
        <div style={{
            height: '83vmin'
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
                                        Edit Category
                                    </Typography>

                                    {/* textfields */}
                                    <Typography style={{
                                        marginTop: '2%',
                                        width: '50%',
                                        float: 'left'
                                    }}>
                                        <TextField variant='outlined' label='Category Name' name='name'
                                            onChange={(e) => { setFieldValue("name", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='name' />
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