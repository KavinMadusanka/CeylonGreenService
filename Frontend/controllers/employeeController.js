import Employee from "../models/employeeModel.js";

// Create a new employee
export const createEmployeeController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      pronouns,
      salary,
      leaves,
      status,
      profileImage,
    } = req.body;
    const newEmployee = new Employee({
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      pronouns,
      salary,
      leaves,
      status,
      profileImage,
    });
    await newEmployee.save();
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

// Get all employees
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

// Get a single employee by ID
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

// Update an existing employee
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
      pronouns,
      salary,
      leaves,
      status,
      profileImage,
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
        pronouns,
        salary,
        leaves,
        status,
        profileImage,
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
