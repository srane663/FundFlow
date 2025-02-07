import mongoose from 'mongoose';

    const incomeSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        source: { type: String, required: true }, // For example, "Salary", "Freelancing", etc.
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        notes: String
    });
    
    export default mongoose.model('Income', incomeSchema);
    