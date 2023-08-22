//This page is only visible to admins of the site

import { Button, TextField, Typography, Select, MenuItem, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import WithAuth from "../services/WithAuth";
import { CategoryServices } from "../services/CategoryServices";
import { toast } from "react-toastify";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryServices2 } from "../services/CategoryServices2";
import { useNavigate } from "react-router-dom";
import { DeleteCategory } from "../services/DeleteCategory";
import { theme } from "../CSS assets/theme";


const initialFilter = {
    pageIndex: 1,
    pageSize: 10,
    keyword: ""
}

const CategoryList = () => {
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
    const navigate = useNavigate();

    //----------------------------------------functions-----------------------------
    //function to get books
    const getBooks = async (filter) => {
        await CategoryServices(filter).then(Response => {
            if (Response && Response.status === 200) {
                setBookResponse(Response.data.result)
            }
        }).catch(() => {
            toast.error("Api call failed!", {
                position: 'bottom-right'
            });
        })
    }

    //function to get all books
    const getAllBooks = async () => {
        await CategoryServices2().then((Response) => {
            setBooks(Response.data.result);
        }).catch(() => {
            toast.error("CategorySerivce2 failed", { position: 'bottom-right' });
        })
    }

    //Load books at initial rendering
    useEffect(() => {
        getAllBooks();
        getBooks(filter);
    }, []);

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
            getBooks(filter);
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [filter])


    //function to handle delete operation
    const handleDelete = async (rId) => {
        console.log(Number(rId));
        await DeleteCategory(Number(rId)).then((Response) => {
            if (Response && Response.status === 200) {
                toast.success("Category deleted successfully", { position: 'bottom-right' });
                getBooks(filter);
            }
        }).catch(() => {
            toast.error("Category can't be deleted", { position: 'bottom-right' })
        })
    }

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'name', headerName: 'Name' },
        { field: 'edit', headerName: 'Edit' },
        { field: 'delete', headerName: 'Delete' }
    ]


    //--------------------------------------Returning component---------------------------
    return (
        <div className="page">

            {/* -----------this is for search bar ------------------------------------------- */}
            <div style={{
                marginTop: '5%',
            }}>
                <Typography variant='h2' className='heading2'
                    style={{
                        marginLeft: '39%',
                        color: theme.palette.primary.main
                    }}
                >
                    Category List
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
                        Search the category:
                    </p>
                    <TextField variant="outlined" label="Search the category"
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



            {/* -------------this is for total and sort -----------------------------------------*/}
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
                        Total: {bookResponse.items.length} Categories
                    </p>

                    <Button className="btnLogin" style={{
                        float: 'right',
                        //width: 50
                    }} onClick={() => { navigate("/add-new-category") }}>
                        Add new
                    </Button>
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
                display: 'container',

            }} id='div1'>

                <TableContainer component={Paper}>
                    <Table sx={{
                        minWidth: 650,
                        border: '1px solid black'
                    }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell key={col.field} style={{
                                        fontWeight: 'bold',
                                        fontSize: 16
                                    }}>
                                        {col.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookResponse.items.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{row.id} </TableCell>
                                        <TableCell>{row.name} </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" disableElevation
                                                style={{
                                                    borderColor: 'rgb(28, 155, 42)'
                                                }} onClick={() => { navigate(`/edit-category/${row.id}`) }}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" disableElevation
                                                style={{
                                                    color: '#20525C',
                                                    borderColor: 'rgb(28, 155, 42)'
                                                }} onClick={() => { handleDelete(row.id) }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPage={filter.pageSize}
                    component="div"
                    rowsPerPageOptions={[5, 10, 20]}
                    page={filter.pageIndex - 1}
                    onPageChange={(e, newpage) => {
                        setFilters({ ...filter, pageIndex: newpage + 1 });
                    }}
                    // onRowsPerPageChange={(e, newvalue) => {
                    //     setFilters({...filter, pageSize: newvalue});
                    // }}
                    count={books.length}
                />

            </div>
        </div>
    )
}

export default WithAuth(CategoryList);
