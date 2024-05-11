import React, { useState, useEffect } from 'react';
import Layout1 from '../components/Layout/Layout1';
import { useAuth } from '../context/auth';
import axios from 'axios';
import {useNavigate,useLocation} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal,Select } from "antd";
import toast from "react-hot-toast";
import {}  from '../components/KAddcard.css';
import { KApaymentOptions } from './KApaymentOptions';

const { Option } = Select;

function KAcardpayment() {

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(500);
  const [address,setAddress] = useState("");
  const [name,setName] = useState("");
  const navigate = useNavigate();
  const today = new Date();
  const deliveryDate = new Date(today);

  const [Addresses, setAddresses] = useState([]);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const location = useLocation();
  const [cNumber,setCNumber] = useState("");
  const [province,setProvince] = useState("");
  const [district,setDistrict] = useState("");
  const [postalcode,setPostalcode] = useState("");
  const [Discription,setDiscription] = useState("");
  const [price, setPrice] = useState("");

  const [card,setCard] = useState("");
  const [Cards,setCards] = useState([]);
  const [cHolder, setCHolder] = useState("");
  const [cardNumber,setNumber] = useState("");
  const [cvv,setCvv] = useState("");
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");
  const [productId,setProductId] = useState("");


  //get cart items 
  useEffect(() => {
    
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Cart/get-cart/${email}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartDetails();
  }, [email]);

    //get all Address
    const getAllAddress = async() =>{
        try {
          const {data} = await axios.get(`api/v1/auth/get-Address/${email}`);
          if(data?.success){
            setAddresses(data?.address);
            getAllAddress();
          }
        } catch (error) {
          console.log(error);
          // toast.error('Somthing went wrong in getting Address');
        }
      };

      //get all card details
const getAllCard = async() =>{
    try {
      const {data} = await axios.get(`api/v1/auth/get-Card/${email}`);
      if(data?.success){
        setCards(data?.cards);
        getAllCard();
      }
    } catch (error) {
      // toast.error('ganna baggggg');
      console.log(error);
      // toast.error('Somthing went wrong in getting Address');
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
        setEmail(auth.user.email);       
      } 
  },[auth])

  useEffect(() => {
    getAllAddress();
  }, [email]);

  useEffect(() => {
    getAllCard();
  },[email])


// //get cart items 
//   useEffect(() => {
    
//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/Cart/get-cart/${email}`);
//         setCart(response.data.cart);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart details:', error);
//       }
//     };
//     fetchCartDetails();
//   }, [email]);



