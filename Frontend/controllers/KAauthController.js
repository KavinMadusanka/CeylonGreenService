import KAcardmodel from "../models/KAcardmodel.js";
import KAdeliveryaddress from "../models/KAdeliveryaddress.js";
import JWT from "jsonwebtoken";

export const cardController = async (req,res) => {
    try {
        const{year,month,email,cvv,cardNumber,name } =req.body
        //validation
        if(!name){
            return res.send({error:'Name is Required'});
        }
        if(!year){
            return res.send({error:'year is Required'});
        }
        if(!month){
            return res.send({error:'month is Required'});
        }
        if(!email){
            return res.send({error:'email is Required'});
        }
        if(!cvv){
            return res.send({error:'cvv is Required'});
        }
        if(!cardNumber){
            return res.send({error:'cardNumber is Required'});
        }

        //check card
        const exisitingCard = await KAcardmodel.findOne({cardNumber});

        //exisit card
        if(exisitingCard){
            return res.status(200).send({
                success:true,
                message:'This card is alradey added',
            });
        }
        //save
        const card = await new KAcardmodel({name,cardNumber,cvv,email,month,year}).save();

        res.status(201).send({
            success:true,
            message:'Card Entered Successfully',
            card
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in details entering',
            error
        });
    }
};

export const addressController = async (req,res) => {
    try {
        const{name,address,cNumber,province,district,postalcode } =req.body
        //validation
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!address){
            return res.send({message:'address is Required'});
        }
        if(!cNumber){
            return res.send({message:'cNumber is Required'});
        }
        if(!province){
            return res.send({message:'province is Required'});
        }
        if(!district){
            return res.send({message:'district is Required'});
        }
        if(!postalcode){
            return res.send({message:'postalcode is Required'});
        }

        //check address
        const exisitingAddress = await KAdeliveryaddress.findOne({address});

        //exisit card
        if(exisitingAddress){
            return res.status(200).send({
                success:false,
                message:'This address is alradey added',
            });
        }
        //save
        const card = await new KAdeliveryaddress({name,address,cNumber,province,district,postalcode}).save();

        res.status(201).send({
            success:true,
            message:'Address Entered Successfully',
            card
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in details entering',
            error
        });
    }
};