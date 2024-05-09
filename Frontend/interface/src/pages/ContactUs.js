//Contact Us

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
import { toast } from 'react-toastify';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HistoryIcon from '@mui/icons-material/History';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';


function ContactUs() {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const navigate = useNavigate();

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

    function navigateTerms() {
        navigate('/privacyPolicy')
    }


    return (
        <Layout1>
            <Box>
                <center>
                    <Box sx={{ padding: '10px 0 10px 0' }}>
                        <Typography sx={{ fontSize: '28px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', color: '#416D19' }}>Contact Us</Typography>
                    </Box>
                    <br />
                    <Card sx={{ display: 'flex', justifyContent: 'center', width: '80vw', paddingLeft: '10px', paddingBottom: '10px' }}>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sx={{ paddingLeft: '10px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '28px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold' }}>Get In Touch</Typography>
                                </Box>
                                <Card sx={{ padding: '10px', }}>
                                    <Grid container spacing={2}>
                                        <Grid item md={3} xs={3} sx={{ display: 'flex' }}>
                                            <LocationOnIcon sx={{ color: 'green' }} />&nbsp;
                                            <Typography>Address</Typography>
                                        </Grid>
                                        <Grid item md={9} xs={9} sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left' }}>
                                            <Typography>No 75, Avissawella Road,Mahabuthgamuwa,Angoda, Wellampitiya,Sri Lanka</Typography>
                                        </Grid>
                                        <Grid item md={3} xs={3} sx={{ display: 'flex' }}>
                                            <PhoneIcon sx={{ color: 'green' }} />&nbsp;
                                            <Typography>Phone</Typography>
                                        </Grid>
                                        <Grid item md={9} xs={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography>0778459987</Typography>
                                        </Grid>

                                        <Grid item md={3} xs={3} sx={{ display: 'flex' }}>
                                            <EmailIcon sx={{ color: 'green' }} />&nbsp;
                                            <Typography>Phone</Typography>
                                        </Grid>
                                        <Grid item md={9} xs={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography>ceylongreenservice@gmail.com</Typography>
                                        </Grid>

                                        <Grid item md={3} xs={3} sx={{ display: 'flex' }}>
                                            <HistoryIcon sx={{ color: 'green' }} />&nbsp;
                                            <Typography>Opening</Typography>
                                        </Grid>
                                        <Grid item md={9} xs={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography>365 days</Typography>
                                        </Grid>
                                        <Grid item md={3} xs={3} sx={{ display: 'flex' }}>
                                            <HourglassFullIcon sx={{ color: 'green' }} />&nbsp;
                                            <Typography>Opening Time</Typography>
                                        </Grid>
                                        <Grid item md={9} xs={9} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                            <Typography>Mon - Fri : 8.00 am - 5.00 pm</Typography>
                                            <Typography>Mon - Fri : 8.00 am - 5.00 pm</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item md={6} xs={12} sx={{ padding: '10px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '28px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold' }}>Leave a Message</Typography>
                                </Box>
                                <Box >
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
                                                                type='number'
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
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
                                    To see the Privacy policy and the Terms and the Conditions of the Ceylon Green Service Cleaning Service
                                </Typography>
                                <Button
                                    variant='contained'
                                    color='success'
                                    onClick={() => navigateTerms()}
                                    size='small'
                                >
                                    Click Here
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </center >
            </Box >
            <br />
        </Layout1 >
    )
}

export default ContactUs