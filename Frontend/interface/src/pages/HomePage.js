import React from 'react';
import Layout from '../components/Layout/Layout';
import homeImage1 from '../Images/HomeImage1.jpg'
import '../components/HomePage.css';

const HomePage = () => {
    return (
        <Layout title={'Home - Ceylon Green'}>
            <img src={homeImage1} alt="Ceylon Green Solutions" className="header-image" />
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1>CEYLON GREEN SOLUTIONS</h1>
                    <p>Revolutionizing Cleaning Management Since 2023</p>
                </section>

                {/* Why Choose Ceylon Green Section */}
                <section className="why-choose-section">
                    <div className="section-title">
                        <h2>Why Choose Ceylon Green Solutions?</h2>
                        <div className="underline"></div>
                    </div>
                    <p>Ceylon Green is a cleaning management company that has been operating since 2023. Founded by three dedicated individuals, we recognized the challenges faced by cleaning companies in managing their operations efficiently and effectively.</p>
                    <p>In addition to our focus on technology, we are committed to providing exceptional customer service. Our cleaning management system offers various features such as scheduling, task assignment, inventory management, and real-time reporting, streamlining operations and enhancing customer satisfaction.</p>
                </section>

                {/* Benefits Section */}
                <section className="benefits-section">
                    <div className="section-title">
                        <h2>Benefits of Our Cleaning Management System</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="benefit-item">
                        <h3>Efficient Operations</h3>
                        <p>Automate manual processes and reduce paperwork, saving valuable time and resources.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>Improved Communication</h3>
                        <p>Enhance communication between staff members and improve overall team collaboration.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>Enhanced Customer Satisfaction</h3>
                        <p>Offer exceptional service and maintain a clean and organized database with accurate records.</p>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="cta-section">
                    <h2>Ready to Transform Your Cleaning Business?</h2>
                    <p>Contact us today to learn more about our innovative cleaning management system and request a demo.</p>
                    <button className="cta-button">Contact Us</button>
                </section>
            </div>
        </Layout>
    );
};

export default HomePage;
