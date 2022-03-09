//=============================================================================================
//
//  ##   ##  #####  #####     ####  ##   #####   ##     ##         #####   ##     ##  #####
//  ##   ##  ##     ##  ##   ##     ##  ##   ##  ####   ##        ##   ##  ####   ##  ##
//  ##   ##  #####  #####     ###   ##  ##   ##  ##  ## ##        ##   ##  ##  ## ##  #####
//   ## ##   ##     ##  ##      ##  ##  ##   ##  ##    ###        ##   ##  ##    ###  ##
//    ###    #####  ##   ##  ####   ##   #####   ##     ##         #####   ##     ##  #####
//
//=============================================================================================

import express from "express";
const router = express.Router();

import homeController from "../http/v1/controller/HomeController";
import informationController from "../http/v1/controller/InformationController";
import UserController from "../http/v1/controller/UserController";

router.post("/", homeController.index);
router.post("/shake-hand", informationController.info);

// ─── USER ───────────────────────────────────────────────────────────────────────
router.post("/user/create", UserController.create);

export default router;
