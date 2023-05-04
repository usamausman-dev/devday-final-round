import { hash } from "bcryptjs";
import connectMongo from "../../../../database/conn"
import Users from "../../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    console.log(req.body)

    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        const { firstname, lastname, organization, email, password } = req.body;


        const checkExisting = await Users.findOne({ email })
        if (checkExisting) return res.status(422).json({ message: 'User Already Exists' })

        Users.create({ firstname, lastname, organization, email, password: await hash(password, 12) })
            .then((data) => {
                res.status(201).json({ status: true, user: data })
            })
            .catch((err) => {
                res.status(404).json({ err })
            })

    }
    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }
}