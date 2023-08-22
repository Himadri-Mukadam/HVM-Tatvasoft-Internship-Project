import { Button, FormHelperText, TextField, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { AddCategoryService } from '../services/AddCategoryService';
import { useNavigate } from 'react-router-dom';
 import * as Yup from 'yup';

export const AddCategory = () => {
    const navigate = useNavigate();
    const handleSubmit = async(values) =>{
        const payload = {
            name: values.name,
        }

        await AddCategoryService(payload).then((Response) => {
            if(Response && Response.status === 200) {
                toast.success("Category Uploaded sucessfully", {position: 'bottom-right'});
                navigate("/categories");
            }
        }).catch(() => {
            toast.error("Category not added", {position: 'bottom-right'});
        })
    }

    const vSchema = Yup.object().shape({
        name: Yup.string().
            matches(/^[a-zA-Z]+/, "invalid name").
            required("name field cannot be empty!")
    })

    return (
        <div style={{
            height: '100vmax'
        }}>
            <Formik
                initialValues={{
                    name: "",
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
                                            marginLeft: '30%'
                                        }}
                                    >
                                        Add New Category
                                    </Typography>

                                    {/* textfields */}
                                    <Typography style={{
                                        marginTop: '2%',
                                        width: '100%',
                                        float: 'left'
                                    }}>
                                        <TextField variant='outlined' label='Name' name='name'
                                            onChange={(e) => { setFieldValue("name", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            style={{width: '50%'}}
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