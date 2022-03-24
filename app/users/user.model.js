import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            length: 512,
            required: true,
        },
        password: {
            type: String,
            length: 512,
            required: true,
        },
        email: {
            type: String,
            length: 512,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
