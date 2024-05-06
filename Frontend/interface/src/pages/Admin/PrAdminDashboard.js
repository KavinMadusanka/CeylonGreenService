import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import axios from "axios";
import "../../components/PrAdminDashboard.css";

const PrAdminDashboard = () => {
  const [reorderAlerts, setReorderAlerts] = useState([]);

  useEffect(() => {
    fetchReorderAlerts();
  }, []);

  const fetchReorderAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/reorder-alerts");
      setReorderAlerts(response.data); // Assuming the response contains an array of reorder alerts
    } catch (error) {
      console.error("Error fetching reorder alerts:", error);
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Reorder Alerts</h1>
          <div className="reorder-alerts">
            {reorderAlerts.map((alert, index) => (
              <div key={index} className="alert">
                <h3>{alert.name}</h3>
                <p>Quantity: {alert.quantity}</p>
                <p>Reorder Level: {alert.reorderLevel}</p>
              </div>
            ))}
            {reorderAlerts.length === 0 && (
              <p>No reorder alerts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrAdminDashboard;