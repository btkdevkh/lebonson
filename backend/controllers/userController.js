const asyncHandler = require('express-async-handler')
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// @desc Create user
// @route POST /api/v1/user/
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, address, zip, city } = req.body;

  if(!firstName || !lastName || !email || !password || !confirmPassword || !address || !zip || !city) {
    res.status(400);
    throw new Error('Champs requise');
  }

  const userExists = await UserModel.getUserByEmail(email);

  // Verify user exists
  if(userExists.length !== 0) {
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

  const userRegistered = await UserModel.getOneUser(user.insertId);

  // Generate token
  const payload = { email: email, id: user.insertId }
  res.status(201).json({ 
    status: 201, 
    message: "Votre compte a été créé avec success", 
    token: generateToken(payload),
    user: userRegistered
  });
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

  res.status(200).json({ status: 200, users });
})

// @desc Get one user
// @route GET /api/v1/user/:id
// @access PRIVATE
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getOneUser(id);

  if(!user[0]) {
    res.status(500)
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, user: user[0] });
})

// @desc update one user
// @route PUT /api/v1/user/update/:id
// @access PRIVATE
const updateOneUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, address, zip, city } = req.body;

  if(!firstName || !lastName || !email || !address || !zip || !city) {
    res.status(400);
    throw new Error('Champs requise');
  }

  const { id } = req.params;
  await UserModel.updateOneUser(req, id);
  const userById = await UserModel.getOneUser(id);

  if(!userById[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, message: "Profile a été mis à jour", user: userById[0] });
})

// @desc update one user's role
// @route PUT /api/v1/user/update/role/:id
// @access PRIVATE
const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await UserModel.updateOneUserRole(req, id);
  const userById = await UserModel.getOneUser(id);

  if(!userById[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  res.status(200).json({ status: 200, message: "User's role updated", user: userById[0] });
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

  if(user.length === 0) {
    res.status(400);
    throw new Error('Email non reconnu');
  }

  if(!user[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  }

  // Get user's hashed password & compare
  const hashPasswordDb = user[0].password;
  const comparedPassword = await bcrypt.compare(password, hashPasswordDb);

  // If wrong password
  if(!comparedPassword) {
    res.status(400);
    throw new Error('Mauvais mot de passe');
  } 

  // Generate token
  const payload = { email: email, id: user[0].id }
  res.status(200).json({ status: 200, message: "Authentifié", token: generateToken(payload), user: user[0] })
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

  if(user.length === 0) {
    res.status(400);
    throw new Error('Email non reconnu');
  }

  // Generate token
  const payload = { email: req.body.email, id: user[0].id }
    
  const token = generateToken(payload);
  const urlResetPassword = process.env.URL_RESET_PASSWORD || "http://localhost:3000/user/reset_step_two";

  const output = `
    <p>Alert! You received a new reset password request</p>
    <h3>User details</h3>
    <ul>
      <li>User's email : ${req.body.email}</li>
      <li>
        Cliquez sur ce lien pour modifier votre mot de passe : 
        <a href="${urlResetPassword}">
          ${urlResetPassword}/${token}
        </a>
      </li>
    </ul>
  `;

  // Transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mitchell.roberts18@ethereal.email',
        pass: 'BEsgxhajh7aX267tRW'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Admin" <mitchell.roberts18@ethereal.email>', // sender address
    to: req.body.email, // list of receivers
    subject: "Reset password",
    text: "",
    html: output
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).json({ status: 200, message: "Vérifiez dans votre email, un lien a été envoyé", token: token, userId: user[0].id });
})

// @desc Reset user's password end step
// @route PUT /api/v1/user/reset_end_step/:id
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

  if(!userById[0]) {
    res.status(500);
    throw new Error('Erreur du serveur');
  } 

  res.status(200).json({ status: 200, message: "Mot de passe mis à jour" });
})

// Generate jwt
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'bella', {
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
