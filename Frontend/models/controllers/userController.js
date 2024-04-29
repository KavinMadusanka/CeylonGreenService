import User from '../models/userModel.js';

// Create a new user
export const createUserController = async (req, res) => {
    try {
        const { name, email, ...rest } = req.body;
        const newUser = new User({ name, email, ...rest });
        await newUser.save();
        res.status(201).send({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error creating user', error });
    }
};

// Get all users
export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ success: true, message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error retrieving users', error });
    }
}