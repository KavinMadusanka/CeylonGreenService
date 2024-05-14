import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal } from "antd";
import toast from "react-hot-toast";
import {}  from '../components/KAddcard.css';
import { KApaymentOptions } from './KApaymentOptions';



function ShoppingCart() {

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, Tax] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(500);
  const [address,setAddress] = useState("");
  const [name,setName] = useState("");
  const [cNumber,setNumber] = useState("");
  const navigate = useNavigate()
  const [province,setProvince] = useState("");
  const [district,setDistrict] = useState("");
  const [postalcode,setPostalcode] = useState("");
  const today = new Date();
  const deliveryDate = new Date(today);



  useEffect(() => {
    if (auth && auth.user) {
        setEmail(auth.user.email);
        setAddress(auth.user.address);
        setName(auth.user.name);
        setNumber(auth.user.pNumber);
        
       
      } 
  },[auth])

//get cart items 
  useEffect(() => {
    
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Cart/get-cart/${email}`);
        setCart(response.data.cart);
        setLoading(false);
        fetchCartDetails();
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartDetails();
  }, [email]);


  

  
// delete cart items 
  const handleDeleteCartItem = async (id,quantity,productID,cartQuantity) => {
    try {

      console.log(cartQuantity)
      await axios.delete(`http://localhost:8000/api/v1/Cart/delete-cart-item/${id}`);
      // Update the cart state to reflect the deleted item

     // console.log("Cart:", cart);
      setCart(cart.filter(item =>  item && item._id !== id));
      toast.success("Item deletion successfully");

        try {
     
      const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productID}`, {
        
        quantity: quantity +cartQuantity,
        
      });
      if(response && response.data.success){
        toast.success(response.data.message);
        // navigate('/payment');
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      
      console.error('Error updating  product quantity to cart:', error);
    }



    } catch (error) {
      console.error('Error deleting cart item:', error);
    }


    // try {
     
    //   const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${id}`, {
        
    //     quantity: quantity +1,
        
    //   });
    //   if(response && response.data.success){
    //     toast.success(response.data.message);
    //     // navigate('/payment');
    //   }else{
    //     toast.error(response.data.message);
    //   }
      
    // } catch (error) {
      
    //   console.error('Error updating  product quantity to cart:', error);
    // }

  };


 //update quantity  
  const handleUpdateCartItemQuantity = async (id,existingQuantity, newQuantity,quantity,productID) => {
   
   
    try {  

      

              if (newQuantity==existingQuantity+1){

               
                    
                  await axios.put(`http://localhost:8000/api/v1/Cart/update-item/${id}`, { quantity: newQuantity });
                  // Update the cart state to reflect the updated quantity
                  setCart(cart.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item)));
                  toast.success("Item quantity update successfully");
               

                 try {   
                  console.log(productID)
     
                          const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productID}`, {
                            
                            quantity: quantity-1,
                            
                          });
                          if(response && response.data.success){
                            //toast.success(response.data.message);
                            // navigate('/payment');
                            
                          }else{
                            toast.error(response.data.message);
                          }
                          
                        } catch (error) {
                          
                          console.error('Error updating  product quantity to cart:', error);
                        }
                        


              }
              else{
                
                if (newQuantity < 0) {
                  // Prevent decreasing quantity below 0
                  const confirmed = window.confirm("Quantity cannot be less than 0. Do you want to remove the item?");
                  if (confirmed) {
                             
                    return;

                    
                    
                  } else {
                    // User clicked "Cancel" to keep the item
                    return;
                  }
                }
                
                

                await axios.put(`http://localhost:8000/api/v1/Cart/update-item/${id}`, { quantity: newQuantity });
                // Update the cart state to reflect the updated quantity
                setCart(cart.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item)));
                toast.success("Item quantity update successfully");
              //  console.log(existingQuantity)
              //  console.log(newQuantity)


              try {   
                console.log(productID)
   
                        const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productID}`, {
                          
                          quantity: quantity+1,
                          
                        });
                        if(response && response.data.success){
                          //toast.success(response.data.message);
                          // navigate('/payment');
                          
                        }else{
                          toast.error(response.data.message);
                        }
                        
                      } catch (error) {
                        
                        console.error('Error updating  product quantity to cart:', error);
                      }


              }









    //   await axios.put(`http://localhost:8000/api/v1/Cart/update-item/${id}`, { quantity: newQuantity });
    //   // Update the cart state to reflect the updated quantity
    //   setCart(cart.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item)));
    //   toast.success("Item quantity update successfully");
    //  console.log(existingQuantity)
    //  console.log(newQuantity)

    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  //update button

  const handleUpdateButton = async () => {
    
      
      toast.success("Item quantity update successfully");
   
  };


  //calculation part 

  useEffect(() => {
    // Calculate subtotal
    let total = 0;
    let totalQuantity = 0; 

    cart.forEach(item => {
      total += item.product.price * item.quantity;
      totalQuantity += item.quantity; 
    });

    // Add tax
    let tax= 50;

   // Add delivery charge
  let deliveryCharge = 500; // Default delivery charge
  if (totalQuantity >= 3||totalQuantity==0) {
    deliveryCharge = 0; // Free delivery for 3 or more items
  }
  if (totalQuantity==0) {
   // Free delivery for 3 or more items
    tax= 0;
  }

  // Update subtotal and delivery charge states
  setSubtotal(total);
  setDeliveryCharge(deliveryCharge);
  Tax(tax);
  }, [cart]);


  
  // const handleCheckout = () => {
  //   navigate('/payment');
  //   console.log("Checkout button clicked");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cNumber.length < 10||cNumber.length>10) {

        toast.error("Contact number must be 10 characters long");
        return;
      }
      if (!cNumber.startsWith('0')) {
        toast.error("Contact number needs to start at '0' ");
        return;
      }
      const res = await axios.post('http://localhost:8000/api/v1/auth/KAddaddress',
        {name,address,cNumber,province,district,postalcode,email}
      );
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/shoppingcart');
        setPostalcode('');
        setDistrict('');
        setProvince('');
      }else{
        toast.error(res.data.message );
      }
    } catch (error) {
      console.log(error);
      toast.error('Somthing went wrong!');
    }
  };

  //only gets alpherbatds
  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if(!regex.test(event.key)){
      event.preventDefault();
    }
  };
  //only gets numbers
  const handleKeyNumber = (event) => {
    const regex = /^[0-9\s]*$/;
    if(!regex.test(event.key)){
      event.preventDefault();
    }
  };
  // Calculate the delivery date by adding 10 working days (excluding weekends)
