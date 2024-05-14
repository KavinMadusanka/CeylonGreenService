import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from "react-hot-toast";
import {ShoppingCartcss} from '../components/ShoppingCart.css';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Appointment.css';
import Item from 'antd/es/list/Item';
import Wishlist from './Wishlist';



function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const[quantity,setQuantity]=useState([]);
  const [FilteredName, setFilteredName] = useState([]);
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [name,setName] = useState("");
  const [cNumber,setNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const[selectedCategory,setSelectedCategory]=useState("");
  const [selectedServicePackage, setSelectedServicePackage] = useState("");
  const [cart, setCart] = useState([]);

//add to wishlist 

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/wishlist/add-to-wishlist', {
        product: productId,
        email: email, // Get email from user context
      });

      if (response && response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      toast.error('Error adding to wishlist');
    }
  };








 
  // Filter Address based on search term using addresses and names
  useEffect(() => {
    const filtered = products.filter((products) =>
      products.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        // (selectedServicePackage === "" || appointment.servicePackage === selectedServicePackage)
    );
    setFilteredName(filtered);
}, [searchTerm, products]);
  


  useEffect(() => {
    if (products && products.product) {
      setQuantity(products.product.quantity);
      
      } 
  },[products])



  

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
      const response = await fetch('http://localhost:8000/api/v1/product/get-products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        fetchProducts();
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch products from backend API
    fetchProducts();
  }, []);

  //add to cart

  const addToCart = async (productId,quantity) => {
    try {

      if (quantity <= 0) {
        toast.error("Product is out of stock");
        return; // Exit the function if quantity is out of stock
      }
      const response = await axios.post('http://localhost:8000/api/v1/Cart/add-to-cart', {
        product: productId,
        quantity: 1, 
        email: email 
      });
     
      if(response && response.data.success){
        toast.success(response.data.message);
        const res = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productId}`, {
        quantity: quantity -1,
      })
      if(res && res.data.success){
           // toast.success(res.data.message);
            
          }else{
            toast.error(res.data.message);
          }
        
      }else{   

        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }

//decrease quantity by one when adding to cart
    // try {
     
    //   const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productId}`, {
        
    //     quantity: quantity -1,
        
    //   });
    //   if(response && response.data.success){
    //     toast.success(response.data.message);
        
    //   }else{
    //     toast.error(response.data.message);
    //   }
      
    // } catch (error) {
      
    //   console.error('Error updating  product quantity to cart:', error);
    // }

   



  };


  


  return (
    <div>
      <Header />
      <div className='but' id='shoppingCartbtn'>
      <Link to="/ShoppingCart">
                    <button className='btnsub'>Shopping cart</button>
                    </Link>
                    <span className="mx-2"></span> {/* Adding space */}
                    <span className="mx-2"></span> {/* Adding space */}
                    <Link to="/wishlist">
                    <button className='btnsub'>Wish  list</button>      
                    </Link>
                    </div> 
                     <div className='but' id='buttonWishlist'>
      {/* <Link to="/wishlist">
                    <button className='btnsub'>Wish  list</button>      
                    </Link> */}
                    </div>               
      <div className='username'><b>Hello.. {name} welcome to Ceylon Green Shop</b></div>   

      <div className='searchbar w-25' id='search'>
                        {/* Search input */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control mb-10"
                            id='search'
                            // style={{border:'solid 1px'}}
                            />
                        </div>

                        <div className='searchbar w-25'>
    
    {/* Category dropdown */}
    
    <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="form-control mb-10" id='filter'
    >
        <option value="">All Categories</option>
        <option value="cleaning chemicals">Cleaning Chemicals</option>
        <option value="specialty cleaning products">Specialty Cleaning Products</option>
        <option value="cleaning tools">Cleaning Tools</option>
        <option value="electronic equipment">Electronic Equipment</option>
        <option value="floor care equipment">Floor Care Equipment</option>
    </select>
    <span className="mx-2"></span> {/* Adding space */}
    <p id='filter'></p>
</div>

               

      <div className="product-list">
  {FilteredName.map(product => (

   // Filter products based on category
   (selectedCategory === "" || product.category.name.toLowerCase() === selectedCategory.toLowerCase()) &&

//     <div key={product._id} className="product">
//       <div  >
//       <img className='product_picture' src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} alt={product.name} /></div>
//       <h2><b>{product.name}</b></h2>
//       <p> {product.category.name}</p>
//       {/* <p>Description: {product.description}</p> */}
//       <p> Rs.{product.price}</p>
//       <p>
//   Quantity: {product.quantity <= 0 ? "Out of Stock" : product.quantity}
// </p>
//       {/* Render other product details as needed */}
      
      
//       <button id='addtocart' onClick={() => addToCart(product._id,product.quantity)} className='btnsub'>Add to cart</button>
      
//       <button className='btnsub' id='wishlist' onClick={() => addToWishlist(product._id)}>Wishlist</button>
      
      
//     </div>
<div key={product._id} className="product">
  <div style={{ height: "200px", width: "auto" }}>  <img className='product_picture' src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} alt={product.name} />
  </div>

  <div style={{ height: "200px", width: "auto" }}>
  <h2><b>{product.name}</b></h2>
  <p> {product.category.name}</p>
  {/* <p>Description: {product.description}</p> */}
  <p> Rs.{product.price}</p>
  <p>
    Quantity: {product.quantity <= 0 ? "Out of Stock" : product.quantity}
  </p>
  {/* Render other product details as needed */}
  </div>
  <button id='addtocart' onClick={() => addToCart(product._id,product.quantity)} className='btnsub'>Add to cart</button>
  
  <button className='btnsub' id='wishlist' onClick={() => addToWishlist(product._id)}>Wishlist</button>
  
</div>

  ))}
</div>

      <Footer />
    </div>
  );
}

export default ProductDisplay;
