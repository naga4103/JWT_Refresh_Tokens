const User = require("../userModel");
//import * as jwt from "jsonwebtoken";
const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or Password doesn't exist");
    }
    const user = await User.findOne({ email }).select("+password");

    const correct = await bcrypt.compare(password, user.password);
    if (!user || !correct) {
      throw new Error("Incorrect email or password!!");
    }
    const token = signToken(user._id);

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    localStorage.setItem("token", token);

    // Assigning refresh token in http-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "Success",
      token,
      refreshToken,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.viewTickets = async (req, res, next) => {
  try {
    // validation of token
    // let token = localStorage.getItem("token");
    // let incomingToken = req.headers.authorization;
    return res.send({
      success: 1,
      message: "Product Details Fetched Successfully...",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
