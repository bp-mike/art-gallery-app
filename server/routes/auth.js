const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const verify = require("./verifyTokens");
// const { registerValidation, loginValidation } = require("../validation");
const Joi = require("@hapi/joi");

// register user
router.post("/register", async (req, res) => {
  // validate the data before we make a user
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// login user
router.post("/login", async (req, res) => {
  // validate the data before we make a user
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email exists
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Email is not found");

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send({ loginToken: token });

  // res.send("Logged in");
});

// reset password
router.post("/pwd-reset", async (req, res) => {
  // validate the data before we make a user
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the email exists
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Email is not found");

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // update the user's "password" field to null
  user.password = hashedPassword;
  await user.save();

  res.send("Password reset");
});

// logout user
// router.post("/logout", verify, async (req, res) => {
//   // get the user from the request object
//   const user = req.user;

//   // update the user's "token" field to null
//   user.token = null;
//   await user.save();

//   // send a response
//   res.send("Successfully logged out");
// });

module.exports = router;
