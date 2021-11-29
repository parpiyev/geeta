import mongoose from "mongoose"

export interface IUser {
    name: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
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