import React, { useEffect, useState, useRef } from 'react'
import {
    Box, Button, Card, CardContent, Container, Dialog, DialogContent, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, TextField, Typography
} from '@mui/material'
import bkImage from '../Images/loginImage.jpg'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Layout1 from '../components/Layout/Layout1'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import ReactToPrint from 'react-to-print';
import UserDEtailsPDF from '../components/UserDEtailsPDF';
import { toast } from 'react-toastify';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function UserManagement() {
    const compnentRef = useRef();
    const [allUSers, setAllUsers] = useState([]);
    console.log("allUSers::> ", allUSers)
    const [imageOpen, setImageOpen] = useState(false);
    const [viewPPic, setViewPPic] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [searchDevice, setSearchDevice] = useState("");

    useEffect(() => {
        GetAllUSerDeatils();
    }, [])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUSers.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function GetAllUSerDeatils() {
        axios.get('api/user/getUserDeatails').then((res) => {
            if (res.data.UserDeatils.length >= 0) {
                console.log(res.data.UserDeatils)
                setAllUsers(res.data.UserDeatils);
            }
        })
    }

    function ViewImage(pPic) {
        setViewPPic(pPic);
        setImageOpen(true);
    }

    function CloseDialog() {
        setViewPPic();
        setImageOpen(false);
    }

    function DeleteUser(deleteID) {
        const deleteUSer = {
            deleteID: deleteID
        }
        console.log("deleteUSer::> ", deleteUSer)
        axios.delete(`api/user/deleteUser/${deleteID}`).then((res) => {
            if (res.data.message === 'Success') {
                toast.success("User Deleted Successfully!!")
                GetAllUSerDeatils();
            }
        })
    }

    return (
        <Layout1>
            <br /><br />
            <Box>
                <center>
                    <h2>User Management</h2>
                    <Card sx={{ display: 'flex', justifyContent: 'center', width: '80vw',/*  height: '80vh', *//* width: { md: '80vw', xs: '40vw' } */ }}>
                        <br />
                        <TableContainer>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    variant="standard"
                                    value={searchDevice}
                                    placeholder='Search user details'
                                    onChange={(e) => { setSearchDevice(e.target.value) }}
                                />
                            </Box>
                            <br />
                            <Table>
                                <TableRow>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>#</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Home Address</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Profile Picture</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? allUSers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : allUSers
                                    ).filter((element) => {
                                        if (searchDevice === "") {
                                            return element;
                                        } else if ((element.name.toLowerCase()).includes(searchDevice.toLowerCase())) {
                                            return element;
                                        } else if ((element.email.toLowerCase()).includes(searchDevice.toLowerCase())) {
                                            return element;
                                        } else if ((element.address.toLowerCase()).includes(searchDevice.toLowerCase())) {
                                            return element;
                                        }
                                    }).map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell align='center'>{i + 1}</TableCell>
                                            <TableCell align='center'>{row.name}</TableCell>
                                            <TableCell align='center'>{row.address}</TableCell>
                                            <TableCell align='center'>{row.pNumber}</TableCell>
                                            <TableCell align='center'>{row.email}</TableCell>
                                            <TableCell align='center'>
                                                <IconButton onClick={() => ViewImage(row.image)}>
                                                    <RemoveRedEyeIcon sx={{ color: 'black' }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton>
                                                    <EditIcon sx={{ color: 'black' }} />
                                                </IconButton>
                                                &nbsp;
                                                <IconButton >
                                                    <DeleteIcon sx={{ color: 'black' }} onClick={() => DeleteUser(row._id)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={7}
                                            count={allUSers.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                },
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            {/* User detail ptint */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                                <ReactToPrint
                                    documentTitle={'All user Details'}
                                    trigger={() => (
                                        <Button
                                            color='success'
                                            variant='contained'
                                            size='small'
                                        >
                                            PDF Download
                                        </Button>
                                    )}
                                    content={() => compnentRef.current}
                                />
                            </Box>
                        </TableContainer>


                        {/* image preview dialog */}
                        <Dialog open={imageOpen}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingTop: "1vh",
                                    paddingRight: "1vw",
                                }}
                            >
                                <IconButton>
                                    <CancelIcon
                                        sx={{ color: "red", fontSize: "2vw" }}
                                        onClick={CloseDialog}
                                    />
                                </IconButton>
                            </Box>
                            <DialogContent>
                                <Card
                                    style={{
                                        height: 400,
                                        width: 300,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`http://localhost:8000/assets/profilepicture/${viewPPic}`}
                                        height="100%"
                                        width="auto"
                                    />
                                </Card>
                            </DialogContent>
                        </Dialog>

                        <div hidden={true}>
                            <UserDEtailsPDF
                                ref={compnentRef}
                                allUSers={allUSers}
                            />
                        </div>
                    </Card>
                </center>
            </Box>
            <br />
        </Layout1>
    )
}

export default UserManagement