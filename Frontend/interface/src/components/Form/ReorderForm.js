import React, { useState } from "react";
import axios from "axios";
import emailjs from 'emailjs-com'; // Import EmailJS library
import toast from "react-hot-toast";
import "../../components/ReorderForm.css";

// Function to get today's date in the format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const ReorderForm = ({ productId, productName, supplierEmail, onClose }) => {
  const [reorderQuantity, setReorderQuantity] = useState("");
  const [requestDate, setRequestDate] = useState("");

  const sendEmail = (e) => {
      e.preventDefault();

      emailjs.sendForm('service_t71juyq', 'template_becj2tm', e.target, 'IT6DZ65gAd2BHOiBM')
          .then((response) => {
              console.log('Email sent:', response.status, response.text);
              toast.success("Reorder email sent successfully");
              onClose(); // Close the form after successful email sending
          }, (error) => {
              console.error('Error sending email:', error);
              toast.error("Failed to send reorder email");
          });
  };

  return (
      <div className="reorder-form">
          <h2>Reorder Form</h2>
          <form onSubmit={sendEmail}>
              <input type="hidden" name="productId" value={productId} />
              <input type="hidden" name="productName" value={productName} />
              <input type="hidden" name="supplierEmail" value={supplierEmail} />
              <div>
                  <label htmlFor="reorderQuantity">Reorder Quantity:</label>
                  <input
                      type="number"
                      id="reorderQuantity"
                      name="reorderQuantity"
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
                      name="requestDate"
                      value={requestDate}
                      onChange={(e) => setRequestDate(e.target.value.split('T')[0])}
                      min={getTodayDate()}
                      required
                  />
              </div>
              <button type="submit">Send</button>
              <button type="button" onClick={onClose}>Cancel</button>
          </form>
      </div>
  );
};

export default ReorderForm;