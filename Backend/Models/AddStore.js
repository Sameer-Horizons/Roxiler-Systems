import mongoose, { mongo } from "mongoose";

const storeschema = new mongoose.Schema({
    storename: { type: String, required: true },
    address: { type: Number, required: true },
    email: { type: String, required: true ,unique: true},
});

const storemodel = mongoose.model("Stores", storeschema);

export default storemodel;