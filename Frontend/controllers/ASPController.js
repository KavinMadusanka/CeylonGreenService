import ASPModel from "../models/ASPModel.js";

export const ASPController = async (req,res) => {
    try {
        const {Pname, price} = req.body;
        
        if(!Pname){
            return res.status(400).send({error:'Package Name is Required'});
        }
        if(!price){
            return res.status(400).send({error:'Price is Required'});
        }

        const exisitingCard = await ASPModel.findOne({Pname});

        if(exisitingCard){
            return res.status(200).send({
                success:false,
                message:'This package is alradey added',
            });
        }
        //save
        const spackage = await new ASPModel({
            Pname,
            price,
        }).save();

        res.status(201).send({
            success:true,
            message:'Service Package added Successfully',
            spackage
        });

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Service Package Adding',
            error: error.message
        });
    }
}


//get-all packages
export const getASPController = async (req,res) => {
    try{
        const spackages = await ASPModel.find();
        res.status(200).send({
            success:true,
            message:'All appointments',
            spackages,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting all packages'
        });
    };
};

// get single package
export const getSingleASPSController = async (req,res) => {
    const {id} = req.params;
    try{
        const spackage = await ASPModel.findOne({_id: id});
        res.status(200).send({
            success:true,
            message:'Get single package successfully',
            spackage,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting single package'
        });
    };
};


// update package
export const updateASPController = async (req,res) => {
    try {
        const {Pname} = req.body;
        const {price} = req.body;
        
        const {id} = req.params;
        const spackage = await ASPModel.findByIdAndUpdate(id,{
            Pname,
            price
            }, { new: true });
        res.status(200).send({
            success:true,
            message: "Appointment Updated Successfully",
            spackage,
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


// delete package

export const deleteASPController = async (req,res) => {
    try{
        const {id} = req.params;
        await ASPModel.findByIdAndDelete(id);
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