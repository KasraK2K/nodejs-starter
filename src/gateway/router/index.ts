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
  return new Controller().resGen({
    req,
    res,
    status: 404,
    result: false,
    error_code: 3001,
  });
});

export default router;
