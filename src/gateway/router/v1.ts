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

router.post("/", homeController.index);
router.post("/shake-hand", informationController.info);

export default router;
