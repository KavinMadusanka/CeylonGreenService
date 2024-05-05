import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';
import axios from 'axios';


function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [name,setName] = useState("");
  const [cNumber,setNumber] = useState("");
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    // Fetch products from backend API
    fetchProducts();
  }, []);  




  useEffect(() => {
    if (auth && auth.user) {
        setEmail(auth.user.email);
        setAddress(auth.user.address);
        setName(auth.user.name);
        setNumber(auth.user.pNumber);
       
      } 
  },[auth])



  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/Inventory/get-product');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  const addToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/Cart/add-to-cart', {
        product: productId,
        quantity: 1, // Set the quantity as needed
        email: email // Pass the user's email
      });
      console.log('Item added to cart:', response.data);
      // Optionally, you can update the UI to reflect that the item has been added to the cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };



  return (
    <div>
      <Header />
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product">
            <img className='product_picture' src={`http://localhost:8000/api/v1/Inventory/product-photo/${product._id}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Category: {product.category.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: Rs.{product.price}</p>
            <p>Quantity: {product.quantity}</p>
            {/* Render other product details as needed */}
            <button onClick={() => addToCart(product._id)}  >Add to cart </button>
            <button>Wishlist  </button>

            <div>{email}</div>
          </div>
        ))}

        
      </div>
      <Footer />
    </div>
  );
}

export default ProductDisplay;
