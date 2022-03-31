import mongoose from 'mongoose';
import { isDevelopment } from '../../utils/index.js';
import moment from 'moment';

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 256,
            required: true,
        },
        description: {
            type: String,
            maxlength: 512,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
        ],
        // teacher or owner
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        code: {
            type: String,
            maxlength: 20,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

// hide code
classSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        // in production
        if (!isDevelopment()) {
            delete ret['code'];
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

export default mongoose.model('Class', classSchema);
