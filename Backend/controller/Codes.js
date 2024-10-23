const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const codeservice = require("../services/CodesService");
const authentication = require("../services/AuthenticationService");
const SuccessResponse = require("../model/response/SuccessResponse");
const ErrorResponse = require("../model/response/ErrorResponse");
const { nanoid } = require("nanoid");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Login an User
router.post(
  "/codes/newcode",
  authentication.verifyJWT,
  async (req, res, next) => {
    try {
      //console.log("New Code:", req);
      const codesService = await codeservice.init();
      const newCode = nanoid(10);
      const codePushed = await codesService.pushCodeToDB(newCode);
      console.log("AVAk : ", codePushed.length, codePushed);
      if (codePushed["Code"] === newCode) {
        res.status(200).json(
          new SuccessResponse(203, "New Code Generated", {
            code: newCode,
          })
        );
      } else {
        throw "";
      }
    } catch (ex) {
      res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
    }
    next();
  }
);

//Validate Room Code
router.get(
  "/codes/validate/:code",
  authentication.verifyJWT,
  async (req, res, next) => {
    try {
      const roomCode = req.params.code;
      const codeService = await codeservice.init();
      const roomValid = await codeService.validateRoomCode(roomCode);
      console.log("RoomValuid : ", roomValid.length);
      if (roomValid.length > 0) {
        res.status(200).json("Valid");
      } else res.status(404).json("Invalid");
    } catch (ex) {
      res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
    }
    next();
  }
);

module.exports = router;
