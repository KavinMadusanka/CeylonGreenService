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
        // if(!comments){
        //     return res.status(400).send({error:'Comment is Required'});
        // }
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
            userId,
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


// update appointment
export const updateAppointmentController = async (req,res) => {
    try {
        const {fullName} = req.body;
        const {address} = req.body;
        const {phoneNumber} = req.body;
        const {email} = req.body;
        const {servicePackage} = req.body;
        const {comments} = req.body;
        const {selectedDate} = req.body;
        const {selectedTime} = req.body;
        //const {userId} = req.body;
        const {id} = req.params;
        const appointment = await appointmentModel.findByIdAndUpdate(id,{
            fullName,
            address,
            phoneNumber,
            email,
            servicePackage,
            comments,
            selectedDate,
            selectedTime,
            }, { new: true });
        res.status(200).send({
            success:true,
            message: "Appointment Updated Successfully",
            appointment,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating appointment'
        })
    }
};



// getall appointment
export const getAppointmentController = async (req,res) => {
    const {id} = req.params;
    try{
        const appointments = await appointmentModel.find({userId: id});
        res.status(200).send({
            success:true,
            message:'All appointments',
            appointments,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting all appointments'
        });
    };
};


// single appointment
export const singleAppointmentController = async (req,res) => {
    const {id} = req.params;
    try{
        const appointment = await appointmentModel.findOne({_id: id})
        res.status(200).send({
            success:true,
            message:'Get single appointment successfully',
            appointment,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single appointment'
        });
    }
};



// delete appointment

export const deleteAppointmentController = async (req,res) => {
    try{
        const {id} = req.params;
        await appointmentModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Appointment deleted successfully',
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while deleting appointment',
            error
        });
    }
};


// Download PDF for an appointment
export const downloadPDFController = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await appointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: 'Appointment not found',
            });
        }
        // Assume the appointment has a PDF file path stored in appointment.pdfPath
        const pdfPath = appointment.pdfPath;
        // Read the PDF file as binary data
        const pdfData = fs.readFileSync(pdfPath);
        res.contentType('application/pdf');
        res.send(pdfData);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting appointment PDF',
        });
    }
};