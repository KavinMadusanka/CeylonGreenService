import React, { useEffect,useState } from 'react'
import Layout1 from './../components/Layout/Layout1';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import {}  from '../components/paymentpage.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import KAddaddress from './KAddaddress';
import { Modal } from "antd";
import KAddcard from './KAddcard';
import jsPDF from "jspdf";
import "jspdf-autotable";

const Paymentpage = () => {
  const [Addre,setAddress] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [filteredCard, setFilteredCard] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  //car details decleare
  const [Card,setCard] = useState([]);
  const [cHolder, setCHolder] = useState("");
  const [cName, setcName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCVV] = useState("");
  
  // get all address
  const getAllAddress = async() =>{
    try {
      const {data} = await axios.get(`api/v1/auth/get-Address/${email}`);
      if(data.success){
        setAddress(data.address);
        getAllAddress();
      }
    } catch (error) {
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
    // const getAllAddress = async (email) => {
    //   try {
    //     const { data } = await axios.get(`/api/v1/auth/get-Address/${email}`);
    //     if (data.success) {
    //       setAddress(data.address);
    //        toast.success(data.message);          
    //     } 
    //   } catch (error) {
    //     console.log(error);
    //     toast.error('Something went wrong in getting addresses');
    //   }
    // };
    getAllAddress();
    
  },[email])
  // console.log(email)

  //update address
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.put(
  //       `/api/v1/category/update-Address/${selected._id}`,
  //       { name: updatedName }
  //     );
  //     if (data?.success) {
  //       toast.success(`${updatedName} is updated`);
  //       setSelected(null);
  //       setUpdatedName("");
  //       setVisible(false);
  //       getAllAddress();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //handel delete address
  const handleDelete = async (AId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/auth/delete-Address/${AId}`
      );
      if (data.success) {
        toast.success('Address deleted successfully');

        getAllAddress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  // Function to handle modal visibility and content
  const handleModal = (content) => {
    setVisible(true);
    setModalContent(content);
  };

    // Handle edit button click for address edit funtion
    const handleEdit = (id) => {
      navigate(`/KAddressUpdate/${id}`);
    };
  
  // Filter Address based on search term using addresses and names
  useEffect(() => {
    const filtered = Addre.filter((address) =>
    address.address.toLowerCase().includes(searchTerm.toLowerCase()) || address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.province.toLowerCase().includes(searchTerm.toLowerCase()) || address.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAddresses(filtered);
  }, [searchTerm, Addre]);

  useEffect(() => {
    const filtered = Card.filter((cards) =>
    cards.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCard(filtered);
  }, [searchTerm, Card]);

/////////////////////////////////////////////////////////////

//get all card details
const getAllCard = async() =>{
  try {
    const {data} = await axios.get(`api/v1/auth/get-Card/${email}`);
    if(data.success){
      setCard(data.cards);
      getAllCard();
    }
  } catch (error) {
    // toast.error('ganna baggggg');
    console.log(error);
    // toast.error('Somthing went wrong in getting Address');
  }
};

useEffect(() => {
  getAllCard();
},[email])

const handleDeleteCard = async (CId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/auth/delete-card/${CId}`
    );
    if (data.success) {
      toast.success('Card Details deleted successfully');

      getAllAddress();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};

    // Handle edit button click for card edit function
    const handleEditCard = (id) => {
      navigate(`/KAcardUpdate/${id}`);
    };

/////////////////////////////////////////////////////////////


  // Function to download PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Address Details", 10, 10);
    const columns = ["name","address","Contact Number","province","district","postalcode"];
    const rows = Addre.map(c => [
      c.name,
      c.address,
      c.cNumber,
      c.province,
      c.district,
      c.postalcode
    ])
    doc.autoTable({ head: [columns], body: rows });
    doc.save("Address_report.pdf");
  };



  return (
    <Layout1 title={'Home - Ceylon Green'}>
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        <div id='toppart'>
              <div className='searchbar w-25' >
              {/* Search input */}
              <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                    // style={{border:'solid 1px'}}
                    />
                  <button className="btn btn-primary mb-3" id='btnedit2' onClick={generatePDF} >Download Report</button>
              </div>
          </div>
        
        {/* display card details  */}
        <div className='div'>
        <table style={{ borderCollapse: 'collapse', width: '100%',marginLeft: '1%' }}>
        <thead>
                    <tr>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Card Holder Name</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Card Number</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Expire Month</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Expire Year</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>CVV</th>
                        {/* <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Email</th> */}
                        <th scope='col' style={{ border: '1px solid white', padding: '10px', textAlign: 'center' }} colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {filteredCard.map((c) => (
                    <tr key={c._id}>
                        <td >{c.name}</td>
                        <td >{c.cardNumber}</td>
                        <td >{c.month}</td>
                        <td >{c.year}</td>
                        {/* <td >{c.cvv}</td> */}
                        <td >XXX</td>
                        {/* <td >{c.email}</td> */}
                        <td className='btn'>
                          <button className="btn btn-primary" id="btnedit"
                          onClick={() => { handleEditCard(c._id);}}>
                            Edit
                          </button>
                        </td>
                        <td className='btn'>
                          <button className="btn btn-danger" 
                            onClick={() => {
                            handleDeleteCard(c._id);
                            }}>
                              Delete
                            </button>
                        </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className='Link'>
                      {/* <Link to={"/kaddaddress"}> */}
                        <button onClick={() => { handleModal(<KAddcard />);}}>Add New card</button>
                      {/* </Link> */}
                    </td>

                  </tr>
                </tbody>
        </table>
        </div>


        {/* display delivery details table */}
        <div className='div'>
        <table style={{ borderCollapse: 'collapse', width: '100%',marginLeft: '1%' }}>
        <thead>
                    <tr>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Name</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Address</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Contact No:</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Province</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>District</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px' }}>Postalcode</th>
                        <th scope='col' style={{ border: '1px solid white', padding: '10px', textAlign: 'center' }} colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {filteredAddresses.map((c) => (
                    <tr key={c._id}>
                        <td >{c.name}</td>
                        <td >{c.address}</td>
                        <td >{c.cNumber}</td>
                        <td >{c.province}</td>
                        <td >{c.district}</td>
                        <td >{c.postalcode}</td>
                        <td className='btn'>
                          <button className="btn btn-primary" id="btnedit"
                          onClick={() => { handleEdit(c._id);}}>
                            Edit
                          </button>
                        </td>
                        <td className='btn'>
                          <button className="btn btn-danger" 
                            onClick={() => {
                            handleDelete(c._id);
                            }}>
                              Delete
                            </button>
                        </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className='Link'>
                      {/* <Link to={"/kaddaddress"}> */}
                        <button onClick={() => { handleModal(<KAddaddress />);}}>Add New Deliver Address</button>
                      {/* </Link> */}
                    </td>

                  </tr>
                </tbody>
        </table>
        </div>
        <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}>
                {modalContent}
              </Modal> 
    </Layout1>
  )
}

export default Paymentpage