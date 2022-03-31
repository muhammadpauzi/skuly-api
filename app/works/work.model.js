import mongoose from 'mongoose';
import moment from 'moment';
import { isDevelopment } from '../../utils/index.js';

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

// hide password
workSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        if (!isDevelopment()) {
            delete ret['__v'];
        }
        ret.duedate = {
            default: ret.duedate,
            formated1: ret.duedate && moment(ret.duedate).format('lll'),
            formated2:
                ret.duedate && moment(ret.duedate).startOf('hour').fromNow(),
        };
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

export default mongoose.model('Work', workSchema);
