import React from 'react'
import { useState ,useEffect} from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import { useAuth } from '../Context/GetToken';
import { token } from 'morgan';
import Footer from './Footer';
import Header from './Header';




// Cart login function 

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [auth,setAuth]=useAuth();
    const navigate = useNavigate();
  
//Check whether token is exist 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            
        }
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/vi/User/getLoginDetails', { userName, password });
            // Assuming the response contains token and user data
            localStorage.setItem('token', response.data.token);
            setAuth({
                ...auth,
                user:response.data.user,
                token:response.data.token,
            });
            //Login successful!
            //store token in localstorage 
            localStorage.setItem('auth',JSON.stringify(response.data))
            // Display success message using JavaScript alert
        alert('Login successful!');
        navigate('/');

            
            
            
        } catch (error) {
            //setErrorMessage('Invalid username or password');
        }

        
    };

    return (
        <section>
            <Header/>
            <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight"> Ceylon green shop
                                The best offer <br />
                                <span  id='for_your_business'>for your Shopping experience</span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Do you need to get best shopping experience for purchasing cleaning 
                                items such as electronic items ,chemicals and all the necessary items 
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="username" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-success" id="loginbtn">Login</button>
                                    </form>
                                    {errorMessage && <p>{errorMessage}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>

        
    );
};

export default Login;