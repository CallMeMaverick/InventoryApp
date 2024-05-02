const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    name: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
})

PhoneSchema.virtual("url").get(function() {
    return `/home/catalog/${this._id}`
})

module.exports = mongoose.model("Phones", PhoneSchema, "phones");