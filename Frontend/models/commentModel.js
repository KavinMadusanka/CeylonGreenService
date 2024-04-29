import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    commentDescription: {
        type: String,
        required: true,
    }
}); 

export default mongoose.model('Comment', CommentSchema);
