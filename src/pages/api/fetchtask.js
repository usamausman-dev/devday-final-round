import connectMongo from "../../../database/conn";
import { Task } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {

        const tasks = await Task.find();
        if (tasks) {
            res.status(201).json({ status: true, tasks: tasks })
        }
        else {
            res.status(201).json({ status: true, tasks: [] })
        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only GET Accepted" })
    }
}