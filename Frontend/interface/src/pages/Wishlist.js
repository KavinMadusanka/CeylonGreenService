
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';
import { toast } from "react-toastify";
import {ShoppingCartcss} from '../components/ShoppingCart.css';

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
  }, [auth]);

  //get cart items 
  useEffect(() => {
    

    const fetchWishlist = async () => {
        try {
          console.log(email)
          const response = await axios.get(`http://localhost:8000/api/v1/wishlist/get-wishlist/${email}`);
          setWishlist(response.data.wishlist);
          console.log(response.data.wishlist)
          fetchWishlist();
        } catch (error) {    
          console.error(error);
          //toast.error("Error fetching wishlist details");
        } finally {
        setLoading(false);   
        }
      };   
      fetchWishlist();
    
  }, [email]);


  



  const addToCart = async (productId,quantity) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/Cart/add-to-cart', {
        product: productId,
        quantity: 1, // Assuming quantity is always 1 for wishlist items
        email: email,
      });

      if (response && response.data.success) {
        toast.success(response.data.message);
        // Update wishlist state to reflect the item being added to cart (optional)
        // You can fetch the updated wishlist or simply remove the added item from the local state

        const res = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productId}`, {
          quantity: quantity -1,
        })
        if(res && res.data.success){
             // toast.success(res.data.message);
              
            }else{
              toast.error(res.data.message);
            }
          




      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error adding to cart');
    }   
  };


//delete wishlist item
  const deleteWishlistItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/wishlist/delete-wishlist/${productId}`, {
        data: {
          email,
          productId,
        },
      });

      if (response.data.success) {
        toast.success("Wishlist item deleted successfully");
        // Update Wishlist state to reflect the removed item (optional)
        setWishlist(Wishlist.filter((item) => item._id !== productId)); // assuming _id is the unique identifier for wishlist items
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      toast.error('Error deleting from wishlist');
    }
  };

     



  return (

    
    <div>
    <Header />
   <section class="h-100 gradient-custom">
  <div class="container py-5" id="cartcontainer">
    <div class="row d-flex justify-content-center my-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Wishlist </h5>
          </div>
          <div class="card-body">
            {loading ? (
              <p>Loading wishlist...</p>
            ) : (
              Wishlist.length > 0 ? (
                <ul>
                  {Wishlist.map((W) => (
                    <li key={W._id} class="row mb-4">
                      <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                          <img src={`http://localhost:8000/api/v1/product/product-photo/${W.product._id}`} class="w-100" alt={W.product.name} />
                          <a href="#!">
                            <div class="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{W.product.name}</strong></p>
                        <p><strong>Price: Rs. {W.product.price}</strong></p>
                        <p><strong> quantity {W.product.quantity}</strong></p>

                        {/* You can add other product details here, like description or size */}
                      </div>
                      <div class="col-lg-4 col-md-6 mb-4 mb-lg-0" id='Wbutton'>
                        {/* Wishlist doesn't typically have quantity or removal buttons. You can add a "Move to Cart" button if needed. */}
                        <button type="button" class="btnsub"  onClick={() => deleteWishlistItem(W._id)} >Remove </button>
                        <span className="mx-2"></span> {/* Adding space */}
                        <button type="button" class="btnsub"   onClick={() => addToCart(W.product._id,W.product.quantity)} >Add to cart</button>
                      </div>
                      <hr className="my-4" />
                    </li>     
                  ))}
                </ul>
              ) : (   
                <p>No wishlist items found.</p>
              )
            )}
          </div>
        </div>
      </div>    
    </div>
  </div>
</section>

    <Footer />
  </div>
  )
}

export default Wishlist 