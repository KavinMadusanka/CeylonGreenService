import UserModel from '../models/UserRegisterModel.js';

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
        return res.status(200).json({ loginDetails });
    } catch (err) {
        return res.status(500).json({ err });
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