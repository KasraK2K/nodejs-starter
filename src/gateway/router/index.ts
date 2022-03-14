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
import userController from "../controller/UserController";

const router = express.Router();

router.post("/", homeController.index);
router.post("/shake-hand", informationController.info);

// ─── USER ───────────────────────────────────────────────────────────────────────
router.post("/user/create", userController.create);

// ─── AUTHORIZATION ──────────────────────────────────────────────────────────────
router.post("/login", authController.login);

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
