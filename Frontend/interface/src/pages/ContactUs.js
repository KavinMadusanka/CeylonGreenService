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


function ContactUs() {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setContactData({
            ...contactData,
            [e.target.name]: value
        })
    }

    function SubmitForm() {
        const saveForm = {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            message: contactData.message
        }

        axios.post('/api/contact/saveMessage', saveForm).then((res) => {
            if (res.data.ID) {
                setContactData({
                    ...contactData,
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
                toast.success("Message sent successfully")
            }
        })
    }


    return (
        <Layout1>
            <br /><br />
            <Box>
                <center>
                    <h2>Contact Us</h2>
                    <Card sx={{ display: 'flex', justifyContent: 'center', width: '80vw' }}>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <h1>hello</h1>
                            </Grid>
                            <Grid item md={6} xs={12} sx={{ padding: '10px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '28px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>Leave a Message</Typography>
                                </Box>
                                <Box S>
                                    <Formik
                                        initialValues={{
                                            name: contactData.name,
                                            email: contactData.email,
                                            phone: contactData.phone,
                                            message: contactData.message
                                        }}

                                        validationSchema={
                                            Yup.object().shape({
                                                name: Yup.string().required('Name is required'),
                                                email: Yup.string().required('email is required')
                                            })
                                        }

                                        onSubmit={() => SubmitForm()}
                                        enableReinitialize

                                    >
                                        {({ errors,
                                            handleBlur,
                                            handleSubmit,
                                            touched
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <Card sx={{ padding: '10px' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.name && errors.name)}
                                                                helperText={touched.name && errors.name}
                                                                name='name'
                                                                value={contactData.name}
                                                                placeholder='Name'
                                                                variant="outlined"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.email && errors.email)}
                                                                helperText={touched.email && errors.email}
                                                                name='email'
                                                                value={contactData.email}
                                                                placeholder='Email'
                                                                variant="outlined"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.phone && errors.phone)}
                                                                helperText={touched.phone && errors.phone}
                                                                name='phone'
                                                                value={contactData.phone}
                                                                placeholder='Phone Number'
                                                                variant="outlined"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.message && errors.message)}
                                                                helperText={touched.message && errors.message}
                                                                name='message'
                                                                value={contactData.message}
                                                                placeholder='Message'
                                                                variant="outlined"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                multiline
                                                                rows={4}
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <Button
                                                                variant='contained'
                                                                color='success'
                                                                type='submit'
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </form>
                                        )}

                                    </Formik>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </center>
            </Box>
        </Layout1>
    )
}

export default ContactUs