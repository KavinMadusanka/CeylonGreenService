import KAcardmodel from "../models/KAcardmodel.js";

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

