import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
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
    email: {
        type: String,
        maxlength: 512,
        required: true,
        unique: true,
    },
});

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 254,
            required: true,
        },
        description: {
            type: String,
            maxlength: 500,
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
        delete ret['code'];
        delete ret['__v'];
        return ret;
    },
});

export default mongoose.model('Class', classSchema);
