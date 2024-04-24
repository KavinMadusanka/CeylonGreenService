import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout1 from '../components/Layout/Layout1';
import '../components/Appointment.css';

const Appointment3ii = () => {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch mock data for teams (including ratings)
        fetch('/api/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const handleSelectTeam = (team) => {
        navigate('/appointment4', { state: { ...team, cleanerType: 'Team' } });
    };

    return (
        <Layout1 title={'Select Team - Ceylon Green'}>
            <div className="home-container">
                <section className="team-list-section">
                    <div className="section-title">
                        <h2>Select Team</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="team-list">
                        {teams.map(team => (
                            <div key={team.id} className="team-item" onClick={() => handleSelectTeam(team)}>
                                <h3>{team.name}</h3>
                                <p>Rating: {team.rating} ({team.reviews} reviews)</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout1>
    );
};

export default Appointment3ii;
