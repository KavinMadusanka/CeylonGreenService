import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../components/ReorderForm.css";


const ReorderForm = ({ productId, productName, onClose }) => {
  const [reorderQuantity, setReorderQuantity] = useState("");
  const [requestDate, setRequestDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/supplier/reorder-email", {
        productId,
        productName,
        reorderQuantity,
        requestDate,
      });
      if (response.data.success) {
        toast.success("Reorder email sent successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error sending reorder email:", error);
      toast.error("Failed to send reorder email");
    }
  };

  return (
    <div className="reorder-form">
      <h2>Reorder Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reorderQuantity">Reorder Quantity:</label>
          <input
            type="number"
            id="reorderQuantity"
            value={reorderQuantity}
            onChange={(e) => setReorderQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="requestDate">Request Date:</label>
          <input
            type="date"
            id="requestDate"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
export default ReorderForm;
