import ogs from "open-graph-scraper";
import { Request, Response } from "express";
import { DataModel } from "../model/dataModel";

export const getMetaData = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (
    req.headers.accept !== "application/json" ||
    req.headers["content-type"] !== "application/json"
  ) {
    res.status(500).send({
      message: "Header is not application/json"
    });
    return;
  }
  const { url } = req.body;

  let result;

  ogs({ url }, async (err, ret) => {
    try {
      result = ret;

      const stringResult = JSON.stringify(ret);
      const dataModel = new DataModel({ data: stringResult });
      await dataModel.save();
      res.status(200).send(stringResult);
    } catch (e) {
      res.status(500).send(e.toString());
    }
  });
};

export const getMetaDatas = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.headers.accept !== "application/json") {
    res.status(500).send({
      message: "Header is not application/json"
    });
    return;
  }

  const data = await DataModel.find();

  const allData = data.map(item => {
    return JSON.parse(JSON.stringify(item));
  });

  res.status(200).send(allData);
};
