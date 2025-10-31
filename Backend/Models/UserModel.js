import mongoose, { mongo } from "mongoose";

const Userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Number, required: true },
    password: { type: String, required: true }
});

const usermodel = mongoose.model("Users", Userschema);

export default usermodel;