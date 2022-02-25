const { 
  registerUser, 
  getAllUser, 
  getOneUser, 
  updateOneUser, 
  updateUserRole, 
  deleteOneUser, 
  loginUser, 
  resetUserPassStepOne, 
  resetUserPassEnd 
} = require('../controllers/userController');
const express = require('express')
const withAuth = require("../middleware/withAuth");

const router = express.Router();

router.post("/", registerUser)
router.get("/", withAuth, getAllUser)
router.get("/:id", getOneUser)
router.put("/update/:id", withAuth, updateOneUser)
router.put("/update/role/:id", withAuth, updateUserRole)
router.delete("/delete/:id", withAuth, deleteOneUser)
router.post("/login", loginUser)
router.post('/reset_step_one', resetUserPassStepOne)
router.put('/reset_end_step/:id', withAuth, resetUserPassEnd)

module.exports = router;
