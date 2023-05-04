import connectMongo from "../../../database/conn";
import { Task } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    console.log(req.body)
    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        const { ProjectID, name, description, enddate } = req.body;
        console.log(ProjectID, name, description,  enddate)


        Task.create({ ProjectID, name, description, enddate})
            .then((data) => {
                res.status(201).json({ status: true, task: data })
            })
            .catch((err) => {
                res.status(404).json({ err })
            })
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }

}