const Phone = require("../models/phone")
const Company = require("../models/company")
const PhoneInstances = require("../models/phoneInstance")
const asyncHandler = require("express-async-handler");

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
            phoneInstances: PhoneInstances
        })
    }
})