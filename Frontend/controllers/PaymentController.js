import paymentModel from "../models/PaymentModel.js";
import slugify from "slugify";

import fs from 'fs';
import multer from 'multer';

// const upload = multer().fields([{ name: 'photo' }]);

export const paymentController = async (req, res) => {
    try {
        // upload(req, res, async (err) => {
        //     if (err) {
        //       console.error("Error parsing form data:", err);
        //       return res.status(500).send({ error: "Error parsing form data" });
        //     }
            try{
                try {
                  const { name,address, cNumber, province, district, postalcode,card,cardNumber,Discription,price } = req.fields;
                } catch (error) {
                  console.log(error);
                  res.status(500).send({
                    success: false,
                    error,
                    message: "Error in data catch",
                  });
                }
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
                  return res.status(500).send({ error: "Quantity is Required" });
                case !postalcode:
                  return res.status(500).send({ error: "Quantity is Required" });  
                case !card:
                  return res.status(500).send({ error: "card is Required" });
                case !cardNumber:
                  return res.status(500).send({ error: "Quantity is Required" });
                case !Discription:
                  return res.status(500).send({ error: "Quantity is Required" });
                case !price:
                  return res.status(500).send({ error: "Quantity is Required" });
                // case photo && photo.size > 1000000:
                //   return res
                //     .status(500)
                //     .send({ error: "photo is Required and should be less then 1mb" });
              }

              const payment = new paymentModel({ name,address, cNumber, province, district, postalcode,card,cardNumber,Discription,price });

                // payments.photo.data = fs.readFileSync(photo[0].path);
                // payments.photo.contentType = photo[0].mimetype;

              await payment.save();
                res.status(201).send({
                    success: true,
                    message: "Product Created Successfully",
                    payment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing payment",
      });
    }
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