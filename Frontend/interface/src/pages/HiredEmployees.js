import React, { useState, useEffect } from 'react';
import './HiredEmployees.css';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import '../components/HiredEmployees.css';


const HiredEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [feedbacks, setFeedbacks] = useState({}); // Store feedback data in state

    // Use effect to fetch all employees and feedbacks when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch employees data
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/employees/get-employees');
            if (response.data.success) {
                setEmployees(response.data.employees);
                // Fetch feedback data for each employee
                response.data.employees.forEach(async (employee) => {
                    const feedbackResponse = await axios.get(`http://localhost:8080/api/feedbacks/${employee._id}`);
                    if (feedbackResponse.data.success) {
                        setFeedbacks(prevFeedbacks => ({
                            ...prevFeedbacks,
                            [employee._id]: feedbackResponse.data.feedback,
                        }));
                    }
                });
            } else {
                console.error('Failed to fetch employees:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

// Function to handle like button click
const handleLikeClick = async (employeeId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/feedbacks/like/${employeeId}`);
        if (response.data.success) {
            // Update feedbacks state with the new like count
            setFeedbacks(prevFeedbacks => ({
                ...prevFeedbacks,
                [employeeId]: {
                    ...prevFeedbacks[employeeId],
                    likes: prevFeedbacks[employeeId]?.likes + 1 || 1,
                },
            }));
            // Show success toast message
            toast.success('Liked successfully');
        } else {
            // Show error toast message
            toast.error('Failed to add like');
        }
    } catch (error) {
        console.error('Error updating like:', error);
        // Show error toast message
        toast.error('Error adding like');
    }
};

// Function to handle dislike button click
const handleDislikeClick = async (employeeId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/feedbacks/dislike/${employeeId}`);
        if (response.data.success) {
            // Update feedbacks state with the new dislike count
            setFeedbacks(prevFeedbacks => ({
                ...prevFeedbacks,
                [employeeId]: {
                    ...prevFeedbacks[employeeId],
                    dislikes: prevFeedbacks[employeeId]?.dislikes + 1 || 1,
                },
            }));
            // Show success toast message
            toast.success('Disliked successfully');
        } else {
            // Show error toast message
            toast.error('Failed to add dislike');
        }
    } catch (error) {
        console.error('Error updating dislike:', error);
        // Show error toast message
        toast.error('Error adding dislike');
    }
};


    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1><center>WE ARE HIRED</center></h1>
                <hr style={{ width: '100%' }} />

                

                {employees.map((employee) => (
                    <div
                        key={employee._id} className="container"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            columnGap: '50px',
                            width: '80%',
                            height: '400px',
                            marginBottom: '20px',
                        }}
                    >
                        {/* Left section */}
                        <div className="left-section">
                            <div className="personal-info">
                                <div className="profile-section box">
                                    <img src={employee.profileImageUrl} alt="User Profile" style={{
                                        width: '50px',
                                        height: '150px',
                                    }} />
                                </div>
                                <div className="details">
                                    <h2>
                                        {employee.firstname} {employee.lastname}
                                    </h2>
                                    <div className="info-row">
                                        <span className="label">Status:</span>
                                        <span className="value"> {employee.status}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Address:</span>
                                        <span className="value"> {employee.address}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Email:</span>
                                        <span className="value"> {employee.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="right-section">
                            <div className="profile-section box">
                                <h2><center>Basic Information</center></h2>
                                <div className="info-row">
                                    <span className="label">First Name:</span>
                                    <span className="value"> {employee.firstname}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Last Name:</span>
                                    <span className="value"> {employee.lastname}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Phone (Work):</span>
                                    <span className="value"> {employee.phone}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Gender:</span>
                                    <span className="value"> {employee.gender}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Pronouns:</span>
                                    <span className="value"> {employee.pronouns}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Salary:</span>
                                    <span className="value"> {employee.salary}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Leaves:</span>
                                    <span className="value"> {employee.leaves}</span>
                                </div>
                            </div>

                            <div className="action-buttons">
                                {/* Like button with likes count */}
                                <button className="thumb-up" onClick={() => handleLikeClick(employee._id)}>
                                    &#128077; {feedbacks[employee._id]?.likes || 0}
                                </button>
                                
                                {/* Dislike button with dislikes count */}
                                <button className="thumb-down" onClick={() => handleDislikeClick(employee._id)}>
                                    &#128078; {feedbacks[employee._id]?.dislikes || 0}
                                </button>

                                {/* Add comment button */}
                                <Link to={`/addcomment/${employee._id}`} className="link-with-icon"><FaEdit/></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default HiredEmployees;