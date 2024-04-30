import paymentModel from "../models/PaymentModel.js";
import slugify from "slugify";

import fs from 'fs';
import multer from 'multer';

const upload = multer().fields([{ name: 'photo' }]);

export const paymentController = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
              console.error("Error parsing form data:", err);
              return res.status(500).send({ error: "Error parsing form data" });
            }
            try{
                const { name, orderId, price, quantity, address } = req.fields;
              const { photo } = req.files;
              //validation
              switch (true) {
                case !name:
                  return res.status(500).send({ error: "Name is Required" });
                case !orderId:
                  return res.status(500).send({ error: "OrderId is Required" });
                case !price:
                  return res.status(500).send({ error: "Price is Required" });
                case !address:
                  return res.status(500).send({ error: "Address is Required" });
                case !quantity:
                  return res.status(500).send({ error: "Quantity is Required" });
                case photo && photo.size > 1000000:
                  return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
              }

              const payments = new paymentModel({ name, orderId, price, quantity, address });

                payments.photo.data = fs.readFileSync(photo[0].path);
                payments.photo.contentType = photo[0].mimetype;

              await payments.save();
                res.status(201).send({
                    success: true,
                    message: "Product Created Successfully",
                    payments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing product",
      });
    }
  })
} catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in parsing form data",
    });
  }
};