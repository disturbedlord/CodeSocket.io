const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const authentication = require("../services/AuthenticationService");
const SuccessResponse = require("../model/response/SuccessResponse");
const ErrorResponse = require("../model/response/ErrorResponse");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Login an User
router.post("/users/login", async (req, res, next) => {
  try {
    console.log("Login Ca :", req);
    const authenticationService = await authentication.init();
    const userData = await authenticationService.login(
      req.body.emailId,
      req.body.password
    );

    const token = await authenticationService.authenticateUser(userData);
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
    });

    res.status(200).json(
      new SuccessResponse(200, "Login success!", {
        Email: userData[0].Email,
      })
    );
  } catch (ex) {
    res.status(400).json(new ErrorResponse(400, "User Doesn't Exist"));
  }
  next();
});

// Register an User
router.post("/users/register", async (req, res, next) => {
  try {
    const authenticationService = await authentication.init();
    const userExist = await authenticationService.userExist(req.body.emailId);
    if (!userExist) {
      const userData = await authenticationService.register(
        req.body.emailId,
        req.body.password
      );
      return res
        .status(201)
        .json(new SuccessResponse(201, "User Created Successfully"));
    } else {
      return res.status(409).json(new ErrorResponse(409, "User Already Exist"));
    }
  } catch (ex) {
    console.log("Exception at Register Route : ", ex);
  }
  next();
});

module.exports = router;
