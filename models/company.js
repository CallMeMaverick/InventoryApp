const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    wikiUrl: { type: String, required: true }
})

CompanySchema.virtual("url").get(function() {
    return `/catalog/company/${this._id}`;
})

module.exports = mongoose.model("Company", CompanySchema);