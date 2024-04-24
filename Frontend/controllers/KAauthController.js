import KAcardmodel from "../models/KAcardmodel.js";
import KAdeliveryaddress from "../models/KAdeliveryaddress.js";


export const cardController = async (req,res) => {
    try {
        const{year,month,email,cvv,cardNumber,name } =req.body
        //validation
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!year){
            return res.send({message:'year is Required'});
        }
        if(!month){
            return res.send({message:'month is Required'});
        }
        if(!email){
            return res.send({message:'email is Required'});
        }
        if(!cvv){
            return res.send({message:'cvv is Required'});
        }
        if(!cardNumber){
            return res.send({message:'cardNumber is Required'});
        }

        //check card
        const exisitingCard = await KAcardmodel.findOne({cardNumber});

        //exisit card
        if(exisitingCard){
            return res.status(200).send({
                success:false,
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
        const{name,address,cNumber,province,district,postalcode,email } =req.body
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
        if(!email){
            return res.send({message:'emali is missed'});
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
        const deliaddress = await new KAdeliveryaddress({name,address,cNumber,province,district,postalcode,email}).save();

        res.status(201).send({
            success:true,
            message:'Address Addeded Successfully',
            deliaddress
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

//update address details
export const updateAddressController = async (req,res) => {
    try {
        const {name} = req.body;
        const {address} = req.body;
        const {cNumber} = req.body;
        const {province} = req.body;
        const {district} = req.body;
        const {postalcode} = req.body;
        const {id} = req.params;
        const category = await KAdeliveryaddress.findByIdAndUpdate(
            id,
            {name, slug: slugify(name)},
            {address, slug: slugify(address)},
            {cNumber, slug: slugify(cNumber)},
            {province, slug: slugify(province)},
            {district, slug: slugify(district)},
            {postalcode, slug: slugify(postalcode)},
            {new: true}
            
        );
        res.status(200).send({
            success: true,
            message: "Address Updated Successfully",
            category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating Address"
        })
        
    }
};

//get all deliverAddress
export const getAddressControlller = async(req, res) =>{
    try {
        const address = await KAdeliveryaddress.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            address,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
        
    }
};

//delete Address
export const deleteAddressController = async (req, res) =>{
    try {
        const { id } = req.params;
        await KAdeliveryaddress.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Address Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting Address",
            error,
        });
    }
};