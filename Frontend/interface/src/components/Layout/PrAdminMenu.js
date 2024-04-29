import React from "react";
import { NavLink } from "react-router-dom";
import Products from './../../pages/Admin/Products';

const PrAdminMenu = () => {
  return (
    <>
<div className="text-center">
<div className="list-group">
  <h4>Admin Panel</h4>
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/product" className="list-group-item list-group-item-action">Products</NavLink>
  <NavLink to="/dashboard/admin/create-supplier" className="list-group-item list-group-item-action">Create Supplier</NavLink>
  <NavLink to="/dashboard/admin/Suppliers" className="list-group-item list-group-item-action">Suppliers</NavLink>
  

  
</div>
</div>
    
    </>
  );
};

export default PrAdminMenu;