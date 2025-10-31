import mongoose, { mongo } from "mongoose";

const RatingSchema = new mongoose.Schema({
    productId: String,
    rating: Number,
});

const ratingModel = mongoose.model("Ratings" , RatingSchema);

export default ratingModel;