import mongoose from "mongoose";

const schema = mongoose.Schema({
    apiKey : String,
    apiSecret : String,
    admin : Boolean
})

const Credential = mongoose.model("Credential",schema)
export default Credential