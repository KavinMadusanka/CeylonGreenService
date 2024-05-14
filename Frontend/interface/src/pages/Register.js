import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import {
    Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography
} from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import * as Yup from 'yup';
import userImage from '../Images/user.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = new useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        pNumber: '',
        email: '',
        password: '',
        conPassowrd: ''
    })
    const [img, setImg] = useState();
    console.log("img::> ", img)
    const [isImageUpload, setIsImageUpload] = useState(false);
    const [imgView, seImgView] = useState();



    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        })
    }

    function uploadImage(e) {
        setImg(e.target.files[0]);
        seImgView(URL.createObjectURL(e.target.files[0]));
        setIsImageUpload(true);
    }

    function SubmitForm() {
        if (userData.password === userData.conPassowrd) {
            if (img) {
                const formData = new FormData();
                formData.append("name", userData.name);
                formData.append("address", userData.address);
                formData.append("pNumber", userData.pNumber);
                formData.append("email", userData.email);
                formData.append("password", userData.password);
                formData.append("file", img);

                axios.post('/api/user/registerUser', formData).then((res) => {
                    if (res.data.ID) {
                        setUserData({
                            ...userData,
                            name: '',
                            address: '',
                            pNumber: '',
                            email: '',
                            password: '',
                            conPassowrd: ''
                        })
                        navigate('/userLogin');
                        toast.success("User registration successfull!!");
                    }
                })
            } else {
                toast.error("Enter a profile Image!!")
            }
        } else {
            toast.error("Please check the Password!!")
        }
    }

    function ClearForm() {
        setUserData({
            ...userData,
            name: '',
            address: '',
            pNumber: '',
            email: '',
            password: '',
            conPassowrd: ''
        })
    }


    return (
        <Layout>
            <br /><br />
            <Box sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <center>
                    <Card sx={{ width: '80vw', paddingTop: '10px', paddingBottom: '10px'/*  height: '80vh', *//* width: { md: '80vw', xs: '40vw' } */ }}>
                        <Typography sx={{ fontSize: '28px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>Welcome to the Ceylon Green Cleaning Service. </Typography>
                        <br /><br />
                        <Container >
                            <Formik
                                initialValues={{
                                    name: userData.name,
                                    address: userData.address,
                                    pNumber: userData.pNumber,
                                    email: userData.email,
                                    password: userData.password,
                                    conPassowrd: userData.conPassowrd
                                }}

                                validationSchema={
                                    Yup.object().shape({
                                        name: Yup.string().matches(/^[^!@#$%^&*()_+]*$/, 'Name cannot contain special characters like ! @ # $ % ^ & * ( ) _ +')
                                            .matches(/^[A-Za-z ]*$/, 'Name must contain only alphabet letters and spaces').required('Name is required'),
                                        address: Yup.string().required('Address is required'),
                                        pNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
                                        email: Yup.string()
                                            .email('Invalid email address')
                                            .matches(
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                'Invalid email address'
                                            )
                                            .required('Email is required'),
                                        password: Yup.string().required('Password is required')
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
                                        <Box >
                                            <Grid container spacing={2} >
                                                <Grid item md={6} xs={12} >
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} xs={12}>

                                                            {isImageUpload ?
                                                                <>
                                                                    <img
                                                                        src={imgView}
                                                                        width='100vw'
                                                                        height='100vh'
                                                                    />
                                                                </>
                                                                :
                                                                <>
                                                                    <img
                                                                        src={userImage}
                                                                        width='100vw'
                                                                        height='100vh'
                                                                    />
                                                                </>
                                                            }

                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <input
                                                                type='file'
                                                                accept='image/*'
                                                                onChange={(e) => uploadImage(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.name && errors.name)}
                                                                helperText={touched.name && errors.name}
                                                                name='name'
                                                                value={userData.name}
                                                                label='Name'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.address && errors.address)}
                                                                helperText={touched.address && errors.address}
                                                                name='address'
                                                                value={userData.address}
                                                                label='Address'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={6} xs={12} >
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.pNumber && errors.pNumber)}
                                                                helperText={touched.pNumber && errors.pNumber}
                                                                name='pNumber'
                                                                value={userData.pNumber}
                                                                label='Phone Number'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.email && errors.email)}
                                                                helperText={touched.email && errors.email}
                                                                name='email'
                                                                value={userData.email}
                                                                label='Email Address'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.password && errors.password)}
                                                                helperText={touched.password && errors.password}
                                                                name='password'
                                                                value={userData.password}
                                                                label='Password'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                error={Boolean(touched.conPassowrd && errors.conPassowrd)}
                                                                helperText={touched.conPassowrd && errors.conPassowrd}
                                                                name='conPassowrd'
                                                                value={userData.conPassowrd}
                                                                label='Confirm Password'
                                                                variant="standard"
                                                                color='success'
                                                                size='small'
                                                                type='text'
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid item md={12} xs={12}>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    size='small'
                                                    sx={{ width: '10vw' }}
                                                    onClick={ClearForm}
                                                >
                                                    Clear
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    variant='contained'
                                                    type='submit'
                                                    color='success'
                                                    size='small'
                                                    sx={{ width: '10vw' }}
                                                >
                                                    Register
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </form>
                                )}

                            </Formik>
                        </Container>
                    </Card>
                </center>
            </Box>
            <br />
        </Layout>
    )
}

export default Register