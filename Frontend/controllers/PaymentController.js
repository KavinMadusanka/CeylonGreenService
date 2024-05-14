import paymentModel from "../models/PaymentModel.js";
import InventoryModel from "../models/InventoryModel.js";
import Order from "../models/KAorderModel.js";
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



///////////////////////////////////////////////
//after done payment cart quantity update part
// export const updateProductQuantityController = async (req, res) => {
//   try {
//       const { name, slug, price, quantity, category, supplier, reorderLevel } = req.fields;
//       const { photo } = req.files;

//       // Validation
//       switch (true) {
//           case !name:
//               return res.status(400).send({ error: "Name is required" });
//           case !price:
//               return res.status(400).send({ error: "Price is required" });
//           case !quantity:
//               return res.status(400).send({ error: "Quantity is required" });
//           case !category:
//               return res.status(400).send({ error: "Category is required" });
//           case !supplier:
//               return res.status(400).send({ error: "Supplier is required" });
//           case !reorderLevel:
//               return res.status(400).send({ error: "Reorder level is required" });
//           case photo && photo.size > 1000000:
//               return res.status(400).send({ error: "Photo is required and should be less than 1MB" });
//       }

//       // Find the product by ID and update its details
//       let product = await InventoryModel.findById(req.params.pid);
//       if (!product) {
//           return res.status(404).send({ error: "Product not found" });
//       }

//       // Update the product details
//       product.name = name;
//       product.slug = slugify(name);
//       product.price = price;
//       product.quantity = quantity;
//       product.category = category;
//       product.supplier = supplier;
//       product.reorderLevel = reorderLevel;

//       // Update the photo if provided
//       if (photo) {
//           product.photo.data = fs.readFileSync(photo.path);
//           product.photo.contentType = photo.type;
//       }

//       // Save the updated product
//       await product.save();

//       res.status(200).send({
//           success: true,
//           message: "Product updated successfully",
//           product,
//       });

//   } catch (error) {
//       console.error("Error in updating product:", error);
//       res.status(500).send({
//           success: false,
//           error: error.message || "Internal server error",
//           message: "Error in updating product",
//       });
//   }
// };


// Update product quantity controller
export const updateProductQuantityController = async (req, res) => {
  try {
    const { cart } = req.body;

    // Iterate through each item in the cart
    for (const item of cart) {
      const { productId, quantity, operation } = item;

      // Find the product by ID
      const product = await InventoryModel.findById(productId);

      if (!product) {
        return res.status(404).send({ error: `Product with ID ${productId} not found` });
      }

      // Update the product quantity based on the operation
      if (operation === "increase") {
        product.quantity += quantity;
      } else if (operation === "decrease") {
        product.quantity -= quantity;
      }

      // Save the updated product
      await product.save();
    }

    res.status(200).send({
      success: true,
      message: "Product quantities updated successfully",
    });
  } catch (error) {
    console.error("Error updating product quantities:", error);
    res.status(500).send({
      success: false,
      error: error.message || "Internal server error",
      message: "Error updating product quantities",
    });
  }
};


//get single address 
export const PaymentPriceController = async (req,res) => {
  try {
      // console.log(id)
      const payments = await paymentModel.find()
      res.status(200).send({
          success: true,
          message: "get payment details success",
          payments,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          error,
          message: "Error while getting payment details ",
      });
  }
};


export const orderController = async (req, res) => {
  try {
      // Extract cart details and user email from request body
      const { cart, email, price } = req.body;

      // Create a new order with the cart details and user email
      const order = new Order({
          cart: cart,
          email: email,
          price: price
      });

      // Save the order to the database
      const savedOrder = await order.save();

      // Respond with success message
      res.status(201).json({ success: true, message: 'Cart details submitted to orders successfully', order: savedOrder });
  } catch (error) {
      console.error('Error submitting cart to orders:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getOrderController = async (req, res) => {
  const{ email } =req.params;
  try {
    // Retrieve orders from the database
    const orders = await Order.find({email});

    // Respond with success and the retrieved orders
    res.status(200).send({ success: true, orders: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};



export const getOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Retrieve order from the database by ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Respond with success and the retrieved order
    res.status(200).send({ success: true, order: order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};