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
    console.log(phones);
    response.render("phone_view", { header: "Phone list", phoneList: phones })
})