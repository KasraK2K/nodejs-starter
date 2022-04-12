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
import { IErrGenOptions } from "../common/interfaces/general.interface";
import starterConfig from "../../starter.config";

const { swagger } = starterConfig;

// ────────────────────────────────────────────────────────────────────────
//   :::::: C O N T R O L L E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
import BaseController from "../base/controller/BaseController";
import generalController from "../modules/general/controller";
import postgresController from "../modules/postgres/controller";
import mongoDbController from "../modules/mongodb/controller";
import firebaseController from "../modules/firebase/controller";
// ────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────
//   :::::: M I D D L E W A R E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
// import you routes middleware here
// ────────────────────────────────────────────────────────────────────────

const router = express.Router();

// ──────────────────────────────────────────────────────────────
//   :::::: R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
// generals
router.post("/shake-hand", generalController.shakeHand);

// postgres
router.post("/postgres/list", postgresController.selectAll);
router.post("/postgres/find", postgresController.selectOne);
router.post("/postgres/create", postgresController.create);
router.post("/postgres/edit", postgresController.edit);
router.post("/postgres/upsert", postgresController.upsert);
router.post("/postgres/safe-remove", postgresController.safeRemove);
router.post("/postgres/remove", postgresController.remove);
router.post("/postgres/recover", postgresController.recover);
router.post("/postgres/builder/test", postgresController.testBuilder);

// mongodb
router.post("/mongodb/list", mongoDbController.selectAll);
router.post("/mongodb/find", mongoDbController.selectOne);
router.post("/mongodb/create", mongoDbController.create);
router.post("/mongodb/edit", mongoDbController.edit);
router.post("/mongodb/upsert", mongoDbController.upsert);
router.post("/mongodb/safe-remove", mongoDbController.safeRemove);
router.post("/mongodb/remove", mongoDbController.remove);
router.post("/mongodb/recover", mongoDbController.recover);

// firebase
router.post("/firebase/send-message", firebaseController.sendMessage);

// swagger
swagger.enabled && router.use(swagger.endpoint, swaggerUi.serve, swaggerUi.setup(swaggerDocument, swagger.options));

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
