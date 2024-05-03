import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';
import axios from 'axios';

function ShoppingCart() {

  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(500);


  useEffect(() => {
    if (auth && auth.user) {
        setEmail(auth.user.email);
        
       
      } 
  },[auth])


  useEffect(() => {
    // Fetch cart details from backend API
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Cart/get-cart/${email}`);
        setCart(response.data.cart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartDetails();
  }, [email]);


  

  

  const handleDeleteCartItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/Cart/delete-cart-item/${id}`);
      // Update the cart state to reflect the deleted item
      setCart(cart.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleUpdateCartItemQuantity = async (id, newQuantity) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/Cart/update-item/${id}`, { quantity: newQuantity });
      // Update the cart state to reflect the updated quantity
      setCart(cart.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item)));
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };


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
  if (totalQuantity >= 3) {
    deliveryCharge = 0; // Free delivery for 3 or more items
  }

  // Update subtotal and delivery charge states
  setSubtotal(total);
  setDeliveryCharge(deliveryCharge);
  }, [cart]);

  const handleCheckout = () => {
    // Perform checkout action here
    // This function can be expanded to include additional steps like payment processing
    console.log("Checkout button clicked");
  };


  return (
    <div>
      <Header/>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {loading ? (
          <p>Loading cart details...</p>
        ) : (
          <ul>
            {cart.map(carts => (
              
              <li key={carts._id}>
                <p>Product: {carts.product.name}</p>
                

                <p>Price: {carts.product.price}</p>
                <p>Quantity: 
          <input 
            type="number" 
            value={carts.quantity} 
            onChange={(e) => handleUpdateCartItemQuantity(carts._id, parseInt(e.target.value))} 
          />
        </p>
                {/* Add more details as needed */}

                <button>Update</button>
                <button onClick={() => handleDeleteCartItem(carts._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="subtotal">
        <p>Subtotal: LKR {subtotal.toFixed(2)}</p>
        <p>Tax: LKR 50.00</p>
        <p>Delivery Charge: LKR {deliveryCharge.toFixed(2)}</p>
        <p>Total: LKR {(subtotal + 50 + deliveryCharge).toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>

     
     

      <Footer/>
    </div>
  )
}

export default ShoppingCart