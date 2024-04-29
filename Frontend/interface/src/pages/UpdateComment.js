import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import '../components/UpdateComment.css';

const UpdateComment = () => {
    const { commentId } = useParams(); // Get the comment ID from URL params

    // State for storing the comment description
    const [commentDescription, setCommentDescription] = useState('');

    // Fetch the comment description when the component mounts
    useEffect(() => {
        const fetchCommentDescription = async () => {
            try {
                // Fetch the comment details from the backend using its ID
                const response = await axios.get(`http://localhost:8080/api/v1/comments/get-comment/${commentId}`);
                if (response.data.success) {
                    setCommentDescription(response.data.comment.commentDescription);
                } else {
                    console.error('Failed to fetch comment:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        };

        fetchCommentDescription();

    }, [commentId]);

    // Handle comment description change
    const handleCommentChange = (event) => {
        setCommentDescription(event.target.value);
    };

    // Handle updating the comment
    const handleUpdateComment = async () => {
        try {
            // Send updated comment data to the backend
            const response = await axios.patch(`http://localhost:8080/api/v1/comments/update-comment/${commentId}`, {
                commentDescription,
            });

            if (response.data.success) {
                toast.success('Comment updated successfully.');
            } else {
                toast.error('Failed to update comment.');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            toast.error('Error updating comment.');
        }
    };

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1>Update Comment</h1>
                <textarea
                    value={commentDescription}
                    onChange={handleCommentChange}
                    style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                />
                <button onClick={handleUpdateComment}>Update Comment</button>
            </div>
        </Layout>
    );
};

export default UpdateComment;
