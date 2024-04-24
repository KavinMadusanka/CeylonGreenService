import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';

const Appointment2 = () => {
    const [cleanerType, setCleanerType] = useState('');
    const navigate = useNavigate();

    const handleSelect = (type) => {
        setCleanerType(type);
    };

    useEffect(() => {
        if (cleanerType === 'Individual Cleaner') {
            navigate('/appointment3i');
        } else if (cleanerType === 'Team') {
            navigate('/appointment3ii');
        }
    }, [cleanerType, navigate]);

    return (
        <Layout1 title={'Select Cleaner Type - Ceylon Green'}>
            <div className="home-container">
                <section className="cleaner-type-section">
                    <div className="section-title">
                        <h2>Select Cleaner Type</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="cleaner-type-buttons">
                        <button 
                            className={`cleaner-type-button ${cleanerType === 'Individual Cleaner' ? 'active' : ''}`}
                            onClick={() => handleSelect('Individual Cleaner')}
                        >
                            Individual Cleaner
                        </button>
                        <button 
                            className={`cleaner-type-button ${cleanerType === 'Team' ? 'active' : ''}`}
                            onClick={() => handleSelect('Team')}
                        >
                            Team
                        </button>
                    </div>
                </section>
            </div>
        </Layout1>
    );
};

export default Appointment2;
