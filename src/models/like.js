import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        Enum : ['Post', 'Comment'],
        required: true
    },
    to : {
        type: mongoose.Schema.Types.ObjectId,
        refPath : 'type',
        required: true
    }
},{
    timestamps: true,
});

export default mongoose.model('Like', LikeSchema);