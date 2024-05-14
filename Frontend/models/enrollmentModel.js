import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true,
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
});

export default mongoose.model('Enrollment', EnrollmentSchema);
