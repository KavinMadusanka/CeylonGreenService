import ContactModel from "../models/ContactModel.js";

//save contact
export const SaveMessage = async (req, res) => {
    const {
        name,
        email,
        phone,
        message,
    } = req.body;

    try {
        const messageDetails = new ContactModel({
            name,
            email,
            phone,
            message,
        })

        return await messageDetails.save().then((value) => {
            res.status(200).json({ ID: value._id });
        }).catch((err) => {
            res.status(500).json({ err });
        })

    } catch (err) {
        res.status(500).json({ err })
    }

}