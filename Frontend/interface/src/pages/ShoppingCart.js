import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import ProductDisplayCSS from './productDisplay.css';
import { useAuth } from '../Context/GetToken.js';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [auth, setAuth] = useAuth(); 
  const [newAddress, setNewAddress] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/vi/Cart/get-cart');
      const data = await response.json();
      if (data.success) {
        setCartItems(data.data?.cartItems || []);
      } else {
        console.error('Error fetching cart items:', data.message);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/vi/Cart/delete-cart-item/${itemId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        // Refresh cart items after deleting item
        fetchCartItems(); 
      } else {
        console.error('Error deleting item:', data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/vi/Cart/update-item/${itemId}`,
        { quantity: newQuantity }
      );
      const data = response.data;
      if (data.success) {
        // Refresh cart items after updating quantity
        fetchCartItems(); 
      } else {
        console.error('Error updating quantity:', data.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Update local state without making a request
    const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Calculate subtotal
const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

// Calculate delivery charge
let deliveryCharge = 0;
if (cartItems.length <= 3) {
  deliveryCharge = 500; // Free delivery for up to 3 items
} else {
  deliveryCharge = 0; // Rs. 500 for normal delivery charge
}

// Calculate total tax
const tax = 50; // Normal tax amount

// Calculate total amount
const totalAmount = subtotal + deliveryCharge + tax;


//  handle address update
const handleAddressUpdate = () => {
  if (newAddress.trim() !== "") {
    // Update the address in local storage
    localStorage.setItem("address", newAddress);
    // Optionally, you can display a success message or perform any other action here
    alert("Address updated successfully!");
    // Clear the input field after updating the address
    setNewAddress("");
  } else {
    alert("Please enter a valid address.");
  }
};


  return (
    <section className="h-100 gradient-custom">
      <Header/>
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">


              {/* number of cart items ........................................... */}
              <div className="card-header py-3">
                <h5 className="mb-0">You have  {cartItems.length} items in your cart</h5>
              </div>

              {/* cart body................................................ */}
              <div className="card-body">
                {cartItems.map((item) => (
                  <div className="row" key={item._id}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img src={`http://localhost:8080/api/vi/Inventory/product-photo/${item.product._id}`} className="w-100" alt={item.product.name} />
                        <a href="#!">
                          <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                        </a>
                      </div>
                    </div>
  
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p><strong>{item.product.name}</strong></p>
                      <p>Price: Rs.{item.product.price}</p>
                     
                     {/* update button of cart item .................................... */}
                      <div className="d-flex">
                        <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item._id, e.target.value)} className="form-control me-1" />
                        <button type="button" className="btn btn-primary btn-sm me-1" onClick={() => handleUpdateQuantity(item._id, item.quantity)}>
                          Update
                        </button>

                        {/* remove button of cart item ..................................... */}
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                      
                      {/* item subtotal calculation ................................................. */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <p className="text-start text-md-center">
                        <strong>Subtotal: Rs.{item.product.price * item.quantity}</strong>
                      </p>
                    </div>
                  </div>
                ))}
                {cartItems.length === 0 && <p className="empty-cart-message">Your cart is empty.</p>}
                <hr className="my-4" />
                <div className="card mb-4">
                  <div className="card-body">
                    <p><strong>Expected shipping Address</strong></p>
                    
                    
                    {/* <h4>User address</h4>
                    <h5>{ auth?.user?.address}</h5> */}

                    <div className="mb-3">
      <b><h7>Delivery Address</h7></b>

      <br/><h3>{localStorage.getItem("address")}</h3>
      <input
        type="text"
        className="form-control"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        placeholder="Enter new address"
      />
      <button
        className="btn btn-outline-warning"
        onClick={handleAddressUpdate}
      >
        Update Address
      </button>
    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          {/* summary............................................... */}
          <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Subtotal
                  <span>{subtotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping chargers 
                  <span>{deliveryCharge === 0 ? "Delivery free" : `$${deliveryCharge.toFixed(2)}`}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount (including VAT)</strong>
                    <p className="mb-0">(Tax: Rs.{tax.toFixed(2)})</p>
                  </div>
                  <span><strong>{totalAmount.toFixed(2)}</strong></span>
                </li>
              </ul>
              <button type="button" className="btn btn-primary btn-lg btn-block">
                Go to checkout
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* footer.................................................................................................. */}
      <Footer/>
    </section>
  );
  
  
};

export default CartPage;
