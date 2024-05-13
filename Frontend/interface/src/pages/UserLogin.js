import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import {
    Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography
} from '@mui/material'
import bkImage from '../Images/loginImage.jpg'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

function UserLogin() {
    const navigate = new useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const [auth, setAuth] = useAuth();

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    async function LoginUser() {
        if (formData.userName && formData.password) {
            const loginDetails = {
                userName: formData.userName,
                password: formData.password
            }
            await axios.post('/api/user/getLoginDetails', loginDetails).then((res) => {
                if (formData.userName === res.data.loginDetails[0].email && formData.password === res.data.loginDetails[0].password) {
                    setAuth({
                        ...auth,
                        user: res.data.user,
                        token: res.data.token,
                    });
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate('/homepage2')
                }
            })
        }
    }


    return (
        <Layout>
            <br /><br />
            <Box>
                <center>
                    <Card sx={{ display: 'flex', justifyContent: 'center', width: '80vw',/*  height: '80vh', *//* width: { md: '80vw', xs: '40vw' } */ }}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <img
                                    src={bkImage}
                                    style={{ height: 'auto', width: '100%', objectFit: 'cover', borderRadius: '8px', aspectRatio: '3/2', }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div>
                                    <Typography sx={{ fontSize: '28px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>Welcome to the Ceylon Green Cleaning Service. </Typography>
                                    <br /><br />
                                    <Container maxWidth={false}>
                                        <Formik
                                            initialValues={{
                                                userName: formData.userName,
                                                password: formData.password
                                            }}

                                            validationSchema={
                                                Yup.object().shape({
                                                    userName: Yup.string().required('User Name is required'),
                                                    password: Yup.string().required('Password is required')
                                                })
                                            }

                                            onSubmit={() => LoginUser()}
                                            enableReinitialize
                                        >
                                            {({ errors,
                                                handleBlur,
                                                handleSubmit,
                                                touched
                                            }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <Box mt={0}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={12} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    error={Boolean(touched.userName && errors.userName)}
                                                                    helperText={touched.userName && errors.userName}
                                                                    name='userName'
                                                                    value={formData.userName}
                                                                    placeholder='User Name'
                                                                    variant="standard"
                                                                    color='success'
                                                                    size='small'
                                                                    type='text'
                                                                    onChange={(e) => handleChange(e)}
                                                                />
                                                            </Grid>
                                                            <br /><br /><br />
                                                            <Grid item md={12} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    error={Boolean(touched.password && errors.password)}
                                                                    helperText={touched.password && errors.password}
                                                                    name='password'
                                                                    value={formData.password}
                                                                    id="standard-basic"
                                                                    placeholder='Password'
                                                                    variant="standard"
                                                                    color='success'
                                                                    size='small'
                                                                    onChange={(e) => handleChange(e)}
                                                                />
                                                            </Grid>
                                                            <Grid item md={12} xs={12}>
                                                                <Button
                                                                    variant='contained'
                                                                    type='submit'
                                                                    color='success'
                                                                    size='small'
                                                                >
                                                                    Login
                                                                </Button>
                                                            </Grid>
                                                            <Grid item md={12} xs={12}>
                                                                <Typography>Don't you have any Account?&nbsp;<a href='/userRegister' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Click here</a> </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Container>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </center>
            </Box>
            <br />
        </Layout >
    )
}

export default UserLogin