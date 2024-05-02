const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    wikiUrl: { type: String, required: true }
})

module.exports = mongoose.model("Company", CompanySchema);