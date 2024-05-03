const Phone = require("../models/phone")
const Company = require("../models/company")
const PhoneInstances = require("../models/phoneInstance")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (request, response) => {
    const [numPhones, numCompanies, numAvailablePhoneInstance] =
    await Promise.all([
        Phone.countDocuments().exec(),
        Company.countDocuments().exec(),
        PhoneInstances.countDocuments({ status: "Available" }).exec()
    ]);

    response.render("index", {
        title: "General data",
        numPhones: numPhones,
        numCompanies: numCompanies,
        numAvailablePhoneInstance: numAvailablePhoneInstance
    })
})

exports.phone_list = asyncHandler(async (request, response) => {
    const phones = await Phone.find();
    response.render("phone_view", { header: "Phone list", phoneList: phones })
})

exports.phone_detail = asyncHandler(async (request, response, next) => {
    const [phone, phoneInstances] = await Promise.all([
        Phone.findById(request.params.id).populate("company").exec(),
        PhoneInstances.findById(request.params.id).populate("phone").exec()
    ]);

    if (!phone) {
        const err = new Error("Could not fetch the phone");
        err.status = 404;
        next(err);
    } else {
        response.render("phone_detail", {
            phone: phone,
            phoneInstances: phoneInstances
        })
    }
})

exports.create_get = asyncHandler(async (request, response) => {
    const companyList = await Company.find().exec();

    response.render("create_model", { title: "Create model", companyList: companyList })
})

exports.create_post = [
    // Validate and sanitize the "name" field
    body('name', 'Model name must be at least 3 characters long.')
        .trim()
        .isLength({ min: 3 })
        .escape(),

    // Validate and sanitize the "price" field
    body('price', 'Price must be a valid number and cannot be empty.')
        .trim()
        .isNumeric().withMessage('Price must be a number.')
        .notEmpty().withMessage('Price cannot be empty.')
        .isFloat({ min: 0 }).withMessage('Price must not be negative.')
        .escape(),

    // Validate and sanitize the "company" field
    body('company', 'Company selection is required.')
        .trim()
        .notEmpty()
        .escape(),

    // Validate and sanitize the "description" field
    body('description', 'Description must not be longer than 200 characters.')
        .trim()
        .isLength({ max: 200 })
        .escape(),

    asyncHandler(async (request, response, next) => {
        const errors = validationResult(request);
        const companyList = await Company.find().exec();

        if (!errors.isEmpty()) {
            response.render("create_model", {
                title: "Create model",
                companyList: companyList,
                err: errors.array()
            })
        } else {
            const modelExists = await Phone.findOne({ name: request.body.name }).exec();

            if (modelExists) {
                return response.redirect(modelExists.url); // Ensure URL is a valid redirect target
            } else {
                const company = await Company.findOne({ name: request.body.company });

                const model = new Phone({
                    name: request.body.name,
                    price: request.body.price,
                    company: company._id,
                    description: request.body.description
                });
                await model.save();
                return response.redirect(model.url);
            }
        }
    })
]