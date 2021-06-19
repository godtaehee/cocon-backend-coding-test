import ogs from "open-graph-scraper";
import {Request, Response} from "express";
import {DataModel} from "../model/dataModel";

export const getMetaData = async (req: Request, res: Response) => {

    res.set({
        'Accept':'application/json',
        'Content-Type':'application/json'
    });
    const {url} = req.body;


    ogs({url}, async (error, result) => {
        if (error) {
            res.status(500).send({
                message: "Error Occurred"
            });
        }

        const tmp = JSON.stringify(result);
        const jsonResult = JSON.parse(tmp);

        const dataModel = new DataModel({
            date: jsonResult.date,
            description: jsonResult.description,
            image: jsonResult.image,
            publisher: jsonResult.publisher,
            title: jsonResult.title,
            url: jsonResult.url
        });
        console.log(dataModel);
        await dataModel.save();

        res.status(200).send({
            dataModel
        });
    });
}
//
// export const getMetaDatas = async (req: Request, res: Response) => {
//
//     res.set('Accept','application/json');
//
//     const data = await DataModel.find();
//     const datas = [];
//     for (let i = 0; i < data.length; i++) {
//         const tmp = JSON.parse(data[i].data);
//         datas.push(tmp);
//     }
//     res.status(200).send({
//         datas
//     });
// }