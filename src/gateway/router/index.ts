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
import Controller from "../controller/Controller";
import homeController from "../controller/HomeController";
import authController from "../controller/AuthController";
import informationController from "../controller/InformationController";
import mngUserController from "../controller/MngUserController";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger";

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null,
  },
};

const router = express.Router();

router.post("/", homeController.index);
router.post("/shake-hand", informationController.info);

// ─── USER ───────────────────────────────────────────────────────────────────────
router.post("/mng-users/list", mngUserController.list);
router.post("/mng-users/upsert", mngUserController.upsert);

// ─── AUTHORIZATION ──────────────────────────────────────────────────────────────
router.post("/login", authController.login);

// ─── SWAGGER ────────────────────────────────────────────────────────────────────
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// ─── 404 ────────────────────────────────────────────────────────────────────────
router.use("*", (req, res) => {
  return new Controller().resGen({
    req,
    res,
    status: 404,
    result: false,
    error_code: 3001,
  });
});

export default router;
