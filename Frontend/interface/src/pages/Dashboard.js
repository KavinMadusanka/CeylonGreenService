import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import './Dashborad.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-header">Welcome Ceylon Green Cleaning Service</h2>
        
        {/* Programs Component */}
        <div className="dashboard-section">
          <Link to="/viewPrograms">
            <button className="dashboard-button">View Programs</button>
          </Link>
        </div>
        <div className="dashboard-section">
          <Link to="/addPrograms">
            <button className="dashboard-button">Add Programs</button>
          </Link>
        </div>
        
        {/* Employee Enrollment Component */}
        <div className="dashboard-section">
          <Link to="/enrollments">
            <button className="dashboard-button">EmployeeEnrollment</button>
          </Link>
        </div>
        

      </div>
    </Layout>
  );
};

export default Dashboard;