for (let i = 0; i < 10; i++) {
  deliveryDate.setDate(deliveryDate.getDate() + 1); // Move to the next day
  // Skip weekends (Saturday: 6, Sunday: 0)
  if (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
    i--; // Subtract from the count of working days
  }
}

// Format the delivery date as dd.mm.yyyy
const formattedDeliveryDate = `${deliveryDate.getDate()}.${deliveryDate.getMonth() + 1}.${deliveryDate.getFullYear()}`;
const todatDate =`${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  // Function to handle modal visibility and content
  const handleModal = (content) => {
    if(subtotal+deliveryCharge+tax>0){
      setVisible(true);
      setModalContent(<KApaymentOptions subtotal={subtotal+deliveryCharge+tax} />);
    } else {
      toast.error("There is no item in your cart...");
      // navigate('/')
    }
  };
  return (
    <div>
      <Header/>
      
   <section className="h-100 gradient-custom">
      <div className="container py-5" id='cartcontainer'>
        <div className="row d-flex justify-content-center my-4" >
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cart.length} items</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>No any items in cart </p>
                ) : (
                  <>
                    {cart.map((carts, index) => (
                      <div key={index} className="row mb-4">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src={`http://localhost:8000/api/v1/product/product-photo/${carts.product._id}`} className="w-100" alt={carts.product.name} />
                            <a href="#!">
                              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p><strong><b><h4>{carts.product.name}</h4></b></strong></p>
                          {/* <p>Color: {carts.product.color}</p>
                          <p>Size: {carts.product.size}</p> */}
                          <p ><strong> Price :  Rs. {carts.product.price}</strong></p>
                          <p ><strong> Available: {carts.product.quantity<= 0 ? "Out of Stock" :carts.product.quantity}</strong></p>

                          <div className='but'>
                          <button type="button"className='btnsub' onClick={() => handleDeleteCartItem(carts._id,carts.product.quantity,carts.product._id,carts.quantity)}>Remove</button>
                          <span className="mx-2"></span> {/* Adding space */}
                          
                          <button type="button" className='btnsub'  onClick={ handleUpdateButton}>Update</button>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                            <div className='but'>
                            <button className='btnsub' onClick={() => handleUpdateCartItemQuantity(carts._id,carts.quantity, carts.quantity - 1,carts.product.quantity,carts.product._id)}>
                              <i className="fas fa-minus"></i>-
                            </button>
                            </div>    
                            <span className="mx-2"></span> {/* Adding space */}
                            <div className="form-outline">
                              <input type="number" min="1" name="quantity" value={carts.quantity} className="form-control" readOnly />
                            </div>
                            <span className="mx-2"></span> {/* Adding space */}
                            <div className='but'>
                            <button className='btnsub' onClick={() => handleUpdateCartItemQuantity(carts._id, carts.quantity,carts.quantity + 1,carts.product.quantity,carts.product._id)}>
                              <i className="fas fa-plus"></i>+
                            </button>
                            </div>

                          </div>
                          
                        </div>
                      </div>
                    ))}
                  </>
                )}
               
                {/* <hr className="my-4" /> */}
               
                <div className="card mb-4" >
                <div className="card-body" id='expected_delivery'>
                <div className="mb-3">
    <strong>Expected shipping delivery</strong>
    <br/>
    <p className="mb-0" id='expected'>{todatDate} &nbsp; -&nbsp; {formattedDeliveryDate}<br/></p>
    
  </div>
  <p id='maximum'>(maximum 10 working days)</p>

