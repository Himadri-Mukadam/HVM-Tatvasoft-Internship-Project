//This page contains Navigation bar and routing information

import '../CSS assets/MyStyle.css';
import { Route, Routes, BrowserRouter, Link, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import { AddBooks } from './AddBook';
import { LoginPage } from './LoginPage';
import { NotFound } from './NotFound';
import { Footer } from './Footer';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../CSS assets/theme';
import { commonStyles } from '../CSS assets/commonStyles';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { SignupPage } from './SignupPage';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//import axios from 'axios';
import logo from '../logo.svg';
import Cookies from 'js-cookie';
import Booklisting from './Booklisting';
import { EditBook } from './EditBook';
import UserListing from './UserListing';
import { EditUsers } from './EditUsers';
import CategoryList from './CategoryList';
import { AddCategory } from './AddCategory';
import { EditCategory } from './EditCategory';
import { UpdateProfile } from './UpdateProfile';
import { CartWrapper } from '../services/CartContext';
import { CartPage } from './CartPage';



export const UserInfo = React.createContext();

function MasterPage() {
    //const [sessionId, setSessionId] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userDetails, setUserDetails] = React.useState({
        userID: "",
        userName: "",
        userEmail: "",
        userRole: ""
    });
    //const navigate = useNavigate();

    const setThroughSignup = (id, email, name, roleId) => {
        // setSessionId(id);
        setUserDetails({
            userName: name,
            userEmail: email,
            userID: id,
            userRole: roleId
        });
    }

    //function that handles the click event on profile
    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
        // if(sessionId !== 0){
        //     await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${sessionId}`).
        //     then((response) => {
        //         setUserDetails({
        //             userName: response.data.result.firstName,
        //             userEmail: response.data.result.email
        //         });
        //     }).catch(() => {
        //         alert("Error in axios get");
        //     })
        // }
        // else{
        //     //navigate('/login');
        //     //document.getElementById('btn_logout').style.display = "none";
        // }

    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = userDetails.userID ? Boolean(anchorEl) : false;
    const id = open ? 'simple-popover' : undefined;

    //function that handles the logout process
    const handleLogout = () => {
        setUserDetails({
            userName: "",
            userEmail: "",
            userID: "",
            userRole: ""
        });
        Cookies.remove("auth_email");
        setAnchorEl(null);
        toast.success("You have successfully logged out", {
            position: "bottom-right"
        })
    }




    if (userDetails.userID === '') {
        Cookies.remove("auth_email");
        // document.getElementById('#home_elems').style.display = 'none';
        // document.getElementById('#login_elems').style.display = 'block';
    }

    const email_id = Cookies.get("auth_email") ? Cookies.get("auth_email") : "";
    // if(email_id !== ""){
    //     console.log(email_id);
    // } else {
    //     console.log("Hi Rani")
    // }

    const classes = commonStyles();
    return (
        <>
            <UserInfo.Provider value={{
                userName: userDetails.userName,
                userEmail: userDetails.userEmail,
                userId: userDetails.userID,
                userRoleId: userDetails.userRole
            }}>
                <CartWrapper>
                    <div className={classes.page_wrapper}>
                        <ThemeProvider theme={theme}>
                            <BrowserRouter>         {/* Shows the navigation bar.*/}
                                <ToastContainer />
                                <div className='nav'>
                                    <Typography style={{ float: 'left' }}>
                                        <img src={logo} style={{
                                            height: '45px',
                                            width: '70px',
                                            float: 'left',
                                        }} alt="logo" />
                                        {email_id !== "" && (
                                            <>
                                                <Link to="/" className='list_element'>
                                                    Home
                                                </Link>
                                                {userDetails.userRole === 3 && (
                                                    <Link to="/shop" className='list_element'>
                                                        Shop
                                                    </Link>
                                                )}
                                                {userDetails.userRole === 2 && (
                                                    <>
                                                        <Link to="/booklist" className='list_element'>
                                                            Books
                                                        </Link>
                                                        <Link to="/userlist" className='list_element'>
                                                            Users
                                                        </Link>
                                                        <Link to="/categories" className='list_element'>
                                                            Categories
                                                        </Link>
                                                    </>
                                                )}

                                                <Link to="/about" className='list_element'>
                                                    About Us
                                                </Link>
                                            </>

                                        )}
                                        {email_id === "" && (
                                            <>
                                                <Link to="/login" className='list_element'>
                                                    Login
                                                </Link>
                                                <Link to="/signup" className='list_element'>
                                                    Signup
                                                </Link>
                                            </>
                                        )}


                                        {/* {handleDisplay()} */}
                                        {/* <Linking /> */}


                                    </Typography>

                                    <FaUser variant='contained' style={{
                                        float: "right",
                                        padding: 10,
                                        cursor: 'pointer'
                                    }} className='button' onClick={handleClick} />

                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        style={{ display: 'block', zIndex: '10000' }}
                                    >
                                        <FaUser style={{ padding: 5, float: 'left' }} />
                                        <Typography style={{
                                            padding: 5
                                        }}>{userDetails.userName}</Typography>
                                        <FaEnvelope style={{ padding: 5, float: 'left' }} />
                                        <Typography style={{
                                            padding: 5
                                        }}>{userDetails.userEmail}</Typography>
                                        <Button variant='contained' style={{
                                            // backgroundColor: theme.palette.primary.main,
                                            padding: 5,
                                            margin: 5,
                                            backgroundColor: theme.palette.secondary.dark,
                                            color: theme.palette.text.white,
                                        }} onClick={handleLogout} >
                                            Logout
                                        </Button>
                                        <Button variant='contained' style={{
                                            // backgroundColor: theme.palette.primary.main,
                                            padding: 5,
                                            margin: 5,
                                            backgroundColor: theme.palette.secondary.dark,
                                            color: theme.palette.text.white,
                                        }} onClick={() => { setAnchorEl(null); }}>
                                            <Link to={`/update-profile/${userDetails.userID}`}
                                                style={{
                                                    color: 'white',
                                                    textDecoration: 'none'
                                                }}
                                            >Update</Link>
                                        </Button>
                                    </Popover>
                                </div>



                                <Routes>        {/* To map the navigation */}

                                    <Route path="/" element={< HomePage />} />
                                    <Route path="/shop" element={< ShopPage />} />
                                    <Route path="/booklist" element={< Booklisting />} />
                                    <Route path="/userlist" element={< UserListing />} />
                                    <Route path="/categories" element={< CategoryList />} />
                                    <Route path="/login" element={< LoginPage setThroughSignup={setThroughSignup} />} />
                                    <Route path="/signup" element={< SignupPage setThroughSignup={setThroughSignup} />} />
                                    <Route path="*" element={< NotFound />} />

                                    <Route path="/add-new" element={< AddBooks />} />
                                    <Route path="/edit-books/:id" element={<EditBook />} />
                                    <Route path="/edit-users/:id" element={<EditUsers />} />
                                    <Route path="/add-new-category" element={< AddCategory />} />
                                    <Route path="/edit-category/:id" element={<EditCategory />} />
                                    <Route path="/update-profile/:id" element={<UpdateProfile />} />
                                    <Route path="/cart-page" element={< CartPage />} />

                                </ Routes>

                            </BrowserRouter>
                        </ThemeProvider>


                        <Footer />

                    </div>
                </CartWrapper>


            </UserInfo.Provider>

        </>
    );
}


export default MasterPage;