import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    _id: string
    name: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUser>("User", userSchema)