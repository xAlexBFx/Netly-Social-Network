import mongoose from "mongoose";

const RelationshipSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    as: {
        type: String,
        Enum : ['Follower', 'Friend', 'Recommended', 'Like'],
        required: true
    },
    toType: {
        type: String,
        Enum : ['User', 'Post', 'Comment'],
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type',
        required: true
    },
},{
    timestamps: true,
});

export default mongoose.model('Relationship', RelationshipSchema);