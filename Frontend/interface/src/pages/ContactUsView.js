import React, { useEffect, useState, useRef } from 'react'
import {
    Box, Button, Card, CardContent, Container, Dialog, DialogContent, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, TextField, Typography
} from '@mui/material'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ContactDetailsView from '../components/ContactDetailsView';
import ReactToPrint from 'react-to-print';
import Layout1 from '../components/Layout/Layout1'

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

function ContactUsView() {
    const compnentRef = useRef();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [allContact, setAllContact] = useState([]);
    const [searchContact, setSearchContact] = useState("");


    useEffect(() => {
        GetAllContactDEtails();
    }, [])

    function GetAllContactDEtails() {
        axios.get('/api/contact/getContact').then((res) => {
            if (res.data.message) {
                setAllContact(res.data.data);
            }
        })
    }
    console.log("allContact::> ", allContact)

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allContact.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Layout1>
                <br /><br />
                <center>
                    <h2>All Contact Details</h2>
                    <Card sx={{ display: 'flex', justifyContent: 'center', width: '80vw',/*  height: '80vh', *//* width: { md: '80vw', xs: '40vw' } */ }}>
                        <br />
                        <TableContainer>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
                                <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold', color: 'red' }}>No of messages: {allContact.length}</Typography>
                                </div>
                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    variant="standard"
                                    value={searchContact}
                                    placeholder='Search user details'
                                    onChange={(e) => { setSearchContact(e.target.value) }}
                                />
                            </Box>
                            <br />
                            <Table>
                                <TableRow>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>#</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Message</TableCell>
                                </TableRow>
                                <TableBody>
                                    {
                                        (rowsPerPage > 0
                                            ? allContact.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : allContact
                                        ).filter((element) => {
                                            if (searchContact === "") {
                                                return element;
                                            } else if ((element.name.toLowerCase()).includes(searchContact.toLowerCase())) {
                                                return element;
                                            } else if ((element.email.toLowerCase()).includes(searchContact.toLowerCase())) {
                                                return element;
                                            }
                                        }).map((row, i) => (
                                            <TableRow key={row._id}>
                                                <TableCell align='center' >{i + 1}</TableCell>
                                                <TableCell align='center' >{row.name}</TableCell>
                                                <TableCell align='center' >{row.phone}</TableCell>
                                                <TableCell align='center' >{row.email}</TableCell>
                                                <TableCell align='center' >{row.message}</TableCell>
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
                                            count={allContact.length}
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
                    </Card>
                    <div hidden={true}>
                        <ContactDetailsView
                            ref={compnentRef}
                            allContact={allContact}
                        />
                    </div>
                </center >
                <br />
            </Layout1 >
        </>
    )
}

export default ContactUsView