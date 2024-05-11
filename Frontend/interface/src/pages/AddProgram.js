import React, { useState } from 'react';
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from '@mui/material';

import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddProgram() {

    const navigate = useNavigate();
    const [newNotice, setNewNotice] = useState({
        programName: '',
        description: '',
        startDate: '',
        endDate: '',
        trainer: '',
        capacity: ''
    });

    const publishNotice = async () => {
        if (
            !newNotice.programName ||
            !newNotice.description ||
            !newNotice.startDate ||
            !newNotice.endDate ||
            !newNotice.trainer ||
            !newNotice.capacity
        ) {
            toast.error('Please fill in all fields.');
            return;
        }
        if (
            newNotice.capacity >= 50
        ) {
            toast.error('Capacity should be less than 50');
            return;
        }
        try {
            const result = await fetch(`http://localhost:8000/api/v1/programs/create-program`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotice),
            });
            const data = await result.json();

            if (result.ok) {
                console.log('Notice Published successfully:', data);
                toast.success(data.message);
                navigate('/viewPrograms')
               // refreshPage();
            } else {
                console.error('Error creating teacher:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating teacher:', error);
            toast.error('An error occurred while creating the teacher.');
        }
    };

    const handleCreateProgram = (field, value) => {
        setNewNotice((prevData) => ({ ...prevData, [field]: value }));
    };

    const validateTextOnly = (text) => {
        const regex = /^[a-zA-Z\s]*$/; // Regex to allow only alphabets and spaces
        return regex.test(text);
    };
    
    const handleProgramNameChange = (e) => {
        const inputText = e.target.value;
        if (validateTextOnly(inputText)) {
            handleCreateProgram('programName', inputText);
        }
    };

    const handleTrainerChange = (e) => {
        const inputText = e.target.value;
        if (validateTextOnly(inputText)) {
            handleCreateProgram('trainer', inputText);
        }
    };
    

    return (
        <Layout title="enrollments">
            <div style={{ textAlign: 'center' }}>
                <DialogTitle>Add Program</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1,
                                width: 500,
                                maxWidth: '100%',
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="notice-title"
                                label="Program Name"
                                fullWidth
                                onChange={handleProgramNameChange}
                                value={newNotice.programName}
                            />
                        </div>
                        <div>
                            <TextField
                                id="notice-discription"
                                label="Discription"
                                multiline
                                rows={4}
                                fullWidth
                                onChange={(e) => handleCreateProgram('description', e.target.value)}
                                value={newNotice.description}
                            />
                        </div>
                        <div>
                            <TextField
                                id="start-date"
                                label="Start Date"
                                fullWidth
                                type="date"
                                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => handleCreateProgram('startDate', e.target.value)}
                                value={newNotice.startDate}
                            />
                        </div>
                        <div>
                            <TextField
                                id="end-date"
                                label="End Date"
                                fullWidth
                                type="date"
                                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => handleCreateProgram('endDate', e.target.value)}
                                value={newNotice.endDate}
                            />
                        </div>

                        <div>
                            <TextField
                                id="notice-title"
                                label="Trainer"
                                fullWidth
                                onChange={handleTrainerChange}
                                value={newNotice.trainer}
                            />
                        </div>

                        <div>
                            <TextField
                                id="notice-title"
                                label="Capacity"
                                fullWidth
                                type="number"
                                inputProps={{ max: 50 }}
                                onChange={(e) => handleCreateProgram('capacity', e.target.value)}
                                value={newNotice.capacity}
                            />

                        </div>
                    </Box>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={publishNotice} variant='outlined'>Add Program</Button>
                    <Button onClick={() => { navigate('/viewPrograms') }} color='error' variant='outlined'>Cancel</Button>
                </DialogActions>
            </div>
        </Layout>
    )
}
