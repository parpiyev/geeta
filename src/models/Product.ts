import mongoose from "mongoose";

export interface IProduct {
    name: string
    price: number
    image: string
    description: string
}

const productSchema = new mongoose.Schema({
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