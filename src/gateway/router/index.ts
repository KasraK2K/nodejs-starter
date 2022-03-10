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
import informationController from "../controller/InformationController";
import UserController from "../controller/UserController";

const router = express.Router();

router.post("/", homeController.index);
router.post("/shake-hand", informationController.info);

// ─── USER ───────────────────────────────────────────────────────────────────────
router.post("/user/create", UserController.create);

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
