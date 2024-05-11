import Enrollment from '../models/enrollmentModel.js';

// Enroll an employee into a training program
export const enrollEmployee = async (req, res) => {
  try {
    const { employeeId, programId } = req.body;
    const newEnrollment = new Enrollment({ employeeId, programId });
    await newEnrollment.save();
    res.status(201).json({ success: true, message: 'Employee enrolled successfully', enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error enrolling employee', error });
  }
};

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('employeeId')
      .populate('programId');
    res.status(200).json({ success: true, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching enrollments', error });
  }
};

// Get enrollments for a specific program
export const getEnrollmentsByProgram = async (req, res) => {
  const { programId } = req.params;
  try {
    const enrollments = await Enrollment.find({ programId });
    res.status(200).json({ success: true, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching enrollments for the program', error });
  }
};

// Remove an enrollment
export const removeEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!deletedEnrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }
    res.status(200).json({ success: true, message: 'Enrollment deleted successfully', enrollment: deletedEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting enrollment', error });
  }
};
