import express, {Request, Response, NextFunction} from "express";
import * as dataController from "../controller/dataController";

const router = express.Router();

router.post("/metadata", dataController.getMetaData);

export = router;