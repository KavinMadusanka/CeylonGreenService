import axios from "axios";
import React, { useEffect, useState } from "react";

const SMHome = () => {
  const [staffManagerTotal, setStaffManagerTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [staffManagers, setStaffManagers] = useState([]);

  useEffect(() => {
    staffManagerCount();
    employeeCount();
    salaryCount();
    StaffManagerRecords();
  }, []);
  const StaffManagerRecords = () => {
    axios
      .get("http://localhost:3000/smdashboard/StaffManagerRecords")
      .then((result) => {
        if (result.data.Status) {
          setStaffManagers(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };
  const staffManagerCount = () => {
    axios
      .get("http://localhost:3000/smdashboard/staffManagerCount")
      .then((result) => {
        if (result.data.Status) {
          setStaffManagerTotal(result.data.Result[0].staffManager);
        }
      });
  };
  const employeeCount = () => {
    axios
      .get("http://localhost:3000/smdashboard/employeeCount")
      .then((result) => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };
  const salaryCount = () => {
    axios
      .get("http://localhost:3000/smdashboard/salaryCount")
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOfEmp);
        }
      });
  };
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Staff Manager</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{staffManagerTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{employeeTotal}</h5>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
            <div className="text-center pb-1">
              <h4>Salary</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total: </h5>
              <h5>Rs.{salaryTotal}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Staff Managers</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffManagers.map((s) => (
              <tr>
                <td>{s.email}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SMHome;
