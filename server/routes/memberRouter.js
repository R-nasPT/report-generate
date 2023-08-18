const express = require("express");
const memberRouter = express.Router();
const jwt = require("jsonwebtoken");
const md5Base64 = require("md5-base64");

const Member = require("../models/configinfo/member");

memberRouter.get("/", async (req, res) => {
  try {
    const member = await Member.findAll();
    return res.json(member);
  } catch (error) {
    console.log(error);
  }
});

// -----------middleware--------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token has invalid format",
    });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token is invalid",
      });
    }
    req.user = user;
    next();
  });
};
//------------login --------------------
memberRouter.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  const user = await Member.findOne({ where: { Username: Username } });
  // console.log(user.IsAdmin);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = md5Base64(Password) === user.Password;

  if (!isValidPassword) {
    return res.status(401).json({
      message: "password not valid",
    });
  }
  const token = jwt.sign(
    {
      username: user.Username,
      isAdmin: user.IsAdmin,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "login succesfully",
    id: user.ID,
    username: user.Username,
    isAdmin: user.IsAdmin,
    token: token,
  });
});

module.exports = memberRouter;
