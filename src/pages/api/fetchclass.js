import connectMongo from "../../../database/conn";
import { StudentClass } from "../../../model/Schema";
import mongoose from "mongoose";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        const { className } = req.body

        const checkExisting = await StudentClass.find({ className })
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