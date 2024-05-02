const Company = require("../models/company");
const Phone = require("../models/phone")
const asyncHandler = require("express-async-handler");
const {response} = require("express");

exports.company_list = asyncHandler(async (request, response) => {
    const companies = await Company.find();
    response.render("company_view", {
        companies: companies
    })
})

exports.company_detail = asyncHandler(async (request, response, next) => {
    const [company, companiesPhones] = [
        await Company.findById(request.params.id).exec(),
        await Phone.find({ "company": request.params.id }).exec()
    ];

    if (!company) {
        const err = new Error("Could not fetch the company");
        err.status = 404;
        next(err);
    } else {
        response.render("company_detail", {
            company: company,
            companiesPhones: companiesPhones
        })
    }
})