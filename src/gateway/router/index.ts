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
import Controller from "../http/v1/controller/Controller";
import v1 from "./v1";

const router = express.Router();

router.use("/v1", v1);

router.use("*", (req, res) => {
  const controller = new Controller();
  const result = controller.resGen({ req, success: false, error: 3001 });
  res.status(404).json(result);
});

export default router;
