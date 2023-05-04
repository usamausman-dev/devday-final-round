import connectMongo from "../../../database/conn";
import { StudentClass } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))
    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        console.log(req.body)
        const { classTeacher, className, members } = req.body;

        const checkExisting = await StudentClass.findOne({ className })
        if (checkExisting) return res.status(422).json({ message: 'StudentClass Already Exists, Try different Name' })




        StudentClass.create({ classTeacher, className, members })
            .then((data) => {
                res.status(201).json({ status: true, StudentClass: data })
            })
            .catch((err) => {
                res.status(404).json({ err })
            })

    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }

}