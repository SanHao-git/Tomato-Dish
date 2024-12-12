import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    cartData: {type: Object, default: {}},
}, {minimize:false})

const user_model = mongoose.models.user || mongoose.model("user", userSchema);
export default user_model;