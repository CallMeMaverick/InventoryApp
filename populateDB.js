// console.log(
//     'This script populates some test phones and companies to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/myDatabaseName"'
// );
//
// // Get arguments passed on command line
// const userArgs = process.argv.slice(2);
//
// if (!userArgs[0].startsWith('mongodb')) {
//     console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
//     return;
// }
//
// const Phone = require('./models/phone');
// const Company = require('./models/company');
// const PhoneInstance = require('./models/phoneinstance');
//
// const companies = [];
// const phones = [];
// const phoneInstances = [];
//
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
//
// const mongoDB = userArgs[0];
// main().catch(err => console.log(err));
//
// async function main() {
//     console.log("Debug: About to connect");
//     await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Debug: Should be connected?");
//     await createCompanies();
//     await createPhones();
//     await createPhoneInstances();
//     console.log("Debug: Closing mongoose");
//     mongoose.connection.close();
// }
//
// async function createCompanies() {
//     console.log("Adding companies");
//     companies.push(await companyCreate("Apple Inc.", "American technology company", "https://en.wikipedia.org/wiki/Apple_Inc."));
//     companies.push(await companyCreate("Samsung Electronics", "Multinational electronics company", "https://en.wikipedia.org/wiki/Samsung_Electronics"));
//     // Add more companies as needed
// }
//
// async function companyCreate(name, description, wikiUrl) {
//     const company = new Company({ name, description, wikiUrl });
//     await company.save();
//     console.log(`Added company: ${name}`);
//     return company;
// }
//
// async function createPhones() {
//     console.log("Adding phones");
//     phones.push(await phoneCreate("iPhone 13", companies[0]._id, 799, "Latest model of Apple iPhone"));
//     phones.push(await phoneCreate("Galaxy S21", companies[1]._id, 999, "Latest model of Samsung Galaxy Series"));
//     // Add more phones as needed
// }
//
// async function phoneCreate(name, company, price, description) {
//     const phone = new Phone({ name, company, price, description });
//     await phone.save();
//     console.log(`Added phone: ${name}`);
//     return phone;
// }
//
// async function createPhoneInstances() {
//     console.log("Adding phone instances");
//     phoneInstances.push(await phoneInstanceCreate(phones[0]._id, "Available", phones[0].price));
//     phoneInstances.push(await phoneInstanceCreate(phones[1]._id, "Currently Unavailable", phones[1].price));
//     // Add more phone instances as needed
// }
//
// async function phoneInstanceCreate(phone, status, price) {
//     const phoneInstance = new PhoneInstance({ phone, status, price });
//     await phoneInstance.save();
//     console.log(`Added phone instance for: ${phone}`);
//     return phoneInstance;
// }

console.log(
    'This script populates some test phones and companies to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/myDatabaseName"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return;
}

const Phone = require('./models/phone');
const Company = require('./models/company');
const PhoneInstance = require('./models/phoneinstance');

const companies = [];
const phones = [];
const phoneInstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch(err => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Debug: Should be connected?");
    await createCompanies();
    await createPhones();
    await createPhoneInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function createCompanies() {
    console.log("Adding companies");
    // New companies
    companies.push(await companyCreate("Google", "American technology company", "https://en.wikipedia.org/wiki/Google"));
    companies.push(await companyCreate("Huawei", "Chinese multinational technology company", "https://en.wikipedia.org/wiki/Huawei"));
    companies.push(await companyCreate("Sony", "Japanese multinational conglomerate", "https://en.wikipedia.org/wiki/Sony"));
    companies.push(await companyCreate("OnePlus", "Chinese smartphone manufacturer", "https://en.wikipedia.org/wiki/OnePlus"));
}

async function companyCreate(name, description, wikiUrl) {
    const company = new Company({ name, description, wikiUrl });
    await company.save();
    console.log(`Added company: ${name}`);
    return company;
}

async function createPhones() {
    console.log("Adding phones");
    // New phones
    phones.push(await phoneCreate("Pixel 5", companies[2]._id, 699, "High-quality camera phone from Google"));
    phones.push(await phoneCreate("Huawei P40", companies[3]._id, 789, "New generation smartphone from Huawei"));
    phones.push(await phoneCreate("Sony Xperia 1 II", companies[4]._id, 950, "Flagship smartphone with a 4K display from Sony"));
    phones.push(await phoneCreate("OnePlus 8T", companies[5]._id, 749, "Smooth display and fast charging OnePlus phone"));
}

async function phoneCreate(name, company, price, description) {
    const phone = new Phone({ name, company, price, description });
    await phone.save();
    console.log(`Added phone: ${name}`);
    return phone;
}

async function createPhoneInstances() {
    console.log("Adding phone instances");
    // New phone instances
    phoneInstances.push(await phoneInstanceCreate(phones[2]._id, "Available", phones[2].price));
    phoneInstances.push(await phoneInstanceCreate(phones[3]._id, "Currently Unavailable", phones[3].price));
    phoneInstances.push(await phoneInstanceCreate(phones[4]._id, "Available", phones[4].price));
    phoneInstances.push(await phoneInstanceCreate(phones[5]._id, "Available", phones[5].price));
}

async function phoneInstanceCreate(phone, status, price) {
    const phoneInstance = new PhoneInstance({ phone, status, price });
    await phoneInstance.save();
    console.log(`Added phone instance for: ${phone}`);
    return phoneInstance;
}

