import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IProduct {
    _id: string
    name: string
    price: number
    image: string
    description: string
}

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
})

export default mongoose.model<IProduct>("Product", productSchema)