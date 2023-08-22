import { Button, FormHelperText, TextField, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { GetUserById } from '../services/GetUserById';
import * as Yup from 'yup';
import { EditUserServices } from '../services/EditUserServices';

const initials = {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    roleId: "",
    password: ""
}

const roleArray = [
    "Admin", "Seller", "Buyer"
]

export const EditUsers = () => {
    //constant declarations
    const { id } = useParams();
    const [ivalues, setIvalues] = useState(initials);
    //const [cat, setCat] = useState([]);
    const navigate = useNavigate();


    //what to do at page load time
    useEffect(() => {
        getBookInfo();
    }, []);


    //Function to get the initial book info
    const getBookInfo = async () => {
        await GetUserById(Number(id)).then((response) => {
            const res = response.data.result;
            setIvalues({
                ...ivalues,
                email: res.email,
                firstName: res.firstName,
                lastName: res.lastName,
                roleId: res.roleId,
                role: res.role,
                password: res.password
            });
        }).catch(() => {
            toast.error("Book can't be retrieved", { position: 'bottom-right' })
        })
    }

    //Yup schema for validation 
    const vSchema = Yup.object().shape({
        email: Yup.string().
            matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "invalid email id").
            required("name field cannot be empty!"),
        firstName: Yup.string().
        matches(/^[a-zA-Z]+/, "invalid name").
        required("Description field must not be emmpty"),
        roleId: Yup.string().required("Category field must not be emmpty"),
        lastName: Yup.string().
        matches(/^[a-zA-Z]+/, "invalid name").
        required("Price field must not be emmpty")
    });

    //function to handle form submission 
    const handleSubmit = async (values) => {
        const payload = {
            id: id,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            roleId: values.roleId,
            role: values.role,
            password: values.password
        }
        await EditUserServices(payload).then((Response) => {
            if (Response && Response.status === 200) {
                toast.success("User info updated successfully", { position: 'bottom-right' })
                navigate("/userlist");
            }
        }).catch(() => {
            toast.error("User info can't be edited", { position: 'bottom-right' });
        })
    }

    //return statement of the component
    return (
        <div style={{
            height: '100vmin'
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
                                            marginLeft: '25%'
                                        }}
                                    >
                                        Edit User Information
                                    </Typography>

                                    {/* textfields */}
                                    <Typography style={{
                                        marginTop: '2%',
                                        width: '50%',
                                        float: 'left'
                                    }}>
                                        <TextField variant='outlined' label='Email' name='email'
                                            onChange={(e) => { setFieldValue("email", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='email' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '2%',
                                        float: 'right',
                                        marginRight: '25%',
                                        marginBottom: '2%',
                                    }}>
                                        <TextField variant='outlined' label='First Name' name='firstName'
                                            onChange={(e) => { setFieldValue("firstName", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            id='price'
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='firstName' />
                                        </FormHelperText>
                                    </Typography>

                                    <FormControl style={{
                                        marginTop: '2%',
                                        width: '30%',
                                        float: 'left',
                                        marginBottom: '2%'
                                    }}>
                                        <InputLabel id='lab_category'>
                                            Role
                                        </InputLabel>
                                        <Select onChange={(e) => {
                                            setFieldValue("roleId", e.target.value);
                                            setFieldValue("role", roleArray[values.roleId - 1])
                                        }}
                                            label='Category'
                                            name='roleId'
                                            id='sel_category'
                                            labelId='lab_category'
                                            value={values.roleId}
                                        >
                                            <MenuItem value='1'> Admin </MenuItem>
                                            <MenuItem value='2'> Seller </MenuItem>
                                            <MenuItem value='3'> Buyer </MenuItem>
                                        </Select>
                                        <FormHelperText error>
                                            <ErrorMessage name='categoryId' />
                                        </FormHelperText>
                                    </FormControl>

                                    <Typography style={{
                                        marginTop: '0%',
                                        float: 'right',
                                        marginRight: '25%',
                                        marginBottom: '2%',
                                    }}>
                                        <TextField variant='outlined' label='Last Name' name='lastName'
                                            onChange={(e) => { setFieldValue("lastName", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            id='lastName'
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='lastName' />
                                        </FormHelperText>
                                    </Typography>


                                    {/* Button to submit the values */}
                                    <Button variant='contained' className='btnLogin' style={{
                                        marginTop: '2%',
                                        marginLeft: '43%'
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