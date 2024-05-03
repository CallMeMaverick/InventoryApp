const express = require("express");
const router = express.Router();

const phoneController = require("../controllers/phoneController");
const companyController = require("../controllers/companyController")

// BOOK ROUTES
router.get('/', phoneController.index);

router.get('/catalog', phoneController.phone_list);

router.get('/catalog/:id', phoneController.phone_detail);

router.get('/brands', companyController.company_list);

router.get("/brands/:id", companyController.company_detail)

router.get('/model/create', phoneController.create_get);

router.post('/model/create', phoneController.create_post);

router.get('/brand/create', companyController.create_get);

router.post('/brand/create', companyController.create_post);

module.exports = router;