const express = require("express");
const router = express.Router();

const phoneController = require("../controllers/phoneController");
const companyController = require("../controllers/companyController")

// BOOK ROUTES
router.get('/', phoneController.index);

router.get('/catalog', phoneController.phone_list);

router.get('/catalog/:id', phoneController.phone_detail);

router.get('/brands', companyController.company_list);

module.exports = router;