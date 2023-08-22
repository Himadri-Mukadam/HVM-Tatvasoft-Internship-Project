//This page is only visible to admins of the site

import { Button, TextField, Typography, Select, MenuItem, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import WithAuth from "../services/WithAuth";
import { UserServices } from "../services/UserServices";
import { toast } from "react-toastify";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { theme } from "../CSS assets/theme";
import { UserServices2 } from "../services/UserServices2";
import { DeleteUser } from "../services/DeleteUser";


const initialFilter = {
    pageIndex: 1,
    pageSize: 10,
    keyword: ""
}

const UserListing = () => {
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
        await UserServices(filter).then(Response => {
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
        await UserServices2().then((Response) => {
            setBooks(Response.data.result);
        }).catch(() => {
            toast.error("Bookservice2 failed", { position: 'bottom-right' });
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
        await DeleteUser(Number(rId)).then((Response) => {
            if (Response && Response.status === 200) {
                toast.success("User Profile deleted successfully", { position: 'bottom-right' });
                getBooks(filter);
            }
        }).catch(() => {
            toast.error("User profile can't be deleted", { position: 'bottom-right' })
        })
    }

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'firstname', headerName: 'First Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'role', headerName: 'Role' },
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
                        marginLeft: '43%',
                        color: theme.palette.primary.main
                    }}
                >
                    User List
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
                        Search the user:
                    </p>
                    <TextField variant="outlined" label="Search the user"
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
                        Total: {bookResponse.items.length} Users
                    </p>
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
                                        <TableCell>{row.firstName} </TableCell>
                                        <TableCell>{row.lastName} </TableCell>
                                        <TableCell>{row.email} </TableCell>
                                        <TableCell>{row.role} </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" disableElevation
                                                style={{
                                                    borderColor: 'rgb(28, 155, 42)'
                                                }} onClick={() => { navigate(`/edit-users/${row.id}`) }}
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

export default WithAuth(UserListing);