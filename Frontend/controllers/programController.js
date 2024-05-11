import Program from '../models/programModel.js';

// Create a new training program
export const createProgram = async (req, res) => {
  try {
    const { 
      programName, 
      description, 
      startDate, 
      endDate, 
      trainer, 
      capacity
     } = req.body;

    // validations
    if (!programName || !description || !startDate || !endDate || !trainer || !capacity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newProgram = new Program({ programName, description, startDate, endDate, trainer, capacity });
    await newProgram.save();
    res.status(201).json({ success: true, message: 'Training program created successfully', program: newProgram });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating training program', error });
  }
};


// Get all training programs
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching training programs', error });
  }
};

// Get a single training program by ID
export const getProgramById = async (req, res) => {
  const { programId } = req.params;
  try {
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Training program not found' });
    }
    res.status(200).json({ success: true, program });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching training program', error });
  }
};

// Update a training program by ID
export const updateProgram = async (req, res) => {
  const { programId } = req.params;
  const { programName, description, startDate, endDate, trainer, capacity } = req.body;
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      { programName, description, startDate, endDate, trainer, capacity },
      { new: true }
    );
    if (!updatedProgram) {
      return res.status(404).json({ success: false, message: 'Training program not found' });
    }
    res.status(200).json({ success: true, message: 'Training program updated successfully', program: updatedProgram });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating training program', error });
  }
};

// Delete a training program by ID
export const deleteProgram = async (req, res) => {
  const { programId } = req.params;
  try {
    const deletedProgram = await Program.findByIdAndDelete(programId);
    if (!deletedProgram) {
      return res.status(404).json({ success: false, message: 'Training program not found' });
    }
    res.status(200).json({ success: true, message: 'Training program deleted successfully', program: deletedProgram });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting training program', error });
  }
};
