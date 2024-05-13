
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wishlist() {

  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [Wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (auth && auth.user) {
        setEmail(auth.user.email);
       
        
       
      } 
  },[auth])

//get wishlist items 
useEffect(() => {
    
  const fetchWishlistDetails = async () => {
    try {
      console.log(email)
      const response = await axios.get(`http://localhost:8000/api/v1/wishlist/get-wishlist/${email}`);
      setWishlist(response.data.Wishlist);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Wishlist details:', error);
    }
  };
  fetchWishlistDetails();
  
}, [email]);






  return (

    
    <div>
  <Header />
  <div className="container">
    <h1>My Wishlist</h1>
     
      <ul>
        {Wishlist?.map((item, index) => (
          <li key={index}>
            <h3>{item.product.name}</h3>
            <p>Price: {item.product.price}</p>
          </li>
        ))}
      </ul>
    
  </div>
  <Footer />
</div>
  )
}

export default Wishlist