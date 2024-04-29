import React from "react";
import PrAdminMenu from "../../components/Layout/PrAdminMenu";
import "../../components/PrAdminDashboard.css";




const PrAdminDashboard = () => {
  return (
    <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <PrAdminMenu/>
            </div>
            <div className="col-md-9">content</div>
        </div>
    </div>
  );
};

export default PrAdminDashboard;