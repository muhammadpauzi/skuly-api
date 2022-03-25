import mongoose from 'mongoose';
import { isDevelopment } from '../../utils/index.js';

export const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            maxlength: 512,
            required: true,
        },
        password: {
            type: String,
            maxlength: 512,
            required: true,
        },
        email: {
            type: String,
            maxlength: 512,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

// hide password
userSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password'];
        if (!isDevelopment()) {
            delete ret['__v'];
        }
        return ret;
    },
});

export default mongoose.model('User', userSchema);
