import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import '../CSS assets/MyStyle.css';
import { commonStyles } from '../CSS assets/commonStyles';
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { RegServices } from '../services/RegServices';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


export const SignupPage = ({ setThroughSignup }) => {
    //constant to apply common styles
    const useStyles = commonStyles();

    const navigate = useNavigate();     /* Used to navigate to given path */

    //handleSignup function definition
    const handleSignup = async (values) => {
        const payload = {
            firstName: values.UserName,
            lastName: values.lastName,
            email: values.Email,
            roleId: values.roleId,
            password: values.Password
        }

        await RegServices(payload).then((response) => {
            if (response && response.status === 200) {
                toast.success("You are successfully signed up!", {
                    position: "bottom-right"
                });
                Cookies.set("auth_email", values.Email);
                setThroughSignup(response.data.result.id,
                    response.data.result.email,
                    response.data.result.firstName + response.data.result.lastName,
                    response.data.result.roleId);
                navigate("/");
            }
            //alert("Signup done!");
        }).catch(() => {
            toast.error("Sign Up failed!", {
                position: "bottom-right"
            });
            values.UserName = "";
            values.Email = "";
            values.Password = "";
            values.roleId = "";
        });

        // axios.post(`${BASEURL}`, payload).then((response) => {
        //     //console.log(response);
        //     setThroughSignup(response.data.result.id);
        //     alert("Signup done!");
        // }).catch(() => {
        //     alert("signup not done properly!");
        // });
    }

    const vSchema = Yup.object().shape({
        UserName: Yup.string().required("User name field cannot be empty"),
        lastName: Yup.string().required("Last name field cannot be empty"),
        Password: Yup.string().min(8).required("Password field must not be emmpty"),
        Email: Yup.string().matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "invalid email").
            required("email field cannot be empty!"),
        roleId: Yup.string().required("Role field cannot be empty"),
    })

    return (
        <div style={{
            height: '100vh'
        }}>
            <Formik
                initialValues={{ UserName: "", Password: "", Email: "", roleId: "", lastName: "" }}
                onSubmit={(values) => handleSignup(values)}
                validationSchema={vSchema}
            >
                {({ values, errors, setFieldValue, handleBlur }) => {
                    return (
                        <Form className='page'>
                            <div className='loginWrapper' style={{
                                border: '2px solid',
                                borderColor: theme.palette.secondary.dark,
                                marginTop: '5%',
                                alignContent: 'center',
                                // height: '410px'
                            }}>
                                <div style={{
                                    marginLeft: '35%',
                                    marginTop: '1%',
                                    marginBottom: '1%',
                                    marginRight: '35%',
                                }}>
                                    <Typography variant='h2' className='heading2' style={{ marginLeft: '5%' }}>
                                        Signup
                                    </Typography>
                                    <Typography style={{
                                        marginTop: '5%',
                                    }}>
                                        <TextField variant='outlined' label='UserName' name='UserName'
                                            onChange={(e) => { setFieldValue("UserName", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.UserName}
                                            style={{padding: 10}}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='UserName' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '5%',
                                    }}>
                                        <TextField variant='outlined' label='Last Name' name='lastName'
                                            onChange={(e) => { setFieldValue("lastName", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            style={{padding: 10}}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='lastName' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '5%'
                                    }}>
                                        <TextField variant='outlined' label='Email' name='Email'
                                            onChange={(e) => { setFieldValue("Email", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Email}
                                            style={{padding: 10}}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Email' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '5%'
                                    }}>
                                        <TextField variant='outlined' label='Password' name='Password'
                                            onChange={(e) => { setFieldValue("Password", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Password}
                                            style={{padding: 10}}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Password' />
                                        </FormHelperText>
                                    </Typography>

                                    <Typography style={{
                                        marginTop: '5%',
                                    }}>
                                        <FormControl style={{
                                            width: '100%'
                                        }}>
                                            <InputLabel id='lab_category'>
                                                Role
                                            </InputLabel>
                                            <Select
                                                label='Category'
                                                name='roleId'
                                                id='sel_category'
                                                onChange={(e) => { setFieldValue("roleId", e.target.value) }}
                                                labelId='lab_category'
                                                value={values.roleId}
                                            >
                                                <MenuItem value='2'> Seller </MenuItem>
                                                <MenuItem value='3'> Buyer </MenuItem>
                                            </Select>
                                            <FormHelperText error>
                                                <ErrorMessage name='roleId' />
                                            </FormHelperText>
                                        </FormControl>
                                    </Typography>


                                    <Button variant='contained' className='btnLogin' style={{
                                        marginTop: '5%',
                                        marginLeft: '23%'
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