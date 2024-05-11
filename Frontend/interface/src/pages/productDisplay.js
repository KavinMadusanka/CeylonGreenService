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



 
  // Filter Address based on search term using addresses and names
  useEffect(() => {
    const filtered = products.filter((products) =>
      products.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        // (selectedServicePackage === "" || appointment.servicePackage === selectedServicePackage)
    );
    setFilteredName(filtered);
}, [searchTerm, products]);

  
useEffect(() => {
    // Fetch products from backend API
    fetchProducts();
  }, []);  


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
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  //add to cart

  const addToCart = async (productId,quantity) => {
    try {

      
      const response = await axios.post('http://localhost:8000/api/v1/Cart/add-to-cart', {
        product: productId,
        quantity: 1, 
        email: email 
      });
     
      if(response && response.data.success){
        toast.success(response.data.message);
        
      }else{   

        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }

//decrease quantity by one when adding to cart
    try {
     
      const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productId}`, {
        
        quantity: quantity -1,
        
      });
      if(response && response.data.success){
        toast.success(response.data.message);
        
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      
      console.error('Error updating  product quantity to cart:', error);
    }

   



  };


  // const addTowishlist = async (productId) => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/v1/Cart/add-to-cart', {
  //       product: productId,
  //        // Set the quantity as needed
  //       email: email // Pass the user's email
  //     });
  //     console.log('Item added to cart:', response.data);
  //     // Optionally, you can update the UI to reflect that the item has been added to the cart
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //   }
  // };


  return (
    <div>
      <Header />
      <div className='but' id='shoppingCartbtn'>
      <Link to="/ShoppingCart">
                    <button className='btnsub'>Shopping cart</button>
                    </Link>
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

    <div key={product._id} className="product">
      <img className='product_picture' src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} alt={product.name} />
      <h2><b>{product.name}</b></h2>
      <p> {product.category.name}</p>
      {/* <p>Description: {product.description}</p> */}
      <p> Rs.{product.price}</p>
      <p>Quantity: {product.quantity}</p>
      {/* Render other product details as needed */}
      
      
      <button id='addtocart' onClick={() => addToCart(product._id,product.quantity)} className='btnsub'>Add to cart</button>
      
      <button className='btnsub' id='wishlist'>Wishlist</button>
      
      
    </div>
  ))}
</div>

      <Footer />
    </div>
  );
}

export default ProductDisplay;
