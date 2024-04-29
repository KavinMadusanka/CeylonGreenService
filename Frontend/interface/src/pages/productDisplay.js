import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/GetToken.js';
import { useCart } from '../Context/CartProvider.js';
import toast from 'react-hot-toast';
import axios from "axios";

const ProductDisplayPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [auth, setAuth] = useAuth(); 
  const [cart, setCart] = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Retrieve cart data from local storage when component mounts---------------------------------------------------------------
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    fetchProducts(); 
  }, []);

  // Get products from product database----------------------------------------------------------------------------------------------
  const fetchProducts = async () => { 
    try {
      const response = await fetch('http://localhost:8080/api/vi/Inventory/get-product');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        console.error('Error fetching products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Search bar------------------------------------------------------------------------------------------------------------------
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    filterProducts(selectedCategory, searchQuery);
  };

  // Category filter-------------------------------------------------------------------------------------------------------------
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(event.target.value, searchQuery);
  };

  const filterProducts = (category, query) => {
    const filtered = products.filter((product) => {
      const categoryFilter =
        category === 'All' || product.category.name === category;
      const searchFilter = product.name.toLowerCase().includes(query.toLowerCase());
      return categoryFilter && searchFilter;
    });
    setFilteredProducts(filtered);
  };

  // Add to cart function----------------------------------------------------------------------------------------------------------
  const addToCartHandler = async (product) => {
    try {
      await axios.post('http://localhost:8080/api/vi/Cart/add-to-cart', {
        product: product._id,
        quantity: "1" // Assuming adding one quantity each time
      });
      // setCart([...cart, product]); // Update cart state
      // localStorage.setItem('cart', JSON.stringify([...cart, product])); // Update local storage
      // toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  //get item count to display beside shopping cart button-----------------------------------------------------------------------------
  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vi/Cart/get-cart');
      const cartItems = response.data.data.cartItems;
      setCartItemCount(cartItems.length);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  useEffect(() => {
    fetchCartItemCount();
  }, []);

  // HTML code-------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="product-display-page">
      {/* Display current logged user */}
     <h5> <b><div className='hello'>
        Hello ...welcome to the shop  <pre>{auth.user ? auth?.user?.name : 'Unknown'}</pre>
      </div></b></h5>

      {/* Category filter */}
      <div className="category-filter">
        <label htmlFor="category"><b> Category:</b></label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Cleaning Chemical">Cleaning Chemical</option>
          <option value="Electronic Equipment">Electronic Equipment</option>
          {/* <option value="cleaning-tool">Cleaning Tool</option>
          <option value="Floor Care Equipment">Floor Care Equipment</option> */}
        </select>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input className="search"
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="button" class="btn btn-success" id="searchbtn"onClick={handleSearchButtonClick}>Search</button>
        
      </div>

      {/* wish list button.................................*/}
      <Link to="/wishlist">

      <button type="button" class="btn btn-success" id='wishbtn'>Wish List {cart.length}</button>
        
      </Link>
 
 {/* shpopping cart button ............................... */}
 
<div> <Link  to="/Cart">
<button type="button" class="btn btn-success" id='cartbtn'>Shopping Cart {cartItemCount > 0 && <span>({cartItemCount})</span>}</button>

      </Link>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product">
            <img className='product_picture' src={`http://localhost:8080/api/vi/Inventory/product-photo/${product._id}`} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.category.name}</p>
              <p>{product.description}</p>
              <p>Price: Rs.{product.price}</p>
              <p>Available: {product.quantity}</p>
              
              {/* Add to wishlist button */}
              <button className='product-buttons' onClick={() => {
                setCart([...cart, product]); // Update cart state
                localStorage.setItem('cart', JSON.stringify([...cart, product])); // Update local storage
                toast.success('Item added to wishlist');
              }}>Add to wishlist</button>
              
              {/* Add to cart button */}
              <button className='addtocart' onClick={() => addToCartHandler(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplayPage;
