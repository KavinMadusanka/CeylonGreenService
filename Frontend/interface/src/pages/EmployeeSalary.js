import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function EmployeeSalary() {
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [bsal, setBsal] = useState("");
  const [tax, setTax] = useState("");
  const [etf, setEtf] = useState("");
  const [epf, setEpf] = useState("");
  const [tallowance, setTallowance] = useState("");
  const [mbonus, setMbonus] = useState("");
  const [nsal, setNsal] = useState("");
  const [emp, setEmp] = useState(null);
  const [nameError, setNameError] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/employee/get-employee/663086aa94aaab421932bf32"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const json = await response.json();
        setEmp(json);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    };
    fetchAllEmployees();
  }, []);

  function handleCalculation() {
    const parsedHours = parseFloat(hours);
    const parsedRate = parseFloat(rate);

    if (
      isNaN(parsedHours) ||
      isNaN(parsedRate) ||
      parsedHours <= 0 ||
      parsedRate <= 0
    ) {
      // Input validation failed
      // Display error message and return
      setNameError("Please enter valid hours and rate");
      return;
    }

    const calculatedBsal = parsedHours * parsedRate;
    const calculatedEtf = (calculatedBsal * 3) / 100;
    const calculatedEpf = (calculatedBsal * 8) / 100;

    let calculatedTax, calculatedTallowance, calculatedMbonus;

    if (calculatedBsal > 100000) {
      calculatedTax = (calculatedBsal * 10) / 100;
      calculatedTallowance = (calculatedBsal * 30) / 100;
      calculatedMbonus = (calculatedBsal * 20) / 100;
    } else if (calculatedBsal > 50000) {
      calculatedTax = (calculatedBsal * 5) / 100;
      calculatedTallowance = (calculatedBsal * 20) / 100;
      calculatedMbonus = (calculatedBsal * 15) / 100;
    } else {
      calculatedTax = (calculatedBsal * 2) / 100;
      calculatedTallowance = (calculatedBsal * 10) / 100;
      calculatedMbonus = (calculatedBsal * 10) / 100;
    }

    const calculatedNsal =
      calculatedBsal +
      (calculatedTallowance +
        calculatedMbonus -
        (calculatedTax + calculatedEtf + calculatedEpf));

    const validEmployee = emp && emp.find((e) => e.firstname === employeeName);
    if (!validEmployee) {
      setNameError("Invalid employee name");
      return;
    }

    setBsal(calculatedBsal);
    setTax(calculatedTax);
    setTallowance(calculatedTallowance);
    setMbonus(calculatedMbonus);
    setEtf(calculatedEtf);
    setEpf(calculatedEpf);
    setNsal(calculatedNsal);
    setNameError(""); // Clear error if calculation is successful
  }

  function handleGenerateReport() {
    const doc = new jsPDF();
    const data = [
      ["Basic Salary", `${bsal} Rupees`],
      ["Tax", `${tax} Rupees`],
      ["ETF", `${etf} Rupees`],
      ["EPF", `${epf} Rupees`],
      ["Transport Allowance", `${tallowance} Rupees`],
      ["Monthly Bonus", `${mbonus} Rupees`],
      ["Net Salary", `${nsal} Rupees`],
    ];

    doc.setFont("times", "bold");
    doc.setFontSize(25);
    doc.text("Salary Details", 10, 10);

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const tableProps = {
      startY: 20,
      margin: { top: 15 },
      headStyles: { fillColor: "#1867c7" },
      bodyStyles: { textColor: "#0f966b" },
      columnStyles: { 1: { cellWidth: 40 } },
    };

    // Generate the table
    doc.autoTable({
      head: [["Description", "Amount"]],
      body: data,
      ...tableProps,
    });

    // Save the document
    doc.save("salary.pdf");
  }

  return (
    <div className="container">
      <h1>SALARY CALCULATOR</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="employeeName" className="label">
            Employee Name
          </label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(event) => setEmployeeName(event.target.value)}
            required
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="hours" className="label">
            Working Hours
          </label>
          <div className="input-group">
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              required
            />
            <span>hours</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rate" className="label">
            Hourly Rate (Rupees)
          </label>
          <div className="input-group">
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              required
            />
            <span>Rupees</span>
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="btn" onClick={handleCalculation}>
            Calculate Salary
          </button>
        </div>
        <div className="form-group">
          <label className="label">Calculated Salary</label>
          <input type="text" value={bsal} readOnly />
        </div>
        <div className="form-group">
          <label className="label">Tax (Rupees)</label>
          <input type="text" value={tax} readOnly />
        </div>
        <div className="form-group">
          <label className="label">ETF (Rupees)</label>
          <input type="text" value={etf} readOnly />
        </div>
        <div className="form-group">
          <label className="label">EPF (Rupees)</label>
          <input type="text" value={epf} readOnly />
        </div>
        <div className="form-group">
          <label className="label">Transport Allowance (Rupees)</label>
          <input type="text" value={tallowance} readOnly />
        </div>
        <div className="form-group">
          <label className="label">Monthly Bonus (Rupees)</label>
          <input type="text" value={mbonus} readOnly />
        </div>
        <div className="form-group">
          <label className="label">Net Salary (Rupees)</label>
          <input type="text" value={nsal} readOnly />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleGenerateReport}>
            Generate Salary Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeSalary;
