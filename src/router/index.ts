//=======================================================
//
//  #####     #####   ##   ##  ######  #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  #####    ##   ##  ##   ##    ##    #####  #####
//  ##  ##   ##   ##  ##   ##    ##    ##     ##  ##
//  ##   ##   #####    #####     ##    #####  ##   ##
//
//=======================================================

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger";
import { IErrGenOptions } from "../common/interfaces/information";

// ────────────────────────────────────────────────────────────────────────
//   :::::: C O N T R O L L E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
import BaseController from "../base/controller/BaseController";
import generalController from "../modules/general/controller";
// ────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────
//   :::::: M I D D L E W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
// import you routes middleware here
// ────────────────────────────────────────────────────────────────────────

const swaggerOptions = { explorer: true, swaggerOptions: { validatorUrl: null } };
const router = express.Router();

// ──────────────────────────────────────────────────────────────
//   :::::: R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
// generals
router.post("/shake-hand", generalController.shakeHand);

// swagger
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// 404
router.use("*", (req, res) => {
  const errData: IErrGenOptions = {
    req,
    res,
    status: 404,
    result: false,
    error_code: 3001,
  };
  return new BaseController().resGen(errData);
});

export default router;
