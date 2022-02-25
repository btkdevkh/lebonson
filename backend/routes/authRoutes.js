const express = require('express')
const { checkToken, checkPasswordToken } = require("../controllers/authController");
const withAuth = require("../middleware/withAuth");

const router = express.Router();

router.get("/checkToken", withAuth, checkToken)
router.get("/checkPasswordToken", withAuth, checkPasswordToken)

module.exports = router;
