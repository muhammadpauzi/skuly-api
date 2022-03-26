import mongoose from 'mongoose';

export const ENUM_TYPES = ['MATERIAL'];
const workSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 256,
            required: true,
        },
        description: {
            type: String,
            maxlength: 512,
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Class',
        },
        // teacher or owner
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        type: {
            type: String,
            required: true,
            enum: ENUM_TYPES,
        },
        duedate: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Work', workSchema);
