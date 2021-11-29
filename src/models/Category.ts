import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface ICategory {
    _id: string
    name: string
}

const categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
})

export default mongoose.model<ICategory>("Category", categorySchema)