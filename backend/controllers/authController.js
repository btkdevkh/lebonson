const UserModel = require("../models/UserModel");
const asyncHandler = require('express-async-handler');

// @desc Check token
// @route GET /api/v1/auth/checkToken
// @access AUTH
const checkToken = asyncHandler(async (req, res) => {
  const user = await UserModel.getOneUser(req.id);

  if(!user[0]) {
    res.status(500)
    throw new Error('Vous n\'êtes pas mêmbre');
  }

  res.status(200).json({ status: 200, message: "Authentifié", user: user[0] });
})

// @desc Check password token
// @route GET /api/v1/auth/checkPasswordToken
// @access AUTH
const checkPasswordToken = asyncHandler(async (req, res) => {
  const user = await userModel.getOneUser(req.id);

  if(!user[0]) {
    res.status(500)
    throw new Error('Vous n\'êtes pas mêmbre');
  }

  res.status(200).json({ status: 200, message: "Authentifié", user: user[0] });
})

module.exports = {
  checkToken,
  checkPasswordToken
}
