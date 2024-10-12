const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const authentication = require("../services/AuthenticationService");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Login an User
router.post("/users/login", async (req, res, next) => {
  console.log("Login Ca");
  const authenticationService = await authentication.init();
  const userData = authenticationService.login(
    req.body.emailId,
    req.body.password
  );
  return res.status(200).send(userData);
});

// Register an User
router.post("/users/register", async (req, res, next) => {
  const authenticationService = await authentication.init();
  const userData = authenticationService.register(
    req.body.emailId,
    req.body.password
  );
  return res.status(200).send(userData);
});

module.exports = router;
