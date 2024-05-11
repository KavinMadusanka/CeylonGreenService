import mongoose from 'mongoose';
import Employee from "../models/employeeModel.js";

export const createEmployeeController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      nic
    } = req.body;

    const newEmployee = await new Employee({
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      nic
    }).save();
    res.status(201).send({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error creating employee", error });
  }
};

export const getEmployeeController = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).send({ success: true, employees });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error fetching employees", error });
  }
};

export const getEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (employee) {
      res.status(200).send({ success: true, employee });
    } else {
      res.status(404).send({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error fetching employee", error });
  }
};

export const updateEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      nic
    } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phone,
        address,
        gender,
        nic
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .send({ success: false, message: "Employee not found" });
    }
    res.status(200).send({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error updating employee", error });
  }
};

export const deleteEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid employee ID" });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (deletedEmployee) {
      res.status(200).send({ success: true, message: "Employee deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting employee", error });
  }
};


// Create a new employee                                                                                                                                                                                         
export const createEmployeeController1 = async (req, res) => {
  try {
      const { name, email, ...rest } = req.body;
      const newEmployee = new Employee({ name, email, ...rest });
      await newEmployee.save();
      res.status(201).send({ success: true, message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error creating employee', error });
  }
};

// Get all employees
export const getEmployeeController1= async (req, res) => {
  try {
      const employees = await Employee.find({});
      res.status(200).send({ success: true, employees });
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error fetching employees', error });
  }
};


// Get a single employee by ID
export const getEmployeeByIdController1 = async (req, res) => {
  try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      if (employee) {
          res.status(200).send({ success: true, employee });
      } else {
          res.status(404).send({ success: false, message: 'Employee not found' });
      }
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error fetching employee', error });
  }
};

// Update an existing employee
export const updateEmployeeController1 = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send({ success: true, message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error updating employee', error });
  }
};

// Delete an existing employee
export const deleteEmployeeController1 = async (req, res) => {
  try {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error deleting employee', error });
  }
};

// Delete an existing employee
export const deleteEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res
        .status(404)
        .send({ success: false, message: "Employee not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error deleting employee", error });
  }
};