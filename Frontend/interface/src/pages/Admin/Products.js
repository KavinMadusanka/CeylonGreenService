import React, { useState, useEffect } from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../components/Products.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/product//get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate PDF report
  const generatePDF = () => {
    if (filteredProducts.length === 0) {
      toast.error("No products found to generate report");
      return;
    }
    const doc = new jsPDF();
    doc.text("Products Report", 10, 10);
    doc.autoTable({
      head: [['Name', 'Price', 'Quantity', 'Category', 'Supplier','ReorderLevel']],
      body: filteredProducts.map(product => [product.name, `$${product.price}`, product.quantity, product.category, product.supplier ? product.supplier.name : '', product.reorderLevel ])
    });
    doc.save("products_report.pdf");
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <PrAdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <button className="btn btn-primary mb-3" onClick={generatePDF}>Generate PDF Report</button>
          <div className="d-flex flex-wrap justify-content-around">
            {filteredProducts.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
                key={p._id}
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Price: ${p.price}</p>
                    <p className="card-text">Quantity: {p.quantity}</p>
                    <p className="card-text">
                      Supplier: {p.supplier ? p.supplier.name : ''}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