//handell address change part
const handleAddressChange = async (value) => {
    setAddress(value);
    try {
      const { data } = await axios.get(`/api/v1/auth/get-single-Address/${value}`);
      if (data?.success) {
        setName(data.address.name);
        setAddress(data.address.address);
        setPostalcode(data.address.postalcode);
        setCNumber(data.address.cNumber);
        setProvince(data.address.province);
        setDistrict(data.address.district);
        
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in fetching address details');
    }
  };

  //handell Card change part
const handleCardsChange = async (value) => {
    // setCard(value);
    try {
      const { data } = await axios.get(`/api/v1/auth/get-single-card/${value}`);
      if (data?.success) {
        setCHolder(data.cards.name);
        setCard(data.cards.cardNumber);
        setMonth(data.cards.month.toString());
        setYear(data.cards.year.toString());
        setCvv(data.cards.cvv);
        console.log(card)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in fetching address details');
    }
  };

  //gettotal from cart page
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subtotalParam = searchParams.get('subtotal');
    if (subtotalParam) {
      setSubtotal(parseFloat(subtotalParam));
    }
  }, [location.search]);

  useEffect(() => {
    const totalAmount = subtotal
    setPrice(totalAmount.toFixed(2));
  }, [subtotal]);


  
  // const handleCheckout = () => {
  //   navigate('/payment');
  //   console.log("Checkout button clicked");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      // if (card.length !== 16) {
      //   console.log(card)
      //     toast.error("Card number must be 16 characters long");
      //     return;
      // }
      // if (cvv.length !== 3) {
      //     toast.error("CVV number is 3 digit number");
      //     return;
      // }
      if (cNumber.length !== 10) {
        console.log(email)
        toast.error("Contact number must be 10 characters long");
        return;
      }
      // Validate month
      // const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const currentYear = new Date().getFullYear();
      // const enteredMonth = parseInt(month, 10);
      let enteredYearFull = parseInt(year, 10);
      if (year.length === 2) {
        enteredYearFull += currentYear - (currentYear % 100);
      }

      if (
        enteredYearFull < currentYear ||
        (enteredYearFull === currentYear && parseInt(month, 10) < new Date().getMonth() + 1) || (parseInt(month, 10) > 12)
      ) {
        toast.error("Your Bank Card is expired");
        return;
      }
      const data = await axios.post(
        "/api/v1/payment/KAcardpayment",
        {name,address,cNumber,province,district,postalcode,email,card,cHolder,cvv,month,year,Discription,price}
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        // await removeQuantitiesFromInventory();
        await axios.delete(`http://localhost:8000/api/v1/payment/clear-cart/${email}`);
        toast.success("Payment Successfully");
        navigate("/shoppingcart");
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


  const formatCardNumber = (number) => {
    number = number.toString(); // Convert number to string
    // console.log(number);
    if (!number || number.length < 4) {
      return number;
    }
    let formattedNumber = '';
    for (let i = 0; i < number.length; i++) {
      formattedNumber += number.charAt(i);
      if ((i + 1) % 4 === 0 && i !== number.length - 1) {
        formattedNumber += ' ';
      }
    }
    // console.log(formattedNumber);
    return formattedNumber;
  };


  //get cart items 
  useEffect(() => {
    
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Cart/get-cart/${email}`);
        setCart(response.data.cart);
        setProductId(response.data.cart.product)
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartDetails();
  }, [email]);


  // Function to remove quantities from inventory
  const removeQuantitiesFromInventory = async () => {
    try {
      // Iterate through each item in the cart
      for (let item of cart) {
        // Make API call to update inventory quantity
        await axios.patch(`/api/v1/inventory/${item.productId}`, {
          quantity: item.quantity,
          operation: "decrease" // Decrease inventory quantity
        });
      }
    } catch (error) {
      console.error('Error removing quantities from inventory:', error);
      toast.error('Error removing quantities from inventory');
    }
  };



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Layout1>
      
   <section className="h-100 gradient-custom">
    <form onSubmit={handleSubmit}>
      <div className="container py-0">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Fill details</h5>
              </div>
              <div className="card-body">
              <div >
            
            <div>
            <Select
                bordered={false}
                placeholder="Select a Address"
                size="large"
                // showSearch
                className="form-select mb-3"
                // onChange={(value) => {
                //     setAddress(value);
                // }}
                onChange={handleAddressChange}
              >
                {Addresses?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.address}
                  </Option>
                ))}
              </Select>
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
                        placeholder='perera p.l.'
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-control"
                        required
                        />
                      </td>
                      <td>
                      <input
                        type="text"
                        value={cNumber}
                        placeholder='07x xxxxxxx'
                        onChange={(e) => setCNumber(e.target.value)}
                        onKeyPress={handleKeyNumber}
                        className="form-control"
                        required
                        />
                        </td></tr>
                      <tr></tr>
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
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setProvince(e.target.value)}
                        className="form-control"
                        required
                        />
                        </td>
                      <td>
                      <input
                        type="text"
                        value={district}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="form-control"
                        required
                        />
                        </td>
                      <td>
                      <td>
                      <input
                        type="text"
                        value={postalcode}
                        onChange={(e) => setPostalcode(e.target.value)}
                        onKeyPress={handleKeyNumber}
                        className="form-control"
                        required
                        />
                        </td>
                       </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            {/* <div className='item9'>
              <button className='btnsub'>Save personal Details</button>
            </div> */}
        </div>
               
                <hr className="my-2" />
                <div>
                <div>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Card Number :</td>
                      <td className='texting'>Card Holder's Name :</td></tr>
                      <tr></tr>
                    <tr><td>
                    <Select
                        bordered={false}
                        placeholder="Select a Address"
                        size="large"
                        // showSearch
                        className="form-select mb-3"
                        // onChange={(value) => {
                        //     setAddress(value);
                        // }}
                        onChange={handleCardsChange}
                    >
                        {Cards?.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {formatCardNumber(c.cardNumber)}
                        </Option>
                        ))}
                    </Select>
                      </td>
                      <td>
                      <input
                        type="text"
                        value={cHolder}
                        readOnly
                        placeholder="Card Holder's Name"
                        onKeyPress={handleKeyNumber}
                        className="form-control mb-3"
                        required
                        />
                      </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
            <div className="item5">
                <table id="table">
                  <tbody>
                  <tr>
                      <td className='texting'>Month</td>
                      <td></td>
                      <td className='texting'>Year</td>
                      <td className='texting'>CVV Number</td></tr>
                    <tr>
                      <td>
                      <input
                        type="text"
                        value={month}
                        readOnly
                        className="form-control"
                        onKeyPress={handleKeyNumber}
                        required
                        // onChange={(e) => setPrice(e.target.value)}
                        />
                        </td>
                      /
                      <td>
                      <input
                        type="text"
                        value={year}
                        readOnly
                        className="form-control"
                        // onKeyPress={handleKeyNumber}
                        required
                        // onChange={(e) => setPrice(e.target.value)}
                        />
                        </td>
                      <td>
                      <input
                        type="text"
                        value={cvv}
                        readOnly
                        placeholder='CVV'
                        onKeyPress={handleKeyNumber}
                        // onChange={(e) => setCvv(e.target.value)}
                        required
                        className="form-control"
                        // onChange={(e) => setPrice(e.target.value)}
                        />
                      </td></tr>
                      <tr><br/></tr>
                </tbody></table>
            </div>
        </div>
                {/* <div className='item9'>
                      <button
                      onClick={(e) => { 
                        e.preventDefault();
                        handleSubmit(e);}}
                        className='btnsub'>Save card Details</button>
                    </div> */}
                </div>
               
                {/* <div className="card mb-4 mb-lg-0">
                  <div className="card-body">
                    <p><strong>We accept</strong></p>
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp" alt="PayPal acceptance mark" />
                </div>
                </div> */}
              </div>
            </div>
          </div>


   


          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Need to pay</h5>
              </div>
              <div className="card-body">
              Price
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  readOnly
                  placeholder="write a Price"
                  className="form-control"
                  // onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              Discription
              <div className="mb-3">
                <textarea
                  value={Discription}
                  placeholder="Discription"
                  className="form-control"
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              <div className='item9'>
              <button
              // onClick={(e) => { 
              //   e.preventDefault();
              //   handleSubmit(e);}}
              className='btnsub' >Pay</button>
            </div>
              </div>
              
            </div>
            <div className="card mb-4">
                <div className="card-body">
                <div className="mb-3">
                    <p><strong>Expected shipping delivery</strong></p>
                    <p className="mb-0"><b><h5>{todatDate}-{formattedDeliveryDate}</h5></b>(maximum 10 working days)</p>
                </div>

                </div>
                </div>
            
              <h8> <li className="list-group-item d-flex justify-content-between align-items-center px-0">Shipping charege may relese up to 3 or more items </li></h8>
            </div>
          
        </div>
        {/* <div className='item9'>
              <button type='submit' className='btnsub'>Pay</button>
            </div> */}
      </div>
    </form>
    </section>
     

    <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}>
                {modalContent}
              </Modal>      

      </Layout1>
    </div>
  )
}

export default KAcardpayment