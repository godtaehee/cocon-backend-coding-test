import ogs from "open-graph-scraper";
import {Request, Response} from "express";
import {DataModel} from "../model/dataModel";

export const getMetaData = async (req: Request, res: Response) => {

    const {url} = req.body;

    let result;

    ogs({url}, async (err, ret) => {
        result = ret;
        if (err) {
            res.status(500).send({
                message: "Error Occurred"
            });
        }

        const stringResult = JSON.stringify(ret);
        const dataModel = new DataModel({data: stringResult});
        await dataModel.save();

        res.status(200).send({
            dataModel
        });
    });
}

