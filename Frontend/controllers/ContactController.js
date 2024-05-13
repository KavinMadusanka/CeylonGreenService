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

//get all contact
export const getAllContactDetails = async (req, res) => {
    try {
        const allContacts = await ContactModel.find();
        res.status(200).send({ message: 'Success', data: allContacts });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}