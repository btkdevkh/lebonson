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
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUser)
router.get("/", protect, getAllUser)
router.get("/:id", getOneUser)
router.put("/update/:id", protect, updateOneUser)
router.put("/update/role/:id", protect, updateUserRole)
router.delete("/delete/:id", protect, deleteOneUser)
router.post("/login", loginUser)
router.post('/forgot/password/step_one', resetUserPassStepOne)
router.put('/forgot/password/step_two/:id', resetUserPassEnd)

module.exports = router;
