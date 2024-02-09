const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");

exports.jwtCheck = async (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    console.log("jwtSecret in middleware", jwtSecret);

    const token = req.headers.authorization;
    console.log("token", token);
    const decode = jwt.verify(token, jwtSecret);
    if (!decode) {
      throw new Error("Not Authorized, Token Failed");
    }
    next();

    // console.log("Token", token);
    // if (!token) {
    //   throw new Error("Not Authorized, Token Failed");
    // }
    // // const decode = jwt.verify(token, jwtSecret);

    // console.log("Decode", decode);
    // if (!decode) {
    //   throw new Error("Not Authorized, Token Failed");
    // }

    // console.log("Decode", decode);

    // res.status(200).json({
    //   status: "Success",

    //   message: "JWT Verification Successful...",
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
