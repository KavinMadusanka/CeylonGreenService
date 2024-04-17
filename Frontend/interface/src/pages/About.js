import React from 'react';
import Layout from './../components/Layout/Layout';


const About = () => {
  return (
    <Layout title={'About us - Ceylon Green'}>
          <div className='privacy'>
            {/* <img src="cleaning-scene.jpg" alt="Person cleaning kitchen counter with eco-friendly products" /> */}
            <section>
              <h2>Our Story</h2>
              <p>Ceylon Green was born from the vision of a cleaner, healthier future for both homes and the planet. We observed the disconnect between effective cleaning and eco-friendly solutions. Inspired by this, we built a comprehensive web application that empowers you to achieve a sparkling clean home while prioritizing sustainability.</p>
            </section>
            <section>
              <h2>Our Mission</h2>
              <h3>Seamless Web Application Experience:</h3>
              <ul>
                <li>Discover Eco-Friendly Cleaning Items: Find a curated selection of safe and effective cleaning products that are gentle on your family, pets, and the environment.</li>
                <li>Invest in Cleaning Training Programs: Enhance your cleaning skills with our expertly designed training programs. Learn valuable tips, techniques, and best practices to tackle any cleaning challenge with confidence.</li>
                <li>Experience a Secure Payment System: Enjoy a safe and secure online shopping experience with our trusted payment gateway.</li>
              </ul>
            </section>
            <section>
              <h2>More Than Just Products</h2>
              <p>Ceylon Green goes beyond simply providing cleaning supplies. We offer a comprehensive solution that caters to your cleaning needs:</p>
              <ul>
                <li>Connect with Reliable Cleaning Services: Find experienced and trustworthy cleaning professionals in your area through our convenient web application platform.</li>
                <li>Learn from the Experts: Explore our library of informative articles, helpful tips, and expert-led cleaning guides. Gain the knowledge to clean effectively and efficiently.</li>
              </ul>
            </section>
            {/* <section>
              <h2>Meet the Team (Optional)</h2>
              <p>Introduce your team members with brief bios and photos here. This helps personalize your company and build trust with users.</p>
            </section> */}
            <section>
              <h2>Why Choose Ceylon Green?</h2>
              <ul>
                <li><strong>Eco-Conscious Cleaning:</strong> We prioritize eco-friendly products and promote sustainable practices for a healthier planet.</li>
                <li><strong>Empowering Web Application:</strong> Discover, learn, connect, and achieve clean – all in one convenient platform.</li>
                <li><strong>Skill-Building Training Programs:</strong> Invest in your cleaning knowledge and become a cleaning pro.</li>
                <li><strong>Reliable Cleaning Services:</strong> Find trustworthy professionals to handle the cleaning while you focus on what matters.</li>
                <li><strong>Safe &amp; Secure Transactions:</strong> Enjoy peace of mind with a secure online shopping experience.</li>
              </ul>
            </section>
            <section>
              <h2>Ready to Get Started?</h2>
              <p>Explore our curated selection of eco-friendly cleaning products on our web application. Enroll in a cleaning training program to refine your skills. If you prefer a helping hand, connect with local cleaning services right on our platform. Let Ceylon Green show you how to achieve a clean and healthy home in an eco-friendly and sustainable way!</p>
            </section>
            <section>
              <h2>Contact Us</h2>
              <p>Have questions or feedback? We'd love to hear from you! Reach out to us through our web application or email us at <a href="mailto:[your email address]">ceylongreenservice@gmail.com</a>.</p>
            </section>
          </div>

    </Layout>
  );
};

export default About;