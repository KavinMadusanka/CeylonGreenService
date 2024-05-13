import express from 'express';
import { AddUser, CheckUserDetails, GetUsers, DeleteUser, UpdateUser, GetUserDetailsByID } from '../controllers/UserRegisterController.js';

const UserRouter = express.Router();

//app user
UserRouter.post('/registerUser', AddUser);

//chekc logion details
UserRouter.post('/getLoginDetails', CheckUserDetails);

//get all users
UserRouter.get('/getUserDeatails', GetUsers);

//delete user
UserRouter.delete('/deleteUser/:deleteID', DeleteUser);

//updateUser
UserRouter.put('/UpdateUser', UpdateUser);

//get user details by ID
UserRouter.get('/getUserDetailsByID/:userID', GetUserDetailsByID);


export default UserRouter;