</div>

                </div>
                <div className="card mb-4 mb-lg-0">
                  {/* <div className="card-body">
                    <p><strong>We accept</strong></p>
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp" alt="PayPal acceptance mark" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
          <div className="card mb-4">
            
          <div className="card-body">
          <form onSubmit={handleSubmit}>
        <div >
            
            <div className='item2'>
              <div className='KAbar'>  
                    <ul className="KAbarInn">
                      <li className="KAbarIn">
                        
                      </li>
                      <li className="KAbarIn">
                       <b> Add a New Delivery Address</b>
                      </li>
                    </ul>
              </div>
            </div>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Contact Name :</td>
                  <td className='texting'>Contact Number :</td></tr>
                      <tr></tr>
                    <tr><td>
                      <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='perera p.l.'
                      onKeyPress={handleKeyPress}
                      required 
                      /></td>
                      <td>
                        <input 
                        type="text" 
                        value={cNumber}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder='07x xxxxxxx'
                        onKeyPress={handleKeyNumber}
                        maxLength={10}
                        required 
                        /></td></tr>
                      <tr></tr>
                </tbody></table>
            </div>
            <div id="item4">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Address :</td></tr>
                      <tr></tr>
                    <tr><td>
                      <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required  
                      /></td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className="item5">
                <table id="table">
                  <tbody>
                  <tr>
                      <td className='texting'>Province</td>
                      <td className='texting'>District</td>
                      <td className='texting'>Postal Code</td></tr>
                    <tr>
                      <td>
                        <input 
                        type="text" 
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required 
                        /></td>
                      <td>
                        <input 
                        type="text" 
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required 
                        /></td>
                      <td>
                      <td>
                        <input 
                        type="text" 
                        value={postalcode}
                        onChange={(e) => setPostalcode(e.target.value)}
                        onKeyPress={handleKeyNumber}
                        required 
                        /></td>
                       </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className='item9'>
              <button className='btnsub'>Save personal Details</button>
            </div>


            
        </div>
        </form>
        
        </div>

        {/* <div className="card-header py-3">
                <h5 className="mb-0" id='summary_topic'>Summary</h5>
                
              </div> */}
              
        <div className="card-body">
        <div className='KAbar'>  
                    <ul className="KAbarInn">
                      
                      <li className="KAbarIn" id='summary'>
                        <b>ShoppingCart summary</b>
                      </li>
                    </ul>
              </div>
          
                <ul className="list-group list-group-flush" >
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    subtotal
                    <span>Rs.{subtotal.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0" >
                    Shipping<br/>
                     
                    <span>Rs. {deliveryCharge.toFixed(2)}</span>
                  </li>
                 {/* <h8> <li className="list-group-item d-flex justify-content-between align-items-center px-0">(Shipping charege may relese up to 3 or more items )</li></h8> */}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3" >
                    <div >
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT +50.00)</p>
                      </strong>
                    </div>
                    <span><strong >Rs. {(subtotal + deliveryCharge+tax).toFixed(2)}</strong></span>
                  </li>
                </ul>
                <div className='item9'>
                   <button onClick={() => {handleModal(<KApaymentOptions subtotal={(subtotal+deliveryCharge+tax)}/>);}} className='btnsub'>Go to checkout</button></div>
                  
                   
              </div>
              
        
        </div>
        <h8> <li className="list-group-item d-flex justify-content-between align-items-center px-0">Shipping charge may relese up to 3 or more items </li></h8>
          </div>


         
   


         
          
        </div>
      </div>
    </section>
     

    <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}>
                {modalContent}
              </Modal>      

      <Footer/>
    </div>
  )
}

export default ShoppingCart