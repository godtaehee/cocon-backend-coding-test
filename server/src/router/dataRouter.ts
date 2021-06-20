import express from "express";
import * as dataController from "../controller/dataController";

const router = express.Router();

router.post("/metadata", dataController.getMetaData);
router.get("/metadatas", dataController.getMetaDatas);

export = router;
