const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PhoneInstanceSchema = new Schema({
    phone: { type: Schema.Types.ObjectId, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Currently Unavailable"],
        default: "Available",
    },
    price: { type: Schema.Types.ObjectId, required: true }
})

PhoneInstanceSchema.virtual("url").get(function() {
    return `/catalog/book/${this._id}`;
})

module.exports = mongoose.model("PhoneInstance", PhoneInstanceSchema);