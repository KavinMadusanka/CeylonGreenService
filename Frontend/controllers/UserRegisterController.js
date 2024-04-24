import UserModel from '../models/UserRegisterModel.js';
import JWT from 'jsonwebtoken';


//save a user
export const AddUser = async (req, res) => {
    const {
        name,
        address,
        pNumber,
        email,
        password
    } = req.body

    try {
        const image = req.files.file;
        const uploadImage = new Date().getTime();
        await image.mv("Assets/ProfilePicture/" + `${uploadImage}.jpg`, (err) => {
            console.log("An Error occured in saving the image ", err);
        })

        const userRegister = new UserModel({
            name,
            address,
            pNumber,
            email,
            password,
            image: `${uploadImage}.jpg`
        })

        return await userRegister.save().then((value) => {
            res.status(200).json({ ID: value._id });
        }).catch((err) => {
            res.status(500).json({ err })
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

//check username and password
export const CheckUserDetails = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    try {
        const loginDetails = await UserModel.find({ email: userName, password: password });
        // create token
        // const token = await JWT.sign({ _id: loginDetails._id }, process.env.JWT_SECRET, {expiresIn: "7d",});
        //     res.status(200).send({
        //     success:true,
        //     message:'login successfully',
        //     user:{
        //         name: loginDetails.name,
        //         email: loginDetails.email,
        //         phone: loginDetails.phone,
        //         address: loginDetails.address,
        //     },
        //     token,
        // });
        if (loginDetails.length === 0) {
            // Login failed - user not found or incorrect password
            return res.status(401).json({ message: 'Invalid username or password' });
          }
          // Login successful - generate JWT token
            const token = await JWT.sign({ _id: loginDetails[0]._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            const user = {
            _id: loginDetails[0]._id,
            name: loginDetails[0].name,
            email: loginDetails[0].email,
            address: loginDetails[0].address,
            pNumber: loginDetails[0].pNumber,
            role: loginDetails[0].role,
            // Include other user details as needed
            };

            return res.status(200).json({
            loginDetails,
            success: true,
            message: 'Login successful',
            user,
            token,
            });
        return res.status(200).json({ loginDetails });
    } catch (err) {
        return res.status(500).json({
            success:false,
            message: 'login Failed',
            err,
        });
    }
}

//get all users
export const GetUsers = async (req, res) => {
    try {
        const UserDeatils = await UserModel.find();
        return res.status(200).json({ UserDeatils });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

export const DeleteUser = async (req, res) => {
    const id = req.params.deleteID;
    await UserModel.findByIdAndDelete(id).then(() => {
        res.status(200).send({ message: 'Success' });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    })
}