import { Button, Card, CardMedia, CardContent, CardActions, TextField, Typography, Select, MenuItem, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import WithAuth from "../services/WithAuth";
import { BookServices } from "../services/BookServices";
import { toast } from "react-toastify";
import { UserInfo } from "./MasterPage";
import { AddToCartService } from "../services/AddToCartService";
import CartContext from "../services/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { theme } from "../CSS assets/theme";
import { useNavigate } from "react-router-dom";



const initialFilter = {
    pageIndex: 1,
    pageSize: 10,
    keyword: ""
}

const ShopPage = () => {
    //------------------------------constants declaration-------------------------------
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [bookResponse, setBookResponse] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 1
    });
    const [filter, setFilters] = useState(initialFilter);
    const userInfo = useContext(UserInfo);
    const cartInfo = useContext(CartContext);
    const [cartVal, setCartVal] = useState(0);
    const navigate = useNavigate();

    //----------------------------------------functions-----------------------------
    //function to get all books
    const getBooks = async (filter) => {
        await BookServices(filter).then(Response => {
            if (Response && Response.status === 200) {
                setBookResponse(Response.data.result)
                //setBooks(bookResponse.items);
            }
        }).catch(() => {
            toast.error("Api call failed!", {
                position: 'bottom-right'
            });
        })
    }

    //Load books at initial rendering
    useEffect(() => {
        getBooks(filter);
        //calcCart();
    }, []);

     useEffect(() => {
        calcCart();
     },[cartInfo]);

    //function to sort the books
    const handleSort = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResponse.items];

        bookList.sort((a, b) => {
            if (a.name < b.name) {
                return e.target.value === "a-z" ? -1 : 1;
            }
            if (a.name > b.name) {
                return e.target.value === "a-z" ? 1 : -1;
            }
            return 0;
        });
        setBookResponse({ ...bookResponse, items: bookList });
    }

    //function to handle search operation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (filter.keyword === "") {
                filter.keyword = "";
            }
            getBooks({ ...filter });
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [filter]);

    //function to handle Add to Cart 
    const addTocart = async (book) => {
        const payload = {
            bookId: book.id,
            userId: userInfo.userId,
            quantity: 1
        }
        await AddToCartService(payload).then((Response) => {
            if (Response && Response.status === 200) {
                toast.success("Book added to cart successfully", { position: 'bottom-right' })
                calcCart();
            }
        }).catch((error) => {
            if(error.response.data.code === 409){
                toast.error("Item already exists in cart!", { position: 'bottom-right' })
            }else{
                toast.error("Add to cart failed!", { position: 'bottom-right' })
            }
            
        })
    }

    //function to calculate total cart items
    const calcCart = () => {
        var total=0;
        //console.log("cartdata: ", cartInfo.cartData);
        if (cartInfo.cartData.length) {
            {
                cartInfo.cartData.map((val) => (
                    total = total + val.quantity
                ))
            }
            setCartVal(total);
        }
    } 

    //--------------------------------------Returning component---------------------------
    return (
        <div className="page">

            {/* -----------this is for search bar ------------------------------------------- */}

            <div style={{
                marginTop: '5%',
                float: 'right',
                color: theme.palette.secondary.dark,
                cursor: 'pointer'
            }}>
                <FaShoppingCart size={30} onClick={() => {
                    cartInfo.updateCart();
                    navigate("/cart-page")}}/>
                    {cartVal}
            </div>

            <div style={{
                marginTop: '5%',
            }}>
                <Typography variant='h2' className='heading2'
                    style={{
                        marginLeft: '40%',
                        color: 'rgb(249, 97, 103)'
                    }}
                >
                    Shop Page
                </Typography>

            </div>

            <div className="loginWrapper" style={{
                //width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                marginTop: '2%'
            }}>
                <Typography variant="h6" style={{ width: '100%' }}>
                    <p style={{
                        float: 'left',
                        //marginTop: '10%',
                        fontSize: '20px'
                    }}>
                        Search the book:
                    </p>
                    <TextField variant="outlined" label="Search the book"
                        name="BookSearch" style={{
                            marginLeft: "10px",
                            width: '55%'
                        }} onChange={(e) => {
                            setFilters({
                                ...filter,
                                keyword: e.target.value,
                                pageIndex: 1
                            })
                        }}
                        value={filter.keyword}
                    />
                </Typography>

            </div>



            {/* -------------this is for total, filter and sort -----------------------------------------*/}
            <div className="loginWrapper" style={{
                width: '92%',
                display: 'flex',
                //alignItems: 'center',
                height: '10%',
                marginLeft: '1.5%',
                marginTop: '1.5%'
            }} >
                <Typography variant="h5" style={{ width: '100%' }}>
                    <p style={{
                        float: 'left',
                        marginTop: '5px',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        Total: {bookResponse.items.length} Books
                    </p>
                    <Select style={{
                        float: 'right',
                        width: '15%',
                        height: '75%',
                        marginRight: '5%'
                    }} onChange={handleSort} value={sortBy}>
                        <MenuItem value='none'>None</MenuItem>
                        <MenuItem value='a-z'>A-Z</MenuItem>
                        <MenuItem value='z-a'>Z-A</MenuItem>
                    </Select>
                    <p style={{
                        marginRight: "5px",
                        marginTop: 10,
                        display: "flex",
                        float: 'right',
                        fontSize: 18
                    }}> Sort:  </p>
                </Typography>

            </div>

            {/* -----------this is for grid of Books ------------------------------------------- */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                width: '100%',

            }} id='div1'>
                {bookResponse.items.map((book, index) => (
                    <Card sx={{
                        width: '200px',
                        maxWidth: '200px',
                        height: '350px',
                        maxHeight: '350px',
                        float: "left",
                        margin: '2%',
                        overflow: 'clip',
                        flexDirection: 'column'
                    }} key={index} raised='true'>
                        <CardMedia
                            component="img"
                            alt={`Image ${index + 1}`}
                            height="100"
                            image={book.base64image}
                        />
                        <CardContent style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // Number of lines to display before truncating
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1,
                            height: '40%'
                        }}>
                            <Typography gutterBottom style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>
                                {book.name}
                            </Typography>
                            <Typography gutterBottom
                                style={{ color: 'gray', fontSize: 14 }}
                            >
                                {book.category}
                            </Typography>

                            <Typography gutterBottom variant="body2" component="div"
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                MRP: &#8377; {book.price}
                            </Typography>


                            <Typography variant="body2" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2, // Number of lines to display before truncating
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                //height: 50
                                flex: 1
                            }}>
                                {book.description}
                            </Typography>
                        </CardContent>
                        <CardActions style={{
                            alignSelf: 'flex-end',
                            marginTop: '10px'
                        }}>
                            <Button size="small" variant="contained" onClick={() => {
                                addTocart(book);
                            }}>
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                marginTop: '5%',

            }}>
                <Pagination
                    count={bookResponse.totalPages}
                    page={filter.pageIndex}
                    onChange={(e, newPage) => {
                        setFilters({ ...filter, pageIndex: newPage });
                    }}
                    style={{
                        marginLeft: '40%'
                    }}
                />
            </div>


        </div>
    )
}

export default WithAuth(ShopPage);