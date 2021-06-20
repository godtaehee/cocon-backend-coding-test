import ogs from "open-graph-scraper";
import { Request, Response } from "express";
import { DataModel } from "../model/dataModel";

function helper(obj: any, property: string) {
  return Object.prototype.hasOwnProperty.call(obj, property)
    ? obj[property]
    : "";
}

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

  ogs({ url }, async (error, result) => {
    try {
      const tmp = JSON.stringify(result);
      const jsonResult = JSON.parse(tmp);
      const model = {
        date: new Date(),
        description: helper(jsonResult, "ogDescription"),
        image:
          helper(jsonResult, "ogImage") !== "" ? jsonResult.ogImage.url : "",
        publisher: helper(jsonResult, "ogSiteName"),
        title: helper(jsonResult, "ogTitle"),
        url: helper(jsonResult, "ogUrl")
      };

      const dataModel = new DataModel(model);

      await dataModel.save();
      res.status(200).send(model);
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

  const datas = await DataModel.find();

  const responseDatas = datas.map(item => {
    return {
      date: item.date,
      description: item.description,
      image: item.image,
      publisher: item.publisher,
      title: item.title,
      url: item.url
    };
  });

  res.status(200).send(responseDatas);
};
