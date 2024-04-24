import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';

const Appointment3i = () => {
    const [cleaners, setCleaners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch mock data for individual cleaners (including ratings)
        fetch('/api/individual-cleaners')
            .then(response => response.json())
            .then(data => setCleaners(data))
            .catch(error => console.error('Error fetching individual cleaners:', error));
    }, []);

    const handleSelectCleaner = (cleaner) => {
        navigate('/appointment4', { state: { ...cleaner, cleanerType: 'Individual Cleaner' } });
    };

    return (
        <Layout1 title={'Select Individual Cleaner - Ceylon Green'}>
            <div className="home-container">
                <section className="cleaner-list-section">
                    <div className="section-title">
                        <h2>Select Individual Cleaner</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="cleaner-list">
                        {cleaners.map(cleaner => (
                            <div key={cleaner.id} className="cleaner-item" onClick={() => handleSelectCleaner(cleaner)}>
                                <h3>{cleaner.name}</h3>
                                <p>Rating: {cleaner.rating} ({cleaner.reviews} reviews)</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout1>
    );
};

export default Appointment3i;
