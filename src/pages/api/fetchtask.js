import connectMongo from "../../../database/conn";
import { Task } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {


        const checkExisting = await Task.findOne()
        if (checkExisting) {
            res.status(201).json({ status: true, data: checkExisting })
        }
        else {
            res.status(201).json({ status: true, data: "" })

        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }
}