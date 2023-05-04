import connectMongo from "../../../database/conn";
import { StudentClass } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))
    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        console.log(req.body)
        const { person, classID } = req.body;

        const checkExisting = await StudentClass.findOne({ _id: classID })
        const getStudentClass = await StudentClass.findOne({ _id: classID })

        if (!checkExisting) {
            return res.status(404).json({ message: 'StudentClass not found' })
        }


        const updated = await checkExisting.members.push(person)

        StudentClass.updateOne(getStudentClass, checkExisting)
            .then((result) => {
                console.log(result);
                res.status(201).json({ status: true, StudentClass: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ status: false, message: "Failed to add member" });
            });
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }

}