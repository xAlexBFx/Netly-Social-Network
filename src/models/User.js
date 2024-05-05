import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default : ""
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    posts: {
        type: Number,
        required: true,
        default: 0
    },
    followers: {
        type: Number,
        required: true,
        default: 0
    },
    following: {
        type: Number,
        required: true,
        default: 0
    },
    birthdate: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    settings: {
        privateAccount: {
            type: Boolean,
            required: true,
            default: false
        },
        language: {
            type: String,
            required: true,
            default: 'english'
        },
        restrictedMode: {
            type: Boolean,
            required: true,
            default: true
        },
        showStatus: {
            type: Boolean,
            required: true,
            default: true
        },
    },
},{
    timestamps: true,
})

export default mongoose.model('User', UserSchema);