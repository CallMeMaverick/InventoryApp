const Company = require("../models/company");
const Phone = require("../models/phone")
const asyncHandler = require("express-async-handler");
const {response} = require("express");
const { body, validationResult } = require("express-validator");

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

exports.create_get = asyncHandler(async (request, response) => {
    response.render("create_company", { title: "Add company" })
})

exports.create_post = [
    // Validate and sanitize the "name" field
    body("name", "Company name must be at lease 2 characters long")
        .trim()
        .isLength({ min: 2 })
        .escape(),

    // Validate and sanitize the "description" field
    body("description", "Description field must not contain more than 100 characters")
        .trim()
        .isLength({ max: 100 })
        .escape(),

    asyncHandler(async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.render("create_company", {
                title: "Add company",
            })
        } else {
            const companyExists = await Company.findOne({ name: request.body.name });

            if (companyExists) {
                response.redirect(companyExists.url);
            } else {
                const company = new Company({
                    name: request.body.name,
                    description: request.body.description,
                    wikiUrl: "https://en.wikipedia.org/wiki/" + request.body.name
                })

                await company.save();
                return response.redirect(company.url);
            }
        }
    })
]