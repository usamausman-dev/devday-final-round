import connectMongo from "../../../database/conn";
import { StudentClass } from "../../../model/Schema";

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === 'POST') {
      if (!req.body) {
        return res.status(404).json({ error: 'No form data provided' });
      }

      const { classTeacher } = req.body;

      const checkExisting = await StudentClass.find({
        $or: [
          { classTeacher },
          { members: classTeacher }
        ]
      });

      res.json(checkExisting);

      if (checkExisting.length > 0) {
        res.status(200).json({ status: true, data: checkExisting });
      } else {
        res.status(200).json({ status: true, data: [] });
      }
    } else {
      res.status(500).json({ message: "HTTP Method not valid, only POST is accepted" });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Connection failed" });
  }
}
