import paymentModel from "../models/PaymentModel.js";
import slugify from "slugify";

import fs from 'fs';
import multer from 'multer';

// const upload = multer().fields([{ name: 'photo' }]);

export const paymentController = async (req, res) => {
    try {
              const { name,address, cNumber, province, district,email, postalcode,card,Discription,price } = req.body;
                
              // const { photo } = req.files;
              //validation
              switch (true) {
                case !name:
                  return res.status(500).send({ error: "Name is Required" });
                case !address:
                  return res.status(500).send({ error: "Address is Required" });
                case !cNumber:
                  return res.status(500).send({ error: "OrderId is Required" });
                case !province:
                  return res.status(500).send({ error: "Price is Required" });
                case !district:
                  return res.status(500).send({ error: "district is Required" });
                case !postalcode:
                  return res.status(500).send({ error: "postalcode is Required" });  
                case !card:
                  return res.status(500).send({ error: "card is Required" });
                case !email:
                  return res.status(500).send({ error: "email is Required" });
                case !price:
                  return res.status(500).send({ error: "price is Required" });
                // case photo && photo.size > 1000000:
                //   return res
                //     .status(500)
                //     .send({ error: "photo is Required and should be less then 1mb" });
              }

              const payment = new paymentModel({ name,address, cNumber, province, district, postalcode,card,email,Discription,price });

                // payments.photo.data = fs.readFileSync(photo[0].path);
                // payments.photo.contentType = photo[0].mimetype;

              await payment.save();
                res.status(201).send({
                    success: true,
                    message: "Payment Successfully",
                    payment,
      });
    
  // })
} catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in parsing form data",
    });
  }
};


export const bankpaymentController =async (req,res) => {
  try {
    // upload(req, res, async function (err) {
    //   if (err) {
    //       return res.status(500).send({ error: "Error in parsing form photo data" });
    //   }
    const { name, postalcode, cNumber, Discription, address,email, price } = req.body;
    const { photo } = req.files;
    // let photo;
    // if (req.files && req.files.photo) {
      // photo = req.files.photo[0];
    //   const { photo } = req.files;
    // }
    //validation
    // if (!email) {
    //   return res.status(500).send({ error: "Email is Required" });
    // }
    // if (!name) {
    //   return res.status(500).send({ error: "name is Required" });
    // }
    // if (!postalcode) {
    //   return res.status(500).send({ error: "postalcode is Required" });
    // }
    // if (!price) {
    //   return res.status(500).send({ error: "price is Required" });
    // }
    // if (!cNumber) {
    //   return res.status(500).send({ error: "cNumber is Required" });
    // }
    // if (!address) {
    //   return res.status(500).send({ error: "address is Required" });
    // }
    // if (photo && photo.size > 1000000) {
    //   return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
    // }
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !postalcode:
        return res.status(500).send({ error: "postalcode is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !cNumber:
        return res.status(500).send({ error: "cNumber is Required" });
      case !address:
        return res.status(500).send({ error: "address is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    // if (photo && photo.length > 0) {
    //   const photoData = {
    //     data: fs.readFileSync(photo[0].path),
    //     contentType: photo[0].mimetype
    //   };
    //   const product = new paymentModel({ name, postalcode, cNumber, Discription, address, price, email, photo: photoData });
    //   await product.save();
    // } else {
    //   // If no photo is provided, create the product without photo
    //   const product = new paymentModel({ name, postalcode, cNumber, Discription, address, price, email });
    //   await product.save();
    // }
    const payments = new paymentModel({ name, postalcode, cNumber, Discription, address, email, price  });
    // console.log('Photo:', photo);
    if (photo && photo.data && photo.mimetype) {
      // return res.status(500).send({ error: "dn awa" });
      // console.log('Photo data:', photo.data);
      // console.log('Photo mimetype:', photo.mimetype);
      payments.photo.data = photo.data;
      payments.photo.contentType = photo.mimetype;
    }
    // const photoData = {
    //   data: fs.readFileSync(photo.path),
    //   contentType: photo.mimetype
    // };
    // const payments = new paymentModel({ name, postalcode, cNumber, Discription, address, email, price, photo: photoData });
    await payments.save();
    res.status(201).send({
      success: true,
      message: "Payment Slip uploaded Successfully",
      payments,
    });
  // });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in parsing form data",
    });
  }
}