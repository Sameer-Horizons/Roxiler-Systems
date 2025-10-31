import mongoose, { mongo } from "mongoose";

const Adminschema = new mongoose.Schema({
    AdminId: { type: Number, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const Adminmodel = mongoose.model("Admins", Adminschema);

export default Adminmodel;