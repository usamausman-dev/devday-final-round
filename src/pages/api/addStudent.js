import connectMongo from "../../../database/conn";
import { Project } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))
    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        console.log(req.body)
        const { person, projectdataid } = req.body;

        const checkExisting = await Project.findOne({ _id: projectdataid })
        const getProject = await Project.findOne({ _id: projectdataid })

        if (!checkExisting) {
            return res.status(404).json({ message: 'Project not found' })
        }


        const updated = await checkExisting.members.push(person)
        // console.log("updated ===> ", updated)
        // console.log("Existing ===> ", checkExisting)



        Project.updateOne(getProject, checkExisting)
            .then((result) => {
                console.log(result);
                res.status(201).json({ status: true, project: result });
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