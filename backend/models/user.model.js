import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    img: {
        type: String,
        required: false
    },
    savedPosts: {
        type: [String],
        default: []
    },

}, {timestamps: true});

export default mongoose.model('User', userSchema);