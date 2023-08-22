import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import '../CSS assets/MyStyle.css';
//import { commonStyles } from '../CSS assets/commonStyles';
import { theme } from '../CSS assets/theme';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthServices } from '../services/AuthServices';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
//import { useContext } from 'react';
//import { CredContext } from '../services/CredServices';

//LoginPage component
export const LoginPage = ({ setThroughSignup }) => {
    //constant to apply common styles-------------------------------------------------------------
    //const useStyles = commonStyles();

    /* Used to navigate to given path -------------------------------------------------------------*/
    const navigate = useNavigate();

    //handleLogin function definition--------------------------------------------------------------------------
    const handleLogin = async (values) => {
        const payload = {
            email: values.Email,
            password: values.Password
        }

        await AuthServices(payload).then((response) => {
            if (response && response.status === 200) {
                toast.success("You are successfully logged in!", {
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
        }).catch((error) => {
            if (error.response.data.code === 401) {
                toast.error("Invalid credentials", {
                    position: "bottom-right"
                })
            }
            else {
                toast.error("Login failed!", {
                    position: "bottom-right"
                });
            }
            values.Email = "";
            values.Password = "";

        });
    }

    //validation schema constant using YUP--------------------------------------------------------------------------------------------
    const vSchema = Yup.object().shape({
        Email: Yup.string().
            matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "invalid email").
            required("email field cannot be empty!"),
        Password: Yup.string().min(8).required("Password field must not be emmpty")
    })


    //return statement of LoginPage-----------------------------------------------------------------------------------------
    return (
        <div style={{
            height: '83vh'
        }}>

            <Formik
                initialValues={{ Email: "", Password: "" }}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={vSchema}
            >
                {({ values, errors, setFieldValue, handleBlur }) => {
                    //console.log("errors: ", errors);
                    //return statement of Formik-----------------------------------------------
                    return (
                        <Form className='page'>
                            <div className='loginWrapper' style={{
                                border: '2px solid',
                                borderColor: theme.palette.secondary.dark,
                                marginTop: '5%',
                                alignContent: 'center',
                            }}>
                                <div style={{
                                    marginLeft: '35%',
                                    marginTop: '5%',
                                    marginBottom: '5%',
                                    marginRight: '35%',
                                    // height: '350px'
                                }}>
                                    <Typography variant='h2' className='heading2'>
                                        Login
                                    </Typography>

                                    {/* Email and Password textfields */}
                                    <Typography style={{
                                        marginTop: '5%'
                                    }}>
                                        <TextField variant='outlined' label='Email' name='Email'
                                            onChange={(e) => { setFieldValue("Email", e.target.value) }}
                                            onBlur={handleBlur}
                                            value={values.Email}
                                        //error={errors.Password}
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
                                        //error={errors.Password}
                                        />
                                        <FormHelperText error>
                                            <ErrorMessage name='Password' />
                                        </FormHelperText>
                                    </Typography>

                                    {/* Button to submit the values */}
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