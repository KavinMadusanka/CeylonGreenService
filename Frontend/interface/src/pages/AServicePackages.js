import React, { useEffect, useState } from 'react';
import Layout1 from '../components/Layout/Layout1'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { Modal } from "antd";


const AServicePackages = () => {
    //const {id} = useParams();
    const [packages, setPackages] = useState([]);
    const [Pname, setPname] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [filteredPackages, setFilteredPackages] = useState([]);

    const [mode, setMode] = useState('add');


    const getAllPackages = async () => {
        try {
            const { data } = await axios.get('/api/v1/appointment/read-sp');
            setPackages(data.spackages);
            setFilteredPackages(data.spackages);
            getAllPackages();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPackages();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        // Handle add mode
        const res = await axios.post('/api/v1/appointment/create-sp', {
          Pname,
          price
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setPname('');
          setPrice('');
          getAllPackages();
        } else {
          toast.error(res.data.message);
        }
      } else if (mode === 'edit') {
        // Handle edit mode
        const res = await axios.put(`/api/v1/appointment/update-sp/${id}`, {
          Pname,
          price
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setPname('');
          setPrice('');
          getAllPackages();
          setMode('add');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (pkg) => {
    // Set the package data to input fields
    setPname(pkg.Pname);
    setPrice(pkg.price);
    setId(pkg._id);
    // Change mode to 'edit'
    setMode('edit');
  };



      //handel delete address
  const handleDelete = async (pkgId) => {
    const confirmed = window.confirm("Are you sure you want to delete this service package?");
  if (confirmed) {
    try {
      const { data } = await axios.delete(`/api/v1/appointment/delete-sp/${pkgId}`);
      if (data.success) {
        toast.success('Service Package deleted successfully');
        getAllPackages();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  };
  



  return (
    <Layout1>
         <div className ="row flex-nowrap">
        {/* // add dash board part in there */}
                
        <div className ="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor:"#BFEA7C"}}>
            <div className ="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <span className ="fs-5 fw-bolder d-none d-sm-inline" style={{color:'#416D19'}}>
                        Appointment Manager
                    </span>
                <ul
                    className ="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="Menu"
                    >
                    
                    <li className ="w-100">
                        <Link 
                            to = "/appointmentdashboard"
                            className ="nav-link px-0 align-middle "style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-speedometer2 ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">
                                Manage Appointments</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "/servicepackages"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-columns ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Service Packages</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "/smdashboard/profile"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-person ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Profile</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link 
                            to = "#"
                            className ="nav-link px-0 align-middle" style={{color:'#416D19'}}
                        >
                            <i className ="fs-4 bi-power ms-2"></i>
                            <span className ="ms-2 d-none d-sm-inline">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

                {/* // add dash board part in there */}

                <div className='aservicepkg' style={{ width:'82.5%' }}>
                <section className="h-100 gradient-custom">
                    <div className="container py-0">
                        <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Serive Packages</h5>
                            </div>
                            <div className="card-body">
                            <table style={{ borderCollapse: 'collapse', width: '100%',}}>
                                <thead style={{backgroundcolor:'#BFEA7C'}}>
                                            <tr style={{backgroundColor:'#f5f5f5'}}>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Package Name</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C' }}>Price (Rs.)</th>
                                                <th scope='col' style={{ border: '1px solid #dddddd', padding: '10px' ,backgroundColor:'#BFEA7C'}}></th>
            
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filteredPackages.map((p) => (
                                            <tr key={p._id} style={{backgroundColor:'#d6f6a3', cursor: 'pointer'}} 
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF67E'} 
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d6f6a3'}>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>{p.Pname}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'right'}}>{p.price}.00</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px' ,textAlign:'left'}}>
                                                <div className="buttonset">
                                                        <button className="edit-btn" onClick={() => handleEdit(p)}><a>Edit</a></button>
                                                        <button className="delete-btn"
                                                        onClick={() => {
                                                            handleDelete(p._id);
                                                            }}> Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>

                            </div>
                            </div>
                        </div>


                


                        <div className="col-md-4">
                            <div className="card mb-4">
                            <div className="card-header py-3">
                            <h5 className="mb-0">{mode === 'add' ? 'Add Service Package' : 'Update Service Package'}</h5>
                            </div>
                            <div className="card-body">
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                type="text"
                                value={Pname}
                                onChange={(e) => setPname(e.target.value)}
                                placeholder="Enter package name"
                                required
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input
                                type="text"
                                value={price}
                                onChange={(e) => {
                                    // Remove non-numeric characters from the input value
                                    const newValue = e.target.value.replace(/[^\d]/g, '');
                                    setPrice(newValue);
                                }}
                                placeholder="Enter price"
                                required
                                ></input>
                            </div>

                            <div className="form-buttons">
                                <button type="submit">{mode === 'add' ? 'Add' : 'Update'}</button>
                            </div>
                            </form>
                            </div>



                            {/*  */}
                            {/* <div className="card-header py-3">
                            <h5 className="mb-0">Add Service Package</h5>
                            </div>
                            <div className="card-body">
                            <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                type="text"
                                value={Pname}
                                onChange={(e) => setPname(e.target.value)}
                                placeholder="Enter package name"
                                required
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input
                                type="text"
                                value={price}
                                onChange={(e) => {
                                    // Remove non-numeric characters from the input value
                                    const newValue = e.target.value.replace(/[^\d]/g, '');
                                    setPrice(newValue);
                                }}
                                placeholder="Enter price"
                                required
                                ></input>
                            </div>

                            <div className="form-buttons">
                                <button type="submit">Add</button>
                            </div>
                            </form>
                            </div> */}
                            {/*  */}
                            
                            </div>
                            <div className="card mb-4">
                            <div className="card-body">
                            <h6 className="mb-0">Total Service Packages: {packages.length}</h6>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            </div>
            </div>
    </Layout1>
  )
}

export default AServicePackages