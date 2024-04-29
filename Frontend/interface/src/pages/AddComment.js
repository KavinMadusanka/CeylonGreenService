import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import '../components/AddComment.css';
import { FaTrash } from 'react-icons/fa';

const AddComment = () => {
    const { employeeId } = useParams(); // Get the employee ID from URL params

    // State for storing user details
    const [user, setUser] = useState(null);

    // State for storing employee details
    const [employee, setEmployee] = useState(null);

    // State for storing comment text
    const [commentText, setCommentText] = useState('');

    // State for storing previous comments
    const [comments, setComments] = useState([]);

    // Fetch user details and previous comments when component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Fetch user details from the backend
                const response = await axios.get('http://localhost:8080/api/v1/users');
                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    console.error('Failed to fetch user:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // Fetch employee details based on ID
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/employees/get-employee/${employeeId}`);
                if (response.data.success) {
                    setEmployee(response.data.employee);
                } else {
                    console.error('Failed to fetch employee:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        // Fetch previous comments with sender's name based on employee ID
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/comments/get-comments/${employeeId}`);
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    console.error('Failed to fetch comments:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchUserDetails();
        fetchEmployeeDetails();
        fetchComments();

    }, [employeeId, user]);

    // Handle comment text change
    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    // Handle comment submission
    const handleSubmitComment = async () => {
        try {
            // Check if comment text is empty
            if (!commentText.trim()) {
                toast.error('Please enter a comment.');
                return;
            }

            // Send comment data to the backend
            const response = await axios.post(`http://localhost:8080/api/v1/comments/create-comment`, {
                employeeId,
                commentDescription: commentText,
            });

            if (response.data.success) {
                toast.success('Comment added successfully.');
                // Clear comment text after successful submission
                setCommentText('');
                // Update comments state with the new comment
                setComments([...comments, response.data.comment]);
            } else {
                toast.error('Failed to add comment.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error('Error submitting comment.');
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/comments/delete-comment/${commentId}`);
            if (response.data.success) {
                setComments(comments.filter(comment => comment._id !== commentId));
                toast.success('Comment deleted successfully.');
            } else {
                toast.error('Failed to delete comment.');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Error deleting comment.');
        }
    };

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1><center>WE VALUE YOUR COMMENT</center></h1>
                <hr style={{ width: '100%' }} />

                {employee && (
                    <div className="container">
                        <div className="left-section">
                            <div className="personal-info">
                                <div className="profile-section box">
                                    <img src={employee.profileImageUrl} alt="User Profile" style={{ width: '50px', height: '150px' }} />
                                </div>
                                <div className="details">
                                    <h2>{employee.firstname} {employee.lastname}</h2>
                                    <div className="info-row">
                                        <span className="label">Status:</span>
                                        <span className="value">{employee.status}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Address:</span>
                                        <span className="value">{employee.address}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Email:</span>
                                        <span className="value">{employee.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="profile-section box">
                                <h2><center>Add Your Comment</center></h2>
                                <textarea
                                    value={commentText}
                                    onChange={handleCommentChange}
                                    placeholder="Enter your comment..."
                                    style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                                />
                                <button onClick={handleSubmitComment}><b>SUBMIT</b></button>
                                {comments.length > 0 && (
                                    <Link to={`/updatecomment/${comments[comments.length - 1]._id}`}><button><b>UPDATE</b></button></Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <h2>Previous Comments</h2>
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p>Posted by: {comment.senderName}</p>
                        <p>{comment.createdAt}</p>
                        <p>{comment.commentDescription}</p>
                        <div className="delete-button" onClick={() => deleteComment(comment._id)}>
                            <FaTrash />
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default AddComment;
