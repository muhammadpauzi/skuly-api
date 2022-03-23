import mongoose from 'mongoose';

const classSchema = mongoose.Schema(
    {
        name: {
            type: String,
            length: 254,
            required: true,
        },
        description: {
            type: String,
        },
        code: {
            type: String,
            length: 20,
            required: true,
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },
    },
    { timestamps: true }
);

export default mongoose.model('Class', classSchema);
