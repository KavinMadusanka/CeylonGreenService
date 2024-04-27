import express from 'express';
import {cardController, 
    addressController,
    updateAddressController,
    getAddressControlller,
    getSingleAddressControlller,
    deleteAddressController
} from '../controllers/KAauthController.js';

//router object
const router = express.Router();


//routing
//Method POST
router.post("/KAddcard", cardController);
router.post("/KAddaddress", addressController);


//update address
router.put("/update-Address/:id",updateAddressController);

//getAll address
router.get("/get-Address/:email",getAddressControlller);

//get single address
router.get("/get-single-Address/:id",getSingleAddressControlller);

//delete address
router.delete("/delete-Address/:id",deleteAddressController);

//LOGIN || POST
// router.post('/login',)

export default router;

