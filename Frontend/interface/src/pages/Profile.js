import React, { useEffect, useState } from 'react'
import Layout1 from './../components/Layout/Layout1';
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, } from '@mui/material';
import { Formik } from 'formik'
import * as Yup from "yup";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';

const Profile = () => {
  const [userID, setUserID] = useState();
  const [image, setImage] = useState();
  const [user, setUser] = useState({
    name: '',
    address: '',
    pNumber: '',
    email: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setUserID(JSON.parse(auth).loginDetails[0]._id);
    setImage(JSON.parse(auth).loginDetails[0].image);
  }, [])

  useEffect(() => {
    if (userID) {
      getUserDetailsByID();
    }
  }, [userID])

  function getUserDetailsByID() {
    axios.get(`/api/user/getUserDetailsByID/${userID}`).then((res) => {
      if (res.data.UserDetails.length > 0) {
        setUser({
          ...user,
          name: res.data.UserDetails[0].name,
          address: res.data.UserDetails[0].address,
          pNumber: res.data.UserDetails[0].pNumber,
          email: res.data.UserDetails[0].email
        })
      }
    })
  }

  function updateEnable() {
    setIsUpdate(true);
  }

  function handleChange(e) {
    const target = e.target;
    const value = target.value;
    setUser({
      ...user,
      [e.target.name]: value
    })
  }

  async function UpdateUserDetails() {
    const updateModel = {
      name: user.name,
      address: user.address,
      pNumber: user.pNumber,
      updateUserID: userID
    }
    await axios.put('/api/user/UpdateUser', updateModel).then((res) => {
      if (res.data.status == "Success") {
        getUserDetailsByID();
        setIsUpdate(false);
      }
    })
  }

  return (
    <Layout1 title={'Profile - Ceylon Green'}>
      <br />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <Card sx={{ width: '60%' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>Welcome, {user.name}</h2>
              &nbsp;&nbsp;&nbsp;
              <div>
                <IconButton onClick={updateEnable}>
                  <BorderColorIcon sx={{ color: 'black' }} />
                </IconButton>
              </div>
            </div>

            <Formik
              initialValues={{
                name: user.name,
                address: user.address,
                pNumber: user.pNumber,
                email: user.email,
              }}

              validationSchema={
                Yup.object().shape({
                  name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabet letters and spaces').required('Name is required'),
                  address: Yup.string().required('address is required'),
                  pNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
                })
              }
              onSubmit={() => UpdateUserDetails()}
              enableReinitialize
            >

              {({
                errors,
                handleBlur,
                handleSubmit,
                touched
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={`http://localhost:8000/assets/profilePicture/${image}`}
                        height='auto'
                        width='150px'
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        label="User Name *"
                        name='name'
                        value={user.name}
                        id='name'
                        variant="outlined"
                        size="small"
                        type='text'
                        color='success'
                        inputProps={{
                          readOnly: !isUpdate
                        }}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                        label="Address *"
                        name='address'
                        value={user.address}
                        id='address'
                        variant="outlined"
                        size="small"
                        type='text'
                        color='success'
                        inputProps={{
                          readOnly: !isUpdate
                        }}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        error={Boolean(touched.pNumber && errors.pNumber)}
                        helperText={touched.pNumber && errors.pNumber}
                        label="Phone Number *"
                        name='pNumber'
                        value={user.pNumber}
                        id='pNumber'
                        variant="outlined"
                        size="small"
                        type='text'
                        color='success'
                        inputProps={{
                          readOnly: !isUpdate
                        }}
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        label="Email *"
                        name='email'
                        value={user.email}
                        id='email'
                        variant="outlined"
                        size="small"
                        type='text'
                        color='success'
                        inputProps={{
                          readOnly: 'true'
                        }}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      {isUpdate ?
                        <Button
                          variant="contained"
                          size='small'
                          fullWidth
                          type='submit'
                          color='success'
                        >
                          Update
                        </Button>
                        : null}
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>

      <br />
    </Layout1 >
  )
}

export default Profile;