const express = require("express");
const router = express.Router();

const phoneController = require("../controllers/phoneController");

// BOOK ROUTES
router.get('/', phoneController.index);

router.get('/catalog', phoneController.phone_list);

router.get('/catalog/:id', phoneController.phone_detail);

module.exports = router;