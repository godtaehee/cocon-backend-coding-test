import ogs from "open-graph-scraper";
import {Request, Response} from "express";
import {DataModel} from "../model/dataModel";


function helper(obj:any, property:string) {
    return obj.hasOwnProperty(property) ? obj[property] : '';
}

export const getMetaData = async (req: Request, res: Response) => {

    if(req.headers["accept"] !== "application/json" || req.headers["content-type"] !== "application/json") {
        return res.status(500).send({
            message: "Header is not application/json"
        });
    }

    const {url} = req.body;

    ogs({url:url}, async (error, result) => {
        if (error) {
            res.status(500).send({
                message: "Error Occurred"
            });
        }

        const tmp = JSON.stringify(result);
        const jsonResult = JSON.parse(tmp);
        const model = {
            date: new Date(),
            description: helper(jsonResult,'ogDescription'),
            image: helper(jsonResult, 'ogImage') !== '' ? jsonResult['ogImage'].url : '',
            publisher: helper(jsonResult, 'ogSiteName'),
            title:  helper(jsonResult, 'ogTitle'),
            url: helper(jsonResult,'ogUrl')
        }

        const dataModel = new DataModel(model);

        await dataModel.save();

        res.status(200).send(model);
    });
}

export const getMetaDatas = async (req: Request, res: Response) => {

    if(req.headers["accept"] !== "application/json") {
        return res.status(500).send({
            message: "Header is not application/json"
        });
    }

    const datas = await DataModel.find();
    const responseDatas = [];
    for(let i = 0; i < datas.length; i++) {
        let data = {
            date: datas[i].date,
            description: datas[i].description,
            image: datas[i].image,
            publisher: datas[i].publisher,
            title: datas[i].title,
            url: datas[i].url
        };
        responseDatas.push(data);
    }
    res.status(200).send(
        responseDatas
    );
}