import mongoose from 'mongoose';
import { isDevelopment } from '../../utils/index.js';
import moment from 'moment';

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
        ret.createdAt = {
            default: ret.createdAt,
            formated1: moment(ret.createdAt).format('lll'),
            formated2: moment(ret.createdAt).startOf('hour').fromNow(),
        };
        ret.updatedAt = {
            default: ret.updatedAt,
            formated1: moment(ret.updatedAt).format('lll'),
            formated2: moment(ret.updatedAt).startOf('hour').fromNow(),
        };
        return ret;
    },
});

export default mongoose.model('User', userSchema);
