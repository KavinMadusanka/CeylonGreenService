import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import axios from "axios";
import "../../components/PrAdminDashboard.css";
import ReorderForm from "../../components/Form/ReorderForm"; // Import ReorderForm component
import Layout1 from "../../components/Layout/Layout1";


const PrAdminDashboard = () => {
  const [reorderAlerts, setReorderAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    fetchReorderAlerts();
  }, []);

  const fetchReorderAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/reorder-alerts");
      setReorderAlerts(response.data); // Assuming the response contains an array of reorder alerts
      fetchReorderAlerts();
    } catch (error) {
      console.error("Error fetching reorder alerts:", error);
    }
  };

  const handleReorderClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleCloseForm = () => {
    setSelectedAlert(null);
  };

  return (
    <Layout1 >
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Reorder Alerts</h1>
          <div className="reorder-alerts">
            {reorderAlerts.map((alert, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title">{alert.name}</h3>
                  <p className="card-text">Quantity: {alert.quantity}</p>
                  <p className="card-text">Reorder Level: {alert.reorderLevel}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReorderClick(alert)}
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
            {reorderAlerts.length === 0 && (
              <p>No reorder alerts available</p>
            )}
          </div>
        </div>
      </div>
      {/* Render ReorderForm if selectedAlert is not null */}
      {selectedAlert && (
        <div className="reorder-form-container">
          <ReorderForm
            productId={selectedAlert.productId}
            productName={selectedAlert.name}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
    </Layout1>
  );
  
};

export default PrAdminDashboard;