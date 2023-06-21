
import {connectDataBase, insertDocument} from '../../helpers/db-util'

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!userEmail || !emailRegex.test(userEmail)) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    let client;

    try {
      client = await connectDataBase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}
export default handler;



















