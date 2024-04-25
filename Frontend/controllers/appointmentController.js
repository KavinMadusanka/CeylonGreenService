import appointmentModel from "../models/appointmentModel.js";

export const appointmentController = async (req,res) => {
    try {
        const {fullName,address,phoneNumber,email,comments,servicePackage,selectedDate,selectedTime,userId} = req.body;
        
        // console.log(req.body); // Log the request body for debugging
        
        //validation
        if(!fullName){
            return res.status(400).send({error:'Name is Required'});
        }
        if(!address){
            return res.status(400).send({error:'Address is Required'});
        }
        if(!phoneNumber){
            return res.status(400).send({error:'Phone Number is Required'});
        }
        if(!email){
            return res.status(400).send({error:'Email is Required'});
        }
        if(!comments){
            return res.status(400).send({error:'Comment is Required'});
        }
        if(!servicePackage){
            return res.status(400).send({error:'Service Package is Required'});
        }
        if(!selectedDate){
            return res.status(400).send({error:'Date is Required'});
        }
        if(!selectedTime){
            return res.status(400).send({error:'Time is Required'});
        }
        if(!userId){
            return res.status(400).send({error:'userId is Required'});
        }

        //save
        const appointment = await new appointmentModel({
            fullName,
            address,
            phoneNumber,
            email,
            comments,
            servicePackage,
            selectedDate,
            selectedTime,
            userId
        }).save();

        res.status(201).send({
            success:true,
            message:'Appointment sent Successfully',
            appointment
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Appointment Making',
            error: error.message
        });
    }
};
