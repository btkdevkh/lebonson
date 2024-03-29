const asyncHandler = require('express-async-handler')
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// @desc Login user
// @route POST /api/v1/user/login
// @access AUTH
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400);
    throw new Error('Champs requise');
  } 

  const user = await UserModel.getUserByEmail(email);

  if(user.rows.length === 0) {
    res.status(400);
    throw new Error('Email non reconnu');
  }

  if(!user.rows[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  // Get user's hashed password & compare
  const hashPasswordDb = user.rows[0].password;
  const comparedPassword = await bcrypt.compare(password, hashPasswordDb);

  // If wrong password
  if(!comparedPassword) {
    res.status(400);
    throw new Error('Mauvais mot de passe');
  } 

  // Generate token
  const payload = { email: email, id: user.rows[0].id }
  res.status(200).json({ status: 200, message: "Authentifié", token: generateToken(payload), user: user.rows[0] })
})

// @desc Create user
// @route POST /api/v1/user/
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword, address, zip, city } = req.body;

  if(!firstname || !lastname || !email || !password || !confirmPassword || !address || !zip || !city) {
    res.status(400);
    throw new Error('Champs requise');
  }

  const userExists = await UserModel.getUserByEmail(email);

  // Verify user exists
  if(userExists.rows.length !== 0) {
    res.status(400);
    throw new Error('Utilisateur existe déja');
  }

  if(password !== confirmPassword) {
    res.status(400);
    throw new Error('Mot de passe doit être identique');
  }

  const user = await UserModel.createUser(req);

  if(!user) {
    res.status(500)
    throw new Error('Erreur du serveur');
  }

  const userRegistered = await UserModel.getOneUser(user.rows[0].id);

  // Generate token
  const payload = { email: email, id: userRegistered.rows[0].id }
  res.status(201).json({ 
    status: 201, 
    message: "Votre compte a été créé avec success", 
    token: generateToken(payload),
    user: userRegistered.rows[0]
  });
})

// @desc update one user
// @route PUT /api/v1/user/update/:id
// @access PRIVATE
const updateOneUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, address, zip, city } = req.body;
  const { id } = req.params;

  if(!firstname || !lastname || !email || !address || !zip || !city) {
    res.status(400);
    throw new Error('Champs requise');
  }

  await UserModel.updateOneUser(req, id);
  const userById = await UserModel.getOneUser(id);

  if(!userById.rows[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  // Generate token
  const payload = { email: email, id: userById.rows[0].id }
  res.status(200).json({ 
    status: 200, 
    message: "Votre profile a été mis à jour", 
    token: generateToken(payload),
    user: userById.rows[0]
  })
})

// @desc Get all user
// @route GET /api/v1/user/
// @access PRIVATE
const getAllUser = asyncHandler(async (req, res) => {
  const users = await UserModel.getAllUsers();

  if(!users) {
    res.status(500)
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, "users": users.rows });
})

// @desc Get one user
// @route GET /api/v1/user/:id
// @access PRIVATE
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getOneUser(id);

  if(!user.rows[0]) {
    res.status(400)
    throw new Error('L\'utilisateur n\'existe pas');
  }

  res.status(200).json({ status: 200, user: user.rows[0] });
})

// @desc update one user's role
// @route PUT /api/v1/user/update/role/:id
// @access PRIVATE
const updateUserRole = asyncHandler(async(req, res) => {
  const { id } = req.params;
  const { role } = req.body

  await UserModel.updateOneUserRole(role, id);
  const userById = await UserModel.getOneUser(id);

  if(!userById.rows[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, message: "User's role updated", user: userById.rows[0] });
})

// @desc Delete one user
// @route DELETE /api/v1/user/delete/:id
// @access PRIVATE
const deleteOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOneUser(id);

  if(!user) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, message: "L'utilisateur supprimé" });
})

// @desc Reset user's password step one
// @route POST /api/v1/user/reset_step_one
// @access PUBLIC
const resetUserPassStepOne = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if(!email) {
    res.status(400);
    throw new Error('Champs requise');
  } 

  const user = await UserModel.getUserByEmail(email);

  if(user.rows.length === 0) {
    res.status(400);
    throw new Error('Email non reconnu');
  }

  // Generate token
  const payload = { email, id: user.rows[0].id }
    
  const token = generateToken(payload);
  const urlResetPasswordStep2 = process.env.URL_RESET_PASSWORD || "http://localhost:3000/forgot/password/step_two";

  const output = `
    <h2>Vous avez demandé de réinitialiser le mot de passe !</h2>
    <h3>Mes informations :</h3>
    <p>Email : ${req.body.email}</p>
    <p>
      Cliquez sur ce lien pour modifier votre mot de passe : 
      <a href="${urlResetPasswordStep2}/${token}">
        ${urlResetPasswordStep2}/${token}
      </a>
    </p>
  `;

  // Transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Admin : ${process.env.MY_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: "Reset password",
    text: "",
    html: output
  });

  console.log("Message sent: %s", info.messageId)

  res.status(200).json({ status: 200, message: "Vérifiez dans votre email (couriers indésirables), un lien a été envoyé", token: token, userId: user.rows[0].id })
})

// @desc Reset user's password end step
// @route PUT /api/v1/user/forgot/password/step_two/:id
// @access PUBLIC
const resetUserPassEnd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;

  if(!password || !confirmPassword) {
    res.status(400);
    throw new Error('Champs requise');
  } 

  if(password !== confirmPassword) {
    res.status(400);
    throw new Error('Mot de passe doit être identique');
  }

  await UserModel.updateUserPassword(password, id);
  const userById = await UserModel.getOneUser(id);

  if(!userById.rows[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  } 

  res.status(200).json({ status: 200, message: "Mot de passe à été mis à jour" });
})

// Generate jwt
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  getAllUser,
  getOneUser,
  updateOneUser,
  updateUserRole,
  deleteOneUser,
  loginUser,
  resetUserPassStepOne,
  resetUserPassEnd
}
