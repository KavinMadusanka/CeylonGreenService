// userAuthMiddleware.js
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserRegisterModel.js';

export const userAuthMiddleware = async (req, res, next) => {
    // Check if authorization header exists
    if (req.headers.authorization) {
        // Split the authorization header to extract the token
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user information to request object
            req.user = decoded;
            // Move to the next middleware or route handler
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(400).json({ message: 'Authorization required' });
    }
};

export default userAuthMiddleware;
