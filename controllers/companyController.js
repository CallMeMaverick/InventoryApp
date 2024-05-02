const Company = require("../models/company");
const asyncHandler = require("express-async-handler");

exports.company_list = asyncHandler(async (request, response) => {
    const companies = await Company.find();
    response.render("company_view", {
        companies: companies
    })
})