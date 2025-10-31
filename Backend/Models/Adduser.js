import mongoose, { mongo } from "mongoose";

const Adduserschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Number, required: true },
    password: { type: String, required: true }
});

const Addusermodel = mongoose.model("Newusers", Adduserschema);

export default Addusermodel;